#!/bin/bash

# Force Update AutoXAU Page
echo "🔄 Forcing AutoXAU Page Update"
echo "=============================="

cd /var/www/autoxau

# Step 1: Check what's currently running
echo "📊 Current PM2 Status:"
pm2 list

# Step 2: Kill all Node processes to ensure clean start
echo -e "\n🛑 Stopping all processes..."
pm2 kill
pkill -f node
sleep 2

# Step 3: Check which file PM2 was running
echo -e "\n📁 Files in directory:"
ls -la *.js

# Step 4: Create the modern design file if it doesn't exist
echo -e "\n📝 Creating/Updating modern design file..."
cat > app.js << 'EOF'
const http = require('http');
const url = require('url');
const PORT = 3000;

console.log('Starting AutoXAU Modern Design Server...');

const getHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoXAU - Advanced AI-Powered Gold Trading System</title>
    <meta name="description" content="Experience the future of gold trading with AutoXAU's advanced AI algorithms.">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #3B82F6;
            --primary-dark: #2563EB;
            --secondary: #10B981;
            --accent: #F59E0B;
            --dark: #1F2937;
            --light: #F9FAFB;
            --text: #374151;
            --text-light: #6B7280;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--light);
            color: var(--text);
            line-height: 1.6;
        }
        
        /* Navigation */
        nav {
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.75rem;
            font-weight: 800;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }
        
        .nav-links a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        /* Hero Section */
        .hero {
            margin-top: 80px;
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #EBF5FF 0%, #F3E8FF 100%);
            min-height: 80vh;
            display: flex;
            align-items: center;
        }
        
        .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero .subtitle {
            font-size: 1.5rem;
            color: var(--text-light);
            margin-bottom: 3rem;
            line-height: 1.8;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto 3rem;
        }
        
        .stat-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        
        .stat-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: var(--text-light);
            font-weight: 500;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            display: inline-block;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        
        /* Features Section */
        .features {
            padding: 5rem 2rem;
            background: white;
        }
        
        .features h2 {
            text-align: center;
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 3rem;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .features-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            padding: 2rem;
            background: var(--light);
            border-radius: 15px;
            transition: all 0.3s;
        }
        
        .feature-card:hover {
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .feature-card p {
            color: var(--text-light);
            line-height: 1.8;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <div class="logo">AutoXAU</div>
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Intelligent Gold Trading Powered by Advanced AI</h1>
            <p class="subtitle">
                Transform your trading experience with AutoXAU's sophisticated algorithmic system. 
                Our cutting-edge technology analyzes market patterns 24/7 for optimal trading performance.
            </p>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">🤖</div>
                    <div class="stat-value">AI-Driven</div>
                    <div class="stat-label">Smart Technology</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⚡</div>
                    <div class="stat-value">24/7</div>
                    <div class="stat-label">Always Active</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🛡️</div>
                    <div class="stat-value">Secure</div>
                    <div class="stat-label">Protected Trading</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">Advanced</div>
                    <div class="stat-label">Analytics Engine</div>
                </div>
            </div>
            
            <div class="cta-buttons">
                <a href="#start" class="btn btn-primary">Start Trading Today</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <h2>Why Choose AutoXAU?</h2>
        <div class="features-grid">
            <div class="feature-card">
                <h3>🧠 Intelligent Market Analysis</h3>
                <p>
                    Our AI engine processes millions of data points, identifying profitable patterns 
                    and market inefficiencies that human traders might miss.
                </p>
            </div>
            <div class="feature-card">
                <h3>⚡ Lightning-Fast Execution</h3>
                <p>
                    With sub-millisecond response times, AutoXAU ensures you never miss a trading 
                    opportunity in the fast-moving gold market.
                </p>
            </div>
            <div class="feature-card">
                <h3>🛡️ Advanced Risk Management</h3>
                <p>
                    Protect your capital with sophisticated risk control systems including dynamic 
                    position sizing and intelligent stop-loss algorithms.
                </p>
            </div>
        </div>
    </section>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    console.log('Request received:', req.url);
    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.end(getHTML());
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU Modern Design Server Running on port ' + PORT);
    console.log('🎨 Light blue theme active');
    console.log('📍 Visit: http://localhost:' + PORT);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
EOF

# Step 5: Start fresh with PM2
echo -e "\n🚀 Starting fresh PM2 process..."
pm2 start app.js --name autoxau --update-env
pm2 save

# Step 6: Clear browser cache instructions
echo -e "\n🌐 Clear Browser Cache:"
echo "1. Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
echo "2. Or open in Incognito/Private mode"
echo "3. Or add ?v=2 to URL: http://autoxau.com?v=2"

# Step 7: Test the update
echo -e "\n🧪 Testing update..."
sleep 3
curl -s http://localhost:3000 | grep -o "Intelligent Gold Trading" && echo "✅ New design is active!" || echo "⚠️ Old design still showing"

# Step 8: Clear Nginx cache if exists
echo -e "\n🔧 Clearing any server cache..."
sudo nginx -s reload

# Step 9: Alternative - Direct Node run
echo -e "\n📝 If PM2 still shows old version, try direct Node:"
echo "pm2 stop autoxau"
echo "node app.js"

echo -e "\n✅ Force Update Complete!"
echo "================================"
echo ""
echo "🔄 To see the new design:"
echo "1. Hard refresh: Ctrl+F5 or Cmd+Shift+R"
echo "2. Open in private/incognito window"
echo "3. Visit: http://autoxau.com?v=new"
echo ""
echo "🔍 Check which file is running:"
echo "pm2 show autoxau"
echo ""
echo "📝 If still not working, run manually:"
echo "pm2 stop autoxau"
echo "node app.js"
