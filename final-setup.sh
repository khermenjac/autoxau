#!/bin/bash

# Final setup script for AutoXAU - EA distribution and security

echo "🔐 Setting up secure EA distribution..."

# Create secure directory for EA files (outside web root)
sudo mkdir -p /secure/ea-files
sudo chown $USER:$USER /secure/ea-files
sudo chmod 700 /secure/ea-files

# Create placeholder for EA file (you'll need to upload your actual EA)
cat > /secure/ea-files/README.txt << 'EOF'
IMPORTANT: Place your EA files here
===================================

Upload your EA files to this directory:
- AutoXAU_Pro.ex5 (for MT5)
- AutoXAU_Pro.ex4 (for MT4)

These files will be served securely through the API
only to users with active subscriptions.

Security notes:
- This directory is outside the web root
- Only accessible through authenticated API calls
- Each download is logged for tracking
EOF

# Set up database migrations
cd /var/www/autoxau

# Create drizzle configuration
cat > drizzle.config.ts << 'EOF'
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/Schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
EOF

# Install additional dependencies for database
pnpm add postgres drizzle-orm
pnpm add -D drizzle-kit

# Create initial migration
pnpm db:generate

# Create robots.txt for SEO
cat > /var/www/autoxau/public/robots.txt << 'EOF'
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /sign-in/
Disallow: /sign-up/

Sitemap: https://www.autoxau.com/sitemap.xml
EOF

# Create sitemap.xml
cat > /var/www/autoxau/public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.autoxau.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.autoxau.com/#features</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.autoxau.com/#performance</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.autoxau.com/#reviews</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.autoxau.com/#pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.autoxau.com/#faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
EOF

# Create backup script
cat > /home/$USER/backup-autoxau.sh << 'EOF'
#!/bin/bash
# AutoXAU Backup Script

BACKUP_DIR="/home/$USER/backups/autoxau"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup code
tar -czf $BACKUP_DIR/autoxau_code_$TIMESTAMP.tar.gz -C /var/www autoxau

# Backup database (adjust connection string)
pg_dump $DATABASE_URL > $BACKUP_DIR/autoxau_db_$TIMESTAMP.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $TIMESTAMP"
EOF

chmod +x /home/$USER/backup-autoxau.sh

# Add cron job for daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$USER/backup-autoxau.sh") | crontab -

# Create monitoring script
cat > /home/$USER/monitor-autoxau.sh << 'EOF'
#!/bin/bash
# AutoXAU Monitoring Script

# Check if the app is running
if ! pm2 list | grep -q "autoxau.*online"; then
    echo "AutoXAU is down! Restarting..."
    cd /var/www/autoxau
    pm2 restart autoxau
    
    # Send notification (configure your notification method)
    # curl -X POST https://your-webhook-url -d "AutoXAU was down and has been restarted"
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Warning: Disk usage is at ${DISK_USAGE}%"
fi

# Check memory usage
MEM_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ $MEM_USAGE -gt 80 ]; then
    echo "Warning: Memory usage is at ${MEM_USAGE}%"
fi
EOF

chmod +x /home/$USER/monitor-autoxau.sh

# Add monitoring cron job (every 5 minutes)
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/$USER/monitor-autoxau.sh") | crontab -

# Set up log rotation
sudo tee /etc/logrotate.d/autoxau << 'EOF'
/home/$USER/.pm2/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 $USER $USER
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Final security headers for Nginx
sudo tee -a /etc/nginx/sites-available/autoxau << 'EOF'

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://s3.tradingview.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src https://js.stripe.com https://s3.tradingview.com;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
EOF

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx

# Create deployment script for future updates
cat > /home/$USER/deploy-autoxau.sh << 'EOF'
#!/bin/bash
# AutoXAU Deployment Script

cd /var/www/autoxau

echo "🚀 Deploying AutoXAU updates..."

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
pnpm install

# Run database migrations
pnpm db:migrate

# Build the application
pnpm build

# Restart the application
pm2 restart autoxau

echo "✅ Deployment complete!"
EOF

chmod +x /home/$USER/deploy-autoxau.sh

# Final build and restart
cd /var/www/autoxau
pnpm build
pm2 restart autoxau

echo "
✅ AutoXAU setup complete!

🔐 Security Checklist:
□ Update .env with real API keys
□ Upload your EA files to /secure/ea-files/
□ Set up your PostgreSQL database
□ Configure Stripe products with correct price IDs
□ Enable Clerk organization features
□ Test payment flow end-to-end
□ Monitor logs: pm2 logs autoxau

📁 Important locations:
- Application: /var/www/autoxau
- EA Files: /secure/ea-files/
- Backups: /home/$USER/backups/autoxau/
- Deploy script: /home/$USER/deploy-autoxau.sh

🌐 Your site: https://www.autoxau.com

📊 Monitor your app:
- pm2 status
- pm2 monit
- tail -f /home/$USER/.pm2/logs/autoxau-out.log

Need help? Check the logs or run pm2 logs autoxau
"
