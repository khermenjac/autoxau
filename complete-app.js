const http = require('http');
const url = require('url');
const PORT = 3000;

console.log('Starting AutoXAU Complete Design Server...');

const getHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoXAU - Advanced AI-Powered Gold Trading System | KAMA & Neural Network Technology</title>
    <meta name="description" content="Experience institutional-grade gold trading with AutoXAU's KAMA, RSI Divergence, Fibonacci Retracement, and AI Neural Networks. Advanced algorithmic trading for XAUUSD.">
    
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
            --purple: #8B5CF6;
            --dark: #1F2937;
            --light: #F9FAFB;
            --text: #374151;
            --text-light: #6B7280;
            --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-2: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            --gradient-3: linear-gradient(135deg, #10B981 0%, #3B82F6 100%);
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--light);
            color: var(--text);
            line-height: 1.6;
            overflow-x: hidden;
        }
        
        /* Navigation */
        nav {
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            transition: all 0.3s ease;
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
            background: var(--gradient-2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2.5rem;
            align-items: center;
        }
        
        .nav-links a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            font-size: 0.95rem;
        }
        
        .nav-links a:hover {
            color: var(--primary);
        }
        
        .nav-cta {
            background: var(--primary);
            color: white;
            padding: 0.75rem 1.75rem;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
        }
        
        .nav-cta:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
        }
        
        /* Hero Section */
        .hero {
            margin-top: 80px;
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #EBF5FF 0%, #F3E8FF 100%);
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
            top: -250px;
            right: -250px;
        }
        
        .hero-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            position: relative;
            z-index: 1;
        }
        
        .hero-text h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: var(--gradient-2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero-text h1 span {
            display: block;
            font-size: 1.25rem;
            font-weight: 600;
            background: none;
            -webkit-text-fill-color: var(--text-light);
            margin-bottom: 0.5rem;
        }
        
        .hero-text p {
            font-size: 1.25rem;
            color: var(--text-light);
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn-primary {
            background: var(--primary);
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
        }
        
        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }
        
        .stat-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            text-align: center;
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        
        .stat-icon {
            width: 60px;
            height: 60px;
            background: var(--gradient-2);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: var(--text-light);
            font-weight: 500;
        }
        
        /* Technology Section */
        .technology {
            padding: 5rem 2rem;
            background: white;
        }
        
        .section-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 4rem;
        }
        
        .section-header h2 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            background: var(--gradient-2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .section-header p {
            font-size: 1.25rem;
            color: var(--text-light);
            line-height: 1.8;
        }
        
        .tech-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .tech-card {
            background: linear-gradient(135deg, #F3F4F6 0%, #EBF5FF 100%);
            padding: 2.5rem;
            border-radius: 20px;
            transition: all 0.3s;
            border: 1px solid #E5E7EB;
        }
        
        .tech-card:hover {
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transform: translateY(-5px);
        }
        
        .tech-icon {
            width: 70px;
            height: 70px;
            background: var(--gradient-3);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 2rem;
            color: white;
        }
        
        .tech-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .tech-card p {
            color: var(--text-light);
            line-height: 1.8;
            margin-bottom: 1rem;
        }
        
        .tech-features {
            list-style: none;
            margin-top: 1rem;
        }
        
        .tech-features li {
            padding: 0.5rem 0;
            color: var(--text);
            font-size: 0.9rem;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .tech-features li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--secondary);
            font-weight: bold;
        }
        
        /* Live Chart Section */
        .chart-section {
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #F3F4F6 0%, #EBF5FF 100%);
        }
        
        .chart-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        
        .tradingview-widget {
            width: 100%;
            height: 500px;
            border-radius: 10px;
            overflow: hidden;
        }
        
        /* Pricing Section */
        .pricing {
            padding: 5rem 2rem;
            background: white;
        }
        
        .pricing-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .pricing-card {
            background: var(--light);
            padding: 3rem 2rem;
            border-radius: 20px;
            text-align: center;
            position: relative;
            transition: all 0.3s;
            border: 2px solid transparent;
        }
        
        .pricing-card:hover {
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transform: translateY(-5px);
        }
        
        .pricing-card.popular {
            border-color: var(--primary);
            background: white;
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(59, 130, 246, 0.15);
        }
        
        .popular-badge {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            padding: 0.5rem 2rem;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9rem;
        }
        
        .pricing-icon {
            width: 80px;
            height: 80px;
            background: var(--gradient-2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2.5rem;
        }
        
        .pricing-card h3 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--dark);
        }
        
        .pricing-subtitle {
            color: var(--text-light);
            margin-bottom: 1.5rem;
            font-style: italic;
        }
        
        .price {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 0.5rem;
        }
        
        .price-period {
            font-size: 1.2rem;
            color: var(--text-light);
            font-weight: normal;
        }
        
        .pricing-description {
            color: var(--text);
            margin: 1.5rem 0;
            line-height: 1.8;
            min-height: 80px;
        }
        
        .pricing-features {
            list-style: none;
            margin: 2rem 0;
            text-align: left;
        }
        
        .pricing-features li {
            padding: 0.75rem 0;
            color: var(--text);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .pricing-features li::before {
            content: "✓";
            color: var(--secondary);
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .pricing-cta {
            background: var(--primary);
            color: white;
            padding: 1rem 3rem;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
            margin-top: 1rem;
        }
        
        .pricing-cta:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }
        
        /* Performance Section */
        .performance {
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #F3F4F6 0%, #EBF5FF 100%);
        }
        
        .performance-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .performance-text h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 2rem;
            color: var(--dark);
        }
        
        .ai-features {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            margin-top: 2rem;
        }
        
        .ai-features h4 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--purple);
        }
        
        .ai-list {
            list-style: none;
        }
        
        .ai-list li {
            padding: 0.75rem 0;
            display: flex;
            align-items: start;
            gap: 1rem;
        }
        
        .ai-icon {
            width: 30px;
            height: 30px;
            background: var(--gradient-3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            flex-shrink: 0;
        }
        
        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero-content,
            .performance-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .hero-text h1 {
                font-size: 2.5rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .pricing-card.popular {
                transform: scale(1);
            }
        }
        
        /* Animations */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .float-animation {
            animation: float 3s ease-in-out infinite;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="#" class="logo">AutoXAU</a>
            <ul class="nav-links">
                <li><a href="#technology">Technology</a></li>
                <li><a href="#chart">Live Chart</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#performance">Performance</a></li>
                <li><a href="#start" class="nav-cta">Get Started</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>
                    <span>Next-Generation Trading Technology</span>
                    Intelligent Gold Trading with KAMA & AI Neural Networks
                </h1>
                <p>
                    Experience institutional-grade trading with our advanced algorithmic system. 
                    Combining Kaufman's Adaptive Moving Average (KAMA), RSI Divergence Detection, 
                    Fibonacci Retracement Analysis, and Self-Learning Neural Networks for unparalleled 
                    XAUUSD trading performance.
                </p>
                <div class="hero-buttons">
                    <a href="#pricing" class="btn-primary">
                        Start Trading Today
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="hero-image">
                <div class="stats-grid float-animation">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value">KAMA</div>
                        <div class="stat-label">Adaptive Strategy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🧠</div>
                        <div class="stat-value">AI ML</div>
                        <div class="stat-label">Machine Learning</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📈</div>
                        <div class="stat-value">RSI+</div>
                        <div class="stat-label">Divergence Detection</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">Fibonacci</div>
                        <div class="stat-label">Precision Levels</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Technology Section -->
    <section id="technology" class="technology">
        <div class="section-header">
            <h2>Advanced Trading Technology Stack</h2>
            <p>
                Powered by cutting-edge algorithms and indicators used by top quantitative hedge funds. 
                Our system combines multiple strategies for maximum accuracy and profitability.
            </p>
        </div>
        
        <div class="tech-grid">
            <div class="tech-card">
                <div class="tech-icon">📊</div>
                <h3>KAMA (Kaufman's Adaptive Moving Average)</h3>
                <p>
                    Our proprietary implementation of KAMA automatically adjusts to market volatility, 
                    providing smoother signals in ranging markets and faster response in trending conditions.
                </p>
                <ul class="tech-features">
                    <li>Dynamic volatility adjustment</li>
                    <li>Noise reduction algorithm</li>
                    <li>Trend strength calculation</li>
                    <li>Adaptive signal filtering</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">🧠</div>
                <h3>AI Neural Network with ML</h3>
                <p>
                    Self-learning artificial intelligence that improves with every trade. Our neural 
                    network analyzes patterns, learns from outcomes, and continuously optimizes strategies.
                </p>
                <ul class="tech-features">
                    <li>Deep learning architecture</li>
                    <li>Real-time pattern recognition</li>
                    <li>Predictive modeling</li>
                    <li>Adaptive strategy evolution</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">📈</div>
                <h3>RSI Divergence & Stochastic Cross</h3>
                <p>
                    Advanced momentum analysis combining RSI divergence detection with Stochastic 
                    crossover confirmation for high-probability entry points.
                </p>
                <ul class="tech-features">
                    <li>Hidden divergence detection</li>
                    <li>Multi-timeframe analysis</li>
                    <li>Oversold/Overbought filtering</li>
                    <li>Momentum confirmation system</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">🎯</div>
                <h3>Fibonacci Retracement Engine</h3>
                <p>
                    Automated Fibonacci level calculation with dynamic adjustment based on market 
                    structure, identifying key support and resistance zones.
                </p>
                <ul class="tech-features">
                    <li>Auto swing high/low detection</li>
                    <li>Golden ratio optimization</li>
                    <li>Extension level projections</li>
                    <li>Confluence zone mapping</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">⚡</div>
                <h3>Bollinger Bands + ATR Fusion</h3>
                <p>
                    Volatility-based system combining Bollinger Bands squeeze detection with 
                    Average True Range for dynamic position sizing and risk management.
                </p>
                <ul class="tech-features">
                    <li>Volatility breakout detection</li>
                    <li>Dynamic stop-loss placement</li>
                    <li>Risk-adjusted position sizing</li>
                    <li>Market regime identification</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">🔄</div>
                <h3>MACD Histogram Analysis</h3>
                <p>
                    Enhanced MACD system with histogram pattern recognition and signal line 
                    divergence analysis for trend confirmation and reversal detection.
                </p>
                <ul class="tech-features">
                    <li>Histogram momentum tracking</li>
                    <li>Signal line convergence alerts</li>
                    <li>Zero-line cross validation</li>
                    <li>Multi-timeframe confirmation</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Live Chart Section -->
    <section id="chart" class="chart-section">
        <div class="section-header">
            <h2>Live XAUUSD Market Analysis</h2>
            <p>
                Real-time gold market data with our proprietary indicators overlaid. 
                Watch how AutoXAU analyzes price movements and identifies trading opportunities.
            </p>
        </div>
        
        <div class="chart-container">
            <div class="tradingview-widget">
                <!-- TradingView Widget BEGIN -->
                <iframe 
                    src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.html?width=100%25&height=500&symbol=OANDA%3AXAUUSD&interval=H1&timezone=Etc%2FUTC&theme=light&style=1&locale=en&toolbar_bg=%23f1f3f6&enable_publishing=false&allow_symbol_change=false&studies=%5B%22MACD%40tv-basicstudies%22%2C%22RSI%40tv-basicstudies%22%2C%22BB%40tv-basicstudies%22%5D&show_popup_button=true&popup_width=1000&popup_height=650"
                    style="width: 100%; height: 500px; border: 0;"
                    allowtransparency="true"
                    frameborder="0">
                </iframe>
                <!-- TradingView Widget END -->
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
        <div class="section-header">
            <h2>Choose Your Trading Plan</h2>
            <p>
                Select the perfect plan for your trading goals. All plans include our full suite 
                of advanced indicators and AI technology.
            </p>
        </div>
        
        <div class="pricing-grid">
            <div class="pricing-card">
                <div class="pricing-icon">🥉</div>
                <h3>Starter</h3>
                <p class="pricing-subtitle">Perfect for beginners</p>
                <div class="price">$39<span class="price-period">/month</span></div>
                <p class="pricing-description">
                    Ideal for traders starting their journey with automated gold trading. 
                    Get access to our core KAMA strategy and basic AI signals.
                </p>
                <ul class="pricing-features">
                    <li>1 Trading Account (MT4/MT5)</li>
                    <li>KAMA Adaptive Strategy</li>
                    <li>Basic RSI Divergence Alerts</li>
                    <li>Standard Risk Management</li>
                    <li>Email Support (24h response)</li>
                    <li>$1,000 Minimum Capital</li>
                    <li>Basic Performance Dashboard</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading</a>
            </div>
            
            <div class="pricing-card popular">
                <div class="popular-badge">MOST POPULAR</div>
                <div class="pricing-icon">🥇</div>
                <h3>Professional</h3>
                <p class="pricing-subtitle">For serious traders</p>
                <div class="price">$69<span class="price-period">/month</span></div>
                <p class="pricing-description">
                    Our most popular choice. Full access to all indicators including 
                    Fibonacci, Stochastic, and enhanced AI learning algorithms.
                </p>
                <ul class="pricing-features">
                    <li>2 Trading Accounts (MT4/MT5)</li>
                    <li>ALL Technical Indicators</li>
                    <li>Advanced AI Neural Network</li>
                    <li>Fibonacci Auto-Analysis</li>
                    <li>Priority Support (1h response)</li>
                    <li>$1,000 Minimum Capital</li>
                    <li>Real-time Analytics Dashboard</li>
                    <li>Custom Risk Parameters</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading</a>
            </div>
            
            <div class="pricing-card">
                <div class="pricing-icon">💎</div>
                <h3>Enterprise</h3>
                <p class="pricing-subtitle">Maximum performance</p>
                <div class="price">$99<span class="price-period">/month</span></div>
                <p class="pricing-description">
                    Designed for professional traders and institutions. Includes aggressive 
                    trading modes and personalized AI model training.
                </p>
                <ul class="pricing-features">
                    <li>3 Trading Accounts (MT4/MT5)</li>
                    <li>All Professional Features</li>
                    <li>Aggressive Trading Mode</li>
                    <li>Custom AI Model Training</li>
                    <li>1-on-1 Setup Support</li>
                    <li>$2,000 Minimum Capital</li>
                    <li>API Access for Integration</li>
                    <li>Dedicated Account Manager</li>
                    <li>Weekly Strategy Optimization</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading</a>
            </div>
        </div>
    </section>

    <!-- Performance Section -->
    <section id="performance" class="performance">
        <div class="section-header">
            <h2>AI Learning & Continuous Improvement</h2>
            <p>
                Our AI doesn't just trade – it learns, adapts, and evolves with every market movement. 
                Experience the power of machine learning applied to gold trading.
            </p>
        </div>
        
        <div class="performance-content">
            <div class="performance-text">
                <h3>Self-Optimizing Intelligence</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-light); margin-bottom: 2rem;">
                    AutoXAU's neural network analyzes every trade execution, market condition, and outcome 
                    to continuously refine its strategies. Our AI learns from both successes and setbacks, 
                    building an ever-expanding knowledge base that improves performance over time.
                </p>
                
                <div class="ai-features">
                    <h4>🧠 Machine Learning Capabilities</h4>
                    <ul class="ai-list">
                        <li>
                            <div class="ai-icon">✓</div>
                            <div>
                                <strong>Pattern Recognition Enhancement:</strong> AI identifies and memorizes 
                                profitable patterns, improving accuracy with each occurrence.
                            </div>
                        </li>
                        <li>
                            <div class="ai-icon">✓</div>
                            <div>
                                <strong>Adaptive Strategy Selection:</strong> Automatically switches between 
                                strategies based on market conditions and historical performance data.
                            </div>
                        </li>
                        <li>
                            <div class="ai-icon">✓</div>
                            <div>
                                <strong>Risk Model Evolution:</strong> Continuously adjusts risk parameters 
                                based on market volatility and account performance metrics.
                            </div>
                        </li>
                        <li>
                            <div class="ai-icon">✓</div>
                            <div>
                                <strong>Predictive Accuracy Improvement:</strong> Each trade result feeds 
                                back into the model, increasing prediction accuracy over time.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="performance-stats">
                <div class="stat-card">
                    <h4 style="color: var(--dark); margin-bottom: 1rem;">AI Performance Metrics</h4>
                    <div style="display: grid; gap: 1rem;">
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">15M+</div>
                            <div style="color: var(--text-light);">Patterns Analyzed</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--secondary);">98.7%</div>
                            <div style="color: var(--text-light);">Model Accuracy</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--purple);">24/7</div>
                            <div style="color: var(--text-light);">Learning Active</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">0.3ms</div>
                            <div style="color: var(--text-light);">Decision Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 AutoXAU - Advanced AI Trading Technology</p>
        <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">
            Trading involves risk. Past performance does not guarantee future results. 
            Please trade responsibly.
        </p>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }
        });
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);
    res.writeHead(200, { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(getHTML());
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU Complete Design Server Running');
    console.log(`🎨 All features included: Technology, Live Chart, Pricing`);
    console.log(`📍 Port: ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
