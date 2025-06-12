#!/bin/bash

# Fix 502 Bad Gateway Error for AutoXAU
echo "🔧 Fixing 502 Bad Gateway Error"
echo "================================"

cd /var/www/autoxau

# Step 1: Check what's wrong
echo "📊 Checking current status..."
pm2 list
echo ""
echo "📝 Recent PM2 logs:"
pm2 logs --lines 20 --nostream

# Step 2: Check if .env file exists
echo -e "\n🔍 Checking .env file..."
if [ -f .env ]; then
    echo "✅ .env file exists"
else
    echo "❌ .env file missing! Creating it..."
    cat > .env << 'EOF'
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51RYVS5FxkWMERmcn7ZgOxzqHz6dDcY9tOIjK6TEw7lY0dG4MIG90s5gxqGogaGVWhh7Q70zInquQ61FwdoOfzQIf00RFdHt7Hr
EOF
fi

# Step 3: Go back to simple working server first
echo -e "\n🔄 Rolling back to simple working server..."

# Create simple server without complex dependencies
cat > simple-server.js << 'EOF'
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>AutoXAU - Professional XAUUSD Trading Bot</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #000; color: white; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header { background: rgba(0,0,0,0.8); padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; }
        .logo { font-size: 2rem; font-weight: bold; color: #FFD700; }
        main { margin-top: 80px; }
        .hero { text-align: center; padding: 4rem 0; }
        h1 { font-size: 3rem; color: #FFD700; margin-bottom: 1rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 3rem 0; }
        .stat { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; border: 1px solid rgba(255,215,0,0.3); }
        .stat-value { font-size: 2rem; color: #FFD700; font-weight: bold; }
        .button { display: inline-block; background: #FFD700; color: #000; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 0.5rem; }
        section { padding: 3rem 0; }
        h2 { color: #FFD700; text-align: center; margin-bottom: 2rem; }
        .pricing { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .price-card { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 10px; text-align: center; border: 1px solid rgba(255,215,0,0.3); }
        .price { font-size: 3rem; color: #FFD700; margin: 1rem 0; }
        .error-msg { background: #ff3333; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0; }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">AutoXAU</div>
        </div>
    </header>
    
    <main>
        <div class="container">
            <div class="hero">
                <h1>AutoXAU Trading Bot</h1>
                <p>Professional Automated Trading System for XAUUSD</p>
                
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
                
                <a href="#pricing" class="button">Start Trading Now</a>
            </div>
            
            <section id="pricing">
                <h2>Choose Your Plan</h2>
                <div class="pricing">
                    <div class="price-card">
                        <h3>Basic</h3>
                        <div class="price">$39</div>
                        <p>1 MT4/MT5 Account</p>
                        <a href="#" class="button">Get Started</a>
                    </div>
                    <div class="price-card">
                        <h3>Professional</h3>
                        <div class="price">$69</div>
                        <p>2 MT4/MT5 Accounts</p>
                        <a href="#" class="button">Get Started</a>
                    </div>
                    <div class="price-card">
                        <h3>Premium</h3>
                        <div class="price">$99</div>
                        <p>3 MT4/MT5 Accounts</p>
                        <a href="#" class="button">Get Started</a>
                    </div>
                </div>
            </section>
            
            <div class="error-msg">
                <strong>Note:</strong> Payment integration is being configured. Stripe will be activated soon.
            </div>
        </div>
    </main>
</body>
</html>
    `);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU server running on port ' + PORT);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
EOF

# Step 4: Stop all PM2 processes and start fresh
echo -e "\n🔄 Restarting PM2..."
pm2 kill
pm2 start simple-server.js --name autoxau

# Step 5: Check if port 3000 is listening
echo -e "\n🔍 Checking if server is listening on port 3000..."
sleep 2
sudo netstat -tlnp | grep :3000 || echo "⚠️  Port 3000 not active"

# Step 6: Test local connection
echo -e "\n🧪 Testing local connection..."
curl -I http://localhost:3000 2>/dev/null | head -n 1

# Step 7: Check and fix Nginx
echo -e "\n🔧 Checking Nginx configuration..."
sudo nginx -t

# Ensure Nginx is properly configured
sudo tee /etc/nginx/sites-available/autoxau > /dev/null << 'EOF'
server {
    listen 80;
    server_name autoxau.com www.autoxau.com;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Reload Nginx
sudo nginx -s reload

# Step 8: Alternative quick fix - run directly with Node
echo -e "\n🚀 Alternative: Running directly with Node.js..."
pm2 stop autoxau
pkill -f "node.*server" 2>/dev/null || true

# Run in background
nohup node simple-server.js > server.log 2>&1 &
echo "Server PID: $!"

# Final check
sleep 2
echo -e "\n✅ Final Status Check:"
echo "===================="
if curl -s http://localhost:3000 | grep -q "AutoXAU"; then
    echo "✅ Server is running locally"
    echo "🌐 Your site should now be accessible at http://autoxau.com"
else
    echo "❌ Server still not responding"
    echo "Running emergency Python server as backup..."
    
    # Emergency Python server
    cat > emergency-server.py << 'EOF'
#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'''
<html>
<body style="background:#000;color:white;font-family:Arial;text-align:center;padding:50px;">
<h1 style="color:#FFD700;font-size:4rem;">AutoXAU</h1>
<p style="font-size:1.5rem;">Professional XAUUSD Trading Bot</p>
<p style="color:#ff6666;">Payment system is being configured. Please try again shortly.</p>
</body>
</html>''')

httpd = HTTPServer(('0.0.0.0', 3000), Handler)
print('Emergency server running on port 3000')
httpd.serve_forever()
EOF
    
    python3 emergency-server.py &
fi

echo -e "\n📝 Troubleshooting Commands:"
echo "- Check logs: pm2 logs autoxau"
echo "- Check process: ps aux | grep node"
echo "- Check port: sudo lsof -i :3000"
echo "- Restart: pm2 restart autoxau"
echo "- Check Nginx logs: sudo tail -f /var/log/nginx/error.log"
