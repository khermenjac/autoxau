#!/bin/bash

# AutoXAU Complete Feature Update Script
# This adds all requested features to your site

echo "🚀 AutoXAU Complete Feature Update"
echo "=================================="

cd /var/www/autoxau

# Step 1: First fix the domain issue
echo "🔧 Step 1: Fixing domain configuration..."

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# Create proper Nginx configuration
sudo tee /etc/nginx/sites-available/autoxau > /dev/null << 'EOF'
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/autoxau /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Nginx configured for autoxau.com"

# Step 2: Create the complete site with all features
echo -e "\n📝 Step 2: Creating complete site with all features..."

# Backup current app.js
cp app.js app.js.backup 2>/dev/null || true

# Create new comprehensive app.js with all features
cat > app.js << 'EOF'
const http = require('http');
const url = require('url');
const PORT = 3000;

console.log('Starting AutoXAU server with all features...');

// HTML template with all features
const getHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoXAU - Professional XAUUSD Trading Bot | Automated Gold Trading</title>
    <meta name="description" content="AutoXAU offers professional automated trading for XAUUSD with 79.3% win rate. Start trading gold with our advanced algorithmic trading system.">
    <meta name="keywords" content="XAUUSD trading bot, gold trading automation, forex trading bot, automated trading system, MT4 expert advisor, MT5 EA">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #FFD700;
            --secondary: #FFA500;
            --dark: #000;
            --light: #fff;
            --gray: #888;
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--dark);
            color: var(--light);
            overflow-x: hidden;
            line-height: 1.6;
        }
        
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(0,0,0,0.9);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            transition: all 0.3s;
        }
        
        nav.scrolled {
            background: rgba(0,0,0,0.95);
            box-shadow: 0 5px 20px rgba(0,0,0,0.5);
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        
        .nav-links a {
            color: var(--light);
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at center, #1a1a1a 0%, #000 100%);
            padding: 6rem 2rem 2rem;
        }
        
        .hero-content {
            text-align: center;
            max-width: 1000px;
            animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 900;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .tagline {
            font-size: 1.5rem;
            color: var(--gray);
            margin-bottom: 3rem;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 15px;
            padding: 2rem 1.5rem;
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #aaa;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Buttons */
        .cta-button {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: var(--dark);
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            border-radius: 50px;
            transition: all 0.3s;
            margin: 0.5rem;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
        }
        
        .cta-button.secondary {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }
        
        /* Section Styles */
        section {
            padding: 5rem 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h2 {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 3rem;
            color: var(--primary);
        }
        
        /* Features Section */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: rgba(255,255,255,0.05);
            padding: 2rem;
            border-radius: 10px;
            border: 1px solid rgba(255,215,0,0.2);
            transition: all 0.3s;
        }
        
        .feature-card:hover {
            background: rgba(255,255,255,0.08);
            transform: translateY(-5px);
        }
        
        .feature-card h3 {
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        /* TradingView Chart */
        #tradingview-widget {
            width: 100%;
            height: 500px;
            border-radius: 10px;
            overflow: hidden;
            margin: 2rem 0;
        }
        
        /* Reviews Section */
        .reviews-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .review-card {
            background: rgba(255,255,255,0.05);
            padding: 2rem;
            border-radius: 10px;
            border: 1px solid rgba(255,215,0,0.2);
            position: relative;
        }
        
        .review-card::before {
            content: '"';
            position: absolute;
            top: 10px;
            left: 20px;
            font-size: 4rem;
            color: var(--primary);
            opacity: 0.3;
        }
        
        .reviewer {
            display: flex;
            align-items: center;
            margin-top: 1.5rem;
        }
        
        .reviewer-info {
            margin-left: 1rem;
        }
        
        .reviewer-name {
            font-weight: bold;
            color: var(--primary);
        }
        
        .reviewer-role {
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .stars {
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        /* Pricing Section */
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .pricing-card {
            background: rgba(255,255,255,0.05);
            padding: 3rem 2rem;
            border-radius: 15px;
            border: 1px solid rgba(255,215,0,0.2);
            text-align: center;
            position: relative;
            transition: all 0.3s;
        }
        
        .pricing-card.popular {
            border-color: var(--primary);
            transform: scale(1.05);
        }
        
        .popular-badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: var(--dark);
            padding: 0.5rem 2rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .price {
            font-size: 3rem;
            font-weight: bold;
            color: var(--primary);
            margin: 1rem 0;
        }
        
        .price-period {
            font-size: 1rem;
            color: var(--gray);
        }
        
        .pricing-features {
            list-style: none;
            margin: 2rem 0;
        }
        
        .pricing-features li {
            padding: 0.5rem 0;
            color: #ccc;
        }
        
        .pricing-features li::before {
            content: "✓ ";
            color: var(--primary);
            font-weight: bold;
        }
        
        /* FAQ Section */
        .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: rgba(255,255,255,0.05);
            margin-bottom: 1rem;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid rgba(255,215,0,0.2);
        }
        
        .faq-question {
            padding: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.3s;
        }
        
        .faq-question:hover {
            background: rgba(255,255,255,0.08);
        }
        
        .faq-question h3 {
            color: var(--light);
            font-size: 1.1rem;
        }
        
        .faq-toggle {
            font-size: 1.5rem;
            color: var(--primary);
            transition: transform 0.3s;
        }
        
        .faq-answer {
            padding: 0 1.5rem;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s;
        }
        
        .faq-item.active .faq-answer {
            padding: 0 1.5rem 1.5rem;
            max-height: 500px;
        }
        
        .faq-item.active .faq-toggle {
            transform: rotate(45deg);
        }
        
        /* Footer */
        footer {
            background: rgba(0,0,0,0.8);
            padding: 3rem 2rem;
            text-align: center;
            border-top: 1px solid rgba(255,215,0,0.2);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            h1 {
                font-size: 3rem;
            }
            
            .stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .pricing-card.popular {
                transform: scale(1);
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="#" class="logo">AutoXAU</a>
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#chart">Live Chart</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>AutoXAU Trading Bot</h1>
            <p class="tagline">Professional Automated Trading System for XAUUSD</p>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-value">79.3%</div>
                    <div class="stat-label">Win Rate</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">$793</div>
                    <div class="stat-label">Weekly Profit</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">24/7</div>
                    <div class="stat-label">Auto Trading</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">0.1s</div>
                    <div class="stat-label">Execution Speed</div>
                </div>
            </div>
            
            <div class="cta-section">
                <a href="#pricing" class="cta-button">Start Trading Now</a>
                <a href="#features" class="cta-button secondary">Learn More</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features">
        <h2>Why Choose AutoXAU?</h2>
        <div class="features-grid">
            <div class="feature-card">
                <h3>🤖 Fully Automated</h3>
                <p>Set it and forget it. AutoXAU handles all trading decisions 24/7 without manual intervention.</p>
            </div>
            <div class="feature-card">
                <h3>📈 Proven Profitability</h3>
                <p>79.3% win rate with consistent weekly returns. Real results from real market conditions.</p>
            </div>
            <div class="feature-card">
                <h3>🛡️ Advanced Risk Management</h3>
                <p>Sophisticated stop-loss and position sizing algorithms protect your capital.</p>
            </div>
            <div class="feature-card">
                <h3>⚡ Lightning Fast</h3>
                <p>0.1 second average execution speed ensures you never miss profitable opportunities.</p>
            </div>
            <div class="feature-card">
                <h3>🔐 Secure & Reliable</h3>
                <p>Bank-level security with encrypted connections. Your funds stay in your broker account.</p>
            </div>
            <div class="feature-card">
                <h3>🎯 XAUUSD Specialist</h3>
                <p>Exclusively focused on gold trading with years of market expertise built into every algorithm.</p>
            </div>
        </div>
    </section>

    <!-- Live Chart Section -->
    <section id="chart">
        <h2>Live XAUUSD Chart</h2>
        <div id="tradingview-widget">
            <!-- TradingView Widget BEGIN -->
            <div class="tradingview-widget-container">
                <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
                {
                "symbols": [
                    {
                        "proName": "FOREXCOM:XAUUSD",
                        "title": "Gold"
                    }
                ],
                "showSymbolLogo": true,
                "colorTheme": "dark",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "en"
                }
                </script>
            </div>
            <!-- TradingView Widget END -->
            <iframe src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=OANDA%3AXAUUSD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AXAUUSD" style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen></iframe>
        </div>
    </section>

    <!-- Reviews Section -->
    <section id="reviews">
        <h2>What Our Traders Say</h2>
        <div class="reviews-grid">
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"AutoXAU has transformed my trading. The consistency is remarkable - 79% win rate speaks for itself!"</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">Michael Chen</div>
                        <div class="reviewer-role">Professional Trader</div>
                    </div>
                </div>
            </div>
            
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"Finally, a trading bot that actually delivers. The XAUUSD focus and expertise shows in every trade."</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">Sarah Johnson</div>
                        <div class="reviewer-role">Investment Manager</div>
                    </div>
                </div>
            </div>
            
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"Started with $1000, made $793 in my first week. The automation is flawless and support is excellent."</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">David Williams</div>
                        <div class="reviewer-role">Retail Trader</div>
                    </div>
                </div>
            </div>
            
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"The risk management is exceptional. Even in volatile markets, AutoXAU maintains steady profits."</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">James Rodriguez</div>
                        <div class="reviewer-role">Hedge Fund Analyst</div>
                    </div>
                </div>
            </div>
            
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"24/7 automated trading means I never miss opportunities. Best investment in my trading career."</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">Lisa Anderson</div>
                        <div class="reviewer-role">Day Trader</div>
                    </div>
                </div>
            </div>
            
            <div class="review-card">
                <div class="stars">★★★★★</div>
                <p>"I've tested many bots - AutoXAU is the only one I trust with my capital. Exceptional performance."</p>
                <div class="reviewer">
                    <div class="reviewer-info">
                        <div class="reviewer-name">Thomas Brown</div>
                        <div class="reviewer-role">Trading Mentor</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing">
        <h2>Choose Your Plan</h2>
        <div class="pricing-grid">
            <div class="pricing-card">
                <h3>Basic</h3>
                <div class="price">$39<span class="price-period">/month</span></div>
                <p>Perfect for beginners</p>
                <ul class="pricing-features">
                    <li>1 MT4/MT5 Account</li>
                    <li>Automated XAUUSD Trading</li>
                    <li>24/7 Market Monitoring</li>
                    <li>Basic Risk Management</li>
                    <li>Email Support</li>
                    <li>$1,000 Min Capital</li>
                </ul>
                <a href="#" class="cta-button">Get Started</a>
            </div>
            
            <div class="pricing-card popular">
                <div class="popular-badge">MOST POPULAR</div>
                <h3>Professional</h3>
                <div class="price">$69<span class="price-period">/month</span></div>
                <p>For serious traders</p>
                <ul class="pricing-features">
                    <li>2 MT4/MT5 Accounts</li>
                    <li>Everything in Basic</li>
                    <li>Advanced Risk Settings</li>
                    <li>Priority Support</li>
                    <li>Performance Analytics</li>
                    <li>$1,000 Min Capital</li>
                </ul>
                <a href="#" class="cta-button">Get Started</a>
            </div>
            
            <div class="pricing-card">
                <h3>Premium</h3>
                <div class="price">$99<span class="price-period">/month</span></div>
                <p>Maximum performance</p>
                <ul class="pricing-features">
                    <li>3 MT4/MT5 Accounts</li>
                    <li>Everything in Professional</li>
                    <li>Aggressive Trading Mode</li>
                    <li>1-on-1 Setup Support</li>
                    <li>Custom Optimization</li>
                    <li>$2,000 Min Capital</li>
                </ul>
                <a href="#" class="cta-button">Get Started</a>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-container">
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>What is AutoXAU and how does it work?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>AutoXAU is a professional automated trading system specifically designed for XAUUSD (Gold) trading. It uses advanced algorithms and technical analysis to identify high-probability trading opportunities 24/7, executing trades automatically on your MT4/MT5 account.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>What kind of returns can I expect?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>Based on historical performance, AutoXAU has achieved an average weekly return of 15-20% with a 79.3% win rate. However, past performance doesn't guarantee future results. Our system focuses on consistent, sustainable profits with proper risk management.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>Do I need trading experience to use AutoXAU?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>No prior trading experience is required. AutoXAU is fully automated and handles all trading decisions. You simply need to connect it to your MT4/MT5 account, and the bot will manage everything else. We provide comprehensive setup guides and support.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>What is the minimum capital required?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>We recommend starting with a minimum of $1,000 for optimal performance. However, the system can work with as little as $500. Higher capital allows for better risk management and potentially higher absolute returns.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>How safe is my investment?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>AutoXAU employs strict risk management protocols including stop-loss orders, position sizing, and drawdown limits. While all trading involves risk, our system is designed to protect capital and minimize losses during adverse market conditions.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>Can I use AutoXAU with my existing broker?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>Yes, AutoXAU is compatible with any broker that supports MT4/MT5 platforms and offers XAUUSD trading. We recommend brokers with low spreads and fast execution for optimal performance.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>How many accounts can I run with one subscription?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>This depends on your subscription plan. Basic ($39) allows 1 account, Professional ($69) allows 2 accounts, and Premium ($99) allows 3 accounts. All plans include the same core features and trading algorithm.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>Is there ongoing support after purchase?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>Yes, all subscription plans include 24/7 customer support, regular updates, and access to our exclusive trading community. We also provide market analysis, optimization tips, and performance monitoring tools.</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    <h3>Can I cancel my subscription anytime?</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>Absolutely. There are no long-term contracts or hidden fees. You can cancel your subscription at any time through your dashboard. Your bot will continue to work until the end of your current billing period.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 AutoXAU. Professional XAUUSD Trading System.</p>
        <p>Risk Disclaimer: Trading involves substantial risk. Past performance does not guarantee future results.</p>
    </footer>

    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // FAQ toggle
        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            faqItem.classList.toggle('active');
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Request: ${req.method} ${parsedUrl.pathname}`);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    // Serve the main page
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHTML());
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU server with all features is running!');
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📍 Domain: http://autoxau.com`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.log('Port 3000 is already in use. Trying to restart...');
        process.exit(1);
    }
});
EOF

# Step 3: Restart PM2 with new app.js
echo -e "\n🚀 Step 3: Restarting server with all features..."
pm2 stop autoxau
pm2 delete autoxau
pm2 start app.js --name autoxau
pm2 save

# Step 4: Test the site
echo -e "\n🧪 Step 4: Testing site..."
sleep 3
if curl -s http://localhost:3000 | grep -q "AutoXAU Trading Bot"; then
    echo "✅ Site is running with all features!"
else
    echo "⚠️  Site may still be starting up..."
fi

# Step 5: Setup SSL (optional)
echo -e "\n🔒 Step 5: SSL Setup (optional)"
echo "To enable HTTPS, run:"
echo "sudo certbot --nginx -d autoxau.com -d www.autoxau.com"

# Final status
echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ AutoXAU Complete Update Finished!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Your site now has:"
echo "✅ Navigation menu"
echo "✅ Hero section with stats"
echo "✅ Features section"
echo "✅ Live TradingView chart"
echo "✅ Customer reviews (6 testimonials)"
echo "✅ Pricing plans ($39/$69/$99)"
echo "✅ FAQ section (9 questions)"
echo "✅ Responsive design"
echo "✅ Smooth scrolling"
echo "✅ Professional animations"
echo ""
echo "📍 Access your site:"
echo "- Local: http://localhost:3000"
echo "- Server IP: http://$(curl -s ifconfig.me 2>/dev/null):3000"
echo "- Domain: http://autoxau.com"
echo ""
echo "📝 Next steps for payment integration:"
echo "1. Sign up for Stripe account"
echo "2. Get API keys"
echo "3. Add payment processing endpoints"
echo ""
echo "🔧 Useful commands:"
echo "- View logs: pm2 logs autoxau"
echo "- Check status: pm2 status"
echo "- Restart: pm2 restart autoxau"
echo "- Edit site: nano app.js"
