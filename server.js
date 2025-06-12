# AutoXAU Complete Setup Guide

## 🚀 Quick Start (Get Running in 5 Minutes)

### Option 1: Simple Server (Fastest)
```bash
cd /var/www/autoxau
./simple-server.sh
```

### Option 2: Full Next.js Setup
```bash
cd /var/www/autoxau
./emergency-fix.sh
./fix-modules.sh
```

## 📊 Current Project Status

Based on your GitHub repository, you have:
- ✅ Multiple setup scripts created
- ⚠️ CI/CD checks failing (normal - not configured yet)
- ✅ Project structure in place

## 🎯 Step-by-Step Setup Guide

### Step 1: Check Current Status
```bash
cd /var/www/autoxau
nano status-check.sh
# Copy the status check script from above
chmod +x status-check.sh
./status-check.sh
```

### Step 2: Choose Your Setup Path

#### Path A: Simple Working Site (Recommended First)
This gets you a working site immediately:

```bash
# Create simple Node.js server
cat > server.js << 'EOF'
const http = require('http');
const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>AutoXAU - Professional XAUUSD Trading Bot</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #000;
            color: white;
            min-height: 100vh;
        }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #000 100%);
            text-align: center;
            padding: 2rem;
        }
        h1 {
            font-size: clamp(3rem, 10vw, 6rem);
            font-weight: bold;
            background: linear-gradient(to right, #FCD34D, #F59E0B);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        .subtitle {
            font-size: clamp(1rem, 3vw, 1.5rem);
            color: #9CA3AF;
            margin-bottom: 3rem;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            max-width: 600px;
            margin: 0 auto 3rem;
        }
        .stat {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 1rem;
            backdrop-filter: blur(10px);
        }
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #FCD34D;
        }
        .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn {
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        .btn-primary {
            background: #FCD34D;
            color: black;
        }
        .btn-primary:hover {
            background: #F59E0B;
        }
    </style>
</head>
<body>
    <div class="hero">
        <div>
            <h1>AutoXAU</h1>
            <p class="subtitle">Professional Automated XAUUSD Trading System</p>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-value">79.3%</div>
                    <div>Win Rate</div>
                </div>
                <div class="stat">
                    <div class="stat-value">$793</div>
                    <div>Weekly Profit</div>
                </div>
                <div class="stat">
                    <div class="stat-value">24/7</div>
                    <div>Auto Trading</div>
                </div>
                <div class="stat">
                    <div class="stat-value">0.1s</div>
                    <div>Execution</div>
                </div>
            </div>
            
            <div class="buttons">
                <a href="#" class="btn btn-primary">Start Trading Now</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(PORT, () => {
    console.log(\`✅ AutoXAU running at http://localhost:\${PORT}\`);
});
EOF

# Start with PM2
pm2 delete autoxau 2>/dev/null
pm2 start server.js --name autoxau
pm2 save
```

#### Path B: Full Next.js Setup (Advanced)
Only try this after Path A works:

```bash
# Clean install
rm -rf node_modules package-lock.json .next
npm cache clean --force

# Install Next.js properly
npm init -y
npm install next@14.0.4 react@18 react-dom@18
npm install -D typescript @types/react @types/node

# Run the fix script
./fix-modules.sh
```

### Step 3: Configure Nginx (For Domain Access)
```bash
# Check if Nginx config exists
ls -la /etc/nginx/sites-available/autoxau

# If not, create it:
sudo nano /etc/nginx/sites-available/autoxau
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name autoxau.com www.autoxau.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -sf /etc/nginx/sites-available/autoxau /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Set Up SSL (Optional)
```bash
sudo certbot --nginx -d autoxau.com -d www.autoxau.com
```

## 🔧 Troubleshooting Commands

### Check What's Running
```bash
# PM2 processes
pm2 list

# Port usage
sudo lsof -i :3000

# Nginx status
sudo systemctl status nginx
```

### View Logs
```bash
# PM2 logs
pm2 logs autoxau --lines 50

# Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart app
pm2 restart autoxau

# Restart Nginx
sudo systemctl restart nginx

# Restart everything
pm2 kill && pm2 start server.js --name autoxau
```

## 📝 Next Steps After Basic Setup

1. **Add Authentication (Clerk)**
   ```bash
   npm install @clerk/nextjs
   # Add your Clerk keys to .env
   ```

2. **Add Payment (Stripe)**
   ```bash
   npm install stripe @stripe/stripe-js
   # Add your Stripe keys to .env
   ```

3. **Add Database**
   ```bash
   npm install drizzle-orm postgres
   # Configure DATABASE_URL in .env
   ```

## 🚨 Common Issues and Fixes

### Issue: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
```bash
sudo lsof -ti:3000 | xargs kill -9
pm2 restart autoxau
```

### Issue: "Site not accessible"
```bash
# Check if running
pm2 status
curl http://localhost:3000

# Check firewall
sudo ufw allow 3000
sudo ufw allow 80
sudo ufw allow 443
```

## 🎯 Quick Win - Get Something Running Now!

Just run these 3 commands:
```bash
cd /var/www/autoxau
pm2 delete autoxau
pm2 start server.js --name autoxau
```

Then visit: http://localhost:3000

## 📞 Still Need Help?

Share the output of:
```bash
pm2 logs autoxau --lines 20
node --version
npm --version
```
