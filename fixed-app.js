const http = require('http');
const url = require('url');
const PORT = 3000;

console.log('Starting AutoXAU Fixed Complete Server...');

const getHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GoldBot Pro - Top #3 XAUUSD Automated Trading Bot | Advanced AI Trading</title>
    <meta name="description" content="Google Ranked #3 XAUUSD Automated Bot. Advanced KAMA, RSI Divergence, Fibonacci & AI Neural Networks for professional gold trading.">
    
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
            --gold: #FFD700;
            --google: #4285F4;
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
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
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

        /* Google Rank Badge */
        .google-rank {
            background: linear-gradient(135deg, #4285F4 0%, #34A853 100%);
            color: white;
            padding: 1rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .google-rank::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .google-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            position: relative;
            z-index: 1;
        }
        
        .google-logo {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .google-text {
            font-size: 1.25rem;
            font-weight: 700;
        }
        
        .rank-badge {
            background: #FFD700;
            color: #1F2937;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 800;
            font-size: 1rem;
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
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #3B82F6 100%);
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
        
        /* Live Chart Section - Fixed */
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
        
        .chart-wrapper {
            width: 100%;
            height: 600px;
            background: #f8f9fa;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            border: 1px solid #e9ecef;
        }
        
        .chart-placeholder {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: var(--text-light);
        }
        
        .chart-placeholder h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .tradingview-widget {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 10px;
        }

        /* Reviews Section */
        .reviews {
            padding: 5rem 2rem;
            background: white;
        }
        
        .reviews-slider {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
        }
        
        .reviews-track {
            display: flex;
            animation: slideReviews 60s linear infinite;
            gap: 2rem;
        }
        
        @keyframes slideReviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        .review-card {
            min-width: 350px;
            background: var(--light);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            flex-shrink: 0;
        }
        
        .reviewer {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .reviewer-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .reviewer-info h4 {
            font-weight: 600;
            color: var(--dark);
        }
        
        .reviewer-info p {
            color: var(--text-light);
            font-size: 0.9rem;
        }
        
        .stars {
            color: #FFD700;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .review-text {
            color: var(--text);
            line-height: 1.6;
            font-style: italic;
        }

        /* FAQ Section */
        .faq {
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #F3F4F6 0%, #EBF5FF 100%);
        }
        
        .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: white;
            margin-bottom: 1rem;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            overflow: hidden;
        }
        
        .faq-question {
            padding: 1.5rem 2rem;
            font-weight: 600;
            color: var(--dark);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }
        
        .faq-question:hover {
            background: var(--light);
        }
        
        .faq-answer {
            padding: 0 2rem 1.5rem;
            color: var(--text-light);
            line-height: 1.6;
            display: none;
        }
        
        .faq-item.active .faq-answer {
            display: block;
        }
        
        .faq-toggle {
            font-size: 1.5rem;
            transition: transform 0.3s;
        }
        
        .faq-item.active .faq-toggle {
            transform: rotate(180deg);
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
            
            .reviews-track {
                animation-duration: 90s;
            }
            
            .review-card {
                min-width: 300px;
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
            <a href="#" class="logo">GoldBot Pro</a>
            <ul class="nav-links">
                <li><a href="#technology">Technology</a></li>
                <li><a href="#chart">Live Chart</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#start" class="nav-cta">Get Started</a></li>
            </ul>
        </div>
    </nav>

    <!-- Google Rank Badge -->
    <div class="google-rank">
        <div class="google-content">
            <div class="google-logo">🏆</div>
            <div class="google-text">Google Rank</div>
            <div class="rank-badge">#3</div>
            <div class="google-text">Top #3 XAUUSD Automated Bot</div>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>
                    <span>Google's Top #3 Rated Trading Bot</span>
                    GoldBot Pro - Advanced AI XAUUSD Trading
                </h1>
                <p>
                    Experience the power of Google's #3 ranked XAUUSD automated trading bot. 
                    Advanced KAMA algorithms, RSI Divergence Detection, Fibonacci Analysis, 
                    and Self-Learning Neural Networks for professional gold trading results.
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
                        <div class="stat-icon">🏆</div>
                        <div class="stat-value">#3</div>
                        <div class="stat-label">Google Rank</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🧠</div>
                        <div class="stat-value">AI ML</div>
                        <div class="stat-label">Machine Learning</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📈</div>
                        <div class="stat-value">KAMA</div>
                        <div class="stat-label">Advanced Strategy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-value">Auto</div>
                        <div class="stat-label">24/7 Trading</div>
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
                Powered by institutional-grade algorithms trusted by professional traders worldwide. 
                Our Google-ranked system combines multiple strategies for maximum accuracy.
            </p>
        </div>
        
        <div class="tech-grid">
            <div class="tech-card">
                <div class="tech-icon">📊</div>
                <h3>KAMA (Kaufman's Adaptive Moving Average)</h3>
                <p>
                    Our proprietary KAMA implementation automatically adjusts to market volatility, 
                    providing superior signal accuracy compared to traditional moving averages.
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
                    Self-learning artificial intelligence that evolves with market conditions. 
                    Our neural network continuously improves trading strategies automatically.
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
                    Advanced momentum analysis with hidden divergence detection and 
                    multi-timeframe confirmation for high-probability entries.
                </p>
                <ul class="tech-features">
                    <li>Hidden divergence detection</li>
                    <li>Multi-timeframe analysis</li>
                    <li>Oversold/Overbought filtering</li>
                    <li>Momentum confirmation</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">🎯</div>
                <h3>Fibonacci Retracement Engine</h3>
                <p>
                    Automated Fibonacci analysis with dynamic level calculation 
                    and confluence zone identification for precise entry/exit points.
                </p>
                <ul class="tech-features">
                    <li>Auto swing detection</li>
                    <li>Golden ratio optimization</li>
                    <li>Extension projections</li>
                    <li>Confluence mapping</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">⚡</div>
                <h3>Bollinger Bands + ATR Fusion</h3>
                <p>
                    Volatility-based system with squeeze detection and dynamic 
                    position sizing for optimal risk management.
                </p>
                <ul class="tech-features">
                    <li>Volatility breakout detection</li>
                    <li>Dynamic stop-loss placement</li>
                    <li>Risk-adjusted sizing</li>
                    <li>Market regime identification</li>
                </ul>
            </div>
            
            <div class="tech-card">
                <div class="tech-icon">🔄</div>
                <h3>MACD Histogram Analysis</h3>
                <p>
                    Enhanced MACD with histogram pattern recognition and 
                    multi-timeframe trend confirmation system.
                </p>
                <ul class="tech-features">
                    <li>Histogram momentum tracking</li>
                    <li>Signal line convergence</li>
                    <li>Zero-line validation</li>
                    <li>Trend confirmation</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Live Chart Section - Fixed -->
    <section id="chart" class="chart-section">
        <div class="section-header">
            <h2>Live XAUUSD Market Analysis</h2>
            <p>
                Real-time gold market data with our AI indicators. Watch GoldBot Pro 
                analyze market movements and identify trading opportunities live.
            </p>
        </div>
        
        <div class="chart-container">
            <div class="chart-wrapper">
                <!-- TradingView Widget -->
                <div class="tradingview-widget-container" style="height:100%;width:100%">
                    <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%">
                        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
                        {
                            "autosize": true,
                            "symbol": "OANDA:XAUUSD",
                            "interval": "240",
                            "timezone": "Etc/UTC",
                            "theme": "light",
                            "style": "1",
                            "locale": "en",
                            "toolbar_bg": "#f1f3f6",
                            "enable_publishing": false,
                            "allow_symbol_change": false,
                            "studies": [
                                "MACD@tv-basicstudies",
                                "RSI@tv-basicstudies",
                                "BB@tv-basicstudies"
                            ],
                            "container_id": "tradingview_chart"
                        }
                        </script>
                    </div>
                </div>
                <!-- Fallback if TradingView doesn't load -->
                <div class="chart-placeholder" id="chart-fallback" style="display: none;">
                    <h3>📈 XAUUSD Live Chart</h3>
                    <p>Loading advanced market analysis...</p>
                    <div style="margin-top: 2rem; padding: 2rem; background: white; border-radius: 10px; display: inline-block;">
                        <div style="font-size: 2rem; color: #FFD700; margin-bottom: 1rem;">📊</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #1F2937;">Current: $2,034.50</div>
                        <div style="color: #10B981; font-weight: 600;">↗ +0.85% Today</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section id="reviews" class="reviews">
        <div class="section-header">
            <h2>What Our Traders Say</h2>
            <p>
                Join thousands of successful traders who trust GoldBot Pro for their XAUUSD trading.
                Read real reviews from verified customers.
            </p>
        </div>
        
        <div class="reviews-slider">
            <div class="reviews-track">
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">JM</div>
                        <div class="reviewer-info">
                            <h4>James Miller</h4>
                            <p>Professional Trader, London</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"GoldBot Pro has revolutionized my trading. The KAMA strategy is incredibly accurate, and I've seen consistent profits since day one. Best investment I've made!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">SL</div>
                        <div class="reviewer-info">
                            <h4>Sarah Johnson</h4>
                            <p>Hedge Fund Manager, NYC</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The AI learning capabilities are outstanding. It adapts to market changes faster than any human trader could. Our fund has integrated this into our gold trading strategy."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">MR</div>
                        <div class="reviewer-info">
                            <h4>Michael Rodriguez</h4>
                            <p>Retail Trader, California</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"I was skeptical about automated trading, but GoldBot Pro proved me wrong. Made back my investment in the first week and haven't looked back since."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">LC</div>
                        <div class="reviewer-info">
                            <h4>Lisa Chen</h4>
                            <p>Investment Advisor, Singapore</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The Fibonacci analysis is spot-on every time. My clients have seen remarkable returns, and the risk management is exceptional. Highly recommended!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">DK</div>
                        <div class="reviewer-info">
                            <h4>David Kim</h4>
                            <p>Day Trader, Seoul</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"24/7 automated trading while I sleep. The RSI divergence detection catches moves I would have missed. Incredible technology and results!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">AB</div>
                        <div class="reviewer-info">
                            <h4>Anna Petrov</h4>
                            <p>Quantitative Analyst, Moscow</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"As a quant, I appreciate the sophisticated algorithms. The neural network learning is genuinely impressive, and the performance metrics speak for themselves."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">TH</div>
                        <div class="reviewer-info">
                            <h4>Thomas Harper</h4>
                            <p>Forex Trader, Frankfurt</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The combination of indicators is perfect. MACD + RSI + Fibonacci working together provides incredibly accurate signals. My win rate has improved dramatically."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">RG</div>
                        <div class="reviewer-info">
                            <h4>Rachel Green</h4>
                            <p>Portfolio Manager, Toronto</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Set it and forget it! The bot handles everything while I focus on other investments. Consistent monthly returns and excellent risk management."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">CF</div>
                        <div class="reviewer-info">
                            <h4>Carlos Fernandez</h4>
                            <p>Independent Trader, Madrid</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Been using it for 6 months now. The AI keeps getting better, and my profits keep growing. The support team is also fantastic and very responsive."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">NK</div>
                        <div class="reviewer-info">
                            <h4>Nina Kowalski</h4>
                            <p>Trader, Warsaw</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The Bollinger Bands integration is brilliant. It catches breakouts perfectly, and the ATR-based position sizing keeps my risk under control. Excellent system!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">BT</div>
                        <div class="reviewer-info">
                            <h4>Ben Thompson</h4>
                            <p>Algorithmic Trader, Sydney</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"As someone who builds trading algorithms, I'm impressed by the sophistication. The KAMA adaptation is superior to anything I've coded myself."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">EM</div>
                        <div class="reviewer-info">
                            <h4>Elena Martinez</h4>
                            <p>Financial Advisor, Barcelona</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"My clients love the consistent returns. The transparency in the AI decision-making process gives them confidence in the automated trading approach."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">JW</div>
                        <div class="reviewer-info">
                            <h4>John Wilson</h4>
                            <p>Swing Trader, Chicago</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The multi-timeframe analysis is what sets this apart. It considers everything from minute charts to daily trends. Absolutely game-changing for gold trading!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">AF</div>
                        <div class="reviewer-info">
                            <h4>Ahmed Farid</h4>
                            <p>Trader, Dubai</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Trading gold has never been easier. The system handles all the complex analysis while I enjoy the profits. The ROI has exceeded all my expectations."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">KL</div>
                        <div class="reviewer-info">
                            <h4>Kevin Lee</h4>
                            <p>Crypto & Forex Trader, Hong Kong</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Moved from crypto to gold with GoldBot Pro. The stability and consistent profits are incredible. The AI learning never stops improving the results."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">VN</div>
                        <div class="reviewer-info">
                            <h4>Victoria Novak</h4>
                            <p>Investment Banker, Prague</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The institutional-grade algorithms are evident in every trade. This is professional-level technology accessible to retail traders. Outstanding performance!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">HS</div>
                        <div class="reviewer-info">
                            <h4>Hassan Shah</h4>
                            <p>Commodities Trader, Karachi</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Been trading commodities for 15 years, and this is the best automated system I've used. The gold market analysis is incredibly accurate and profitable."</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">IS</div>
                        <div class="reviewer-info">
                            <h4>Isabella Silva</h4>
                            <p>Technical Analyst, São Paulo</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The technical analysis is flawless. Every indicator works in perfect harmony, and the entry/exit timing is precise. My trading has transformed completely!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">PK</div>
                        <div class="reviewer-info">
                            <h4>Peter Korhonen</h4>
                            <p>Systematic Trader, Helsinki</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The systematic approach to gold trading is exactly what I needed. Removes emotion from trading and delivers consistent, data-driven results. Highly recommend!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">ZA</div>
                        <div class="reviewer-info">
                            <h4>Zara Ahmed</h4>
                            <p>Wealth Manager, Mumbai</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"Managing client portfolios with GoldBot Pro has been exceptional. The consistent returns and low drawdowns make it perfect for wealth preservation strategies."</p>
                </div>
                
                <!-- Duplicate reviews for infinite scroll effect -->
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">JM</div>
                        <div class="reviewer-info">
                            <h4>James Miller</h4>
                            <p>Professional Trader, London</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"GoldBot Pro has revolutionized my trading. The KAMA strategy is incredibly accurate, and I've seen consistent profits since day one. Best investment I've made!"</p>
                </div>
                
                <div class="review-card">
                    <div class="reviewer">
                        <div class="reviewer-avatar">SL</div>
                        <div class="reviewer-info">
                            <h4>Sarah Johnson</h4>
                            <p>Hedge Fund Manager, NYC</p>
                        </div>
                    </div>
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"The AI learning capabilities are outstanding. It adapts to market changes faster than any human trader could. Our fund has integrated this into our gold trading strategy."</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq">
        <div class="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>
                Get answers to the most common questions about GoldBot Pro and automated XAUUSD trading.
            </p>
        </div>
        
        <div class="faq-container">
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    How does GoldBot Pro's KAMA strategy work?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    GoldBot Pro uses Kaufman's Adaptive Moving Average (KAMA) which automatically adjusts its sensitivity based on market volatility. In trending markets, it becomes more responsive to catch moves quickly. In ranging markets, it smooths out noise to avoid false signals. This adaptive nature combined with our AI neural network creates highly accurate entry and exit points for XAUUSD trades.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    What makes the AI learning system different from other bots?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    Our AI neural network doesn't just follow pre-programmed rules – it actually learns from every trade outcome. It analyzes patterns, market conditions, and results to continuously improve its decision-making. Unlike static algorithms, our system evolves and adapts, becoming more accurate over time. The machine learning component processes millions of data points to identify profitable patterns human traders might miss.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    What is the minimum capital required to start trading?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    The minimum capital depends on your chosen plan: Starter plan requires $1,000, Professional plan requires $1,000, and Enterprise plan requires $2,000. These minimums ensure proper risk management and position sizing. The bot automatically adjusts trade sizes based on your account balance and risk parameters to maximize profits while protecting your capital.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    How do I connect GoldBot Pro to my MT4/MT5 account?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    Setup is simple and takes less than 5 minutes. After purchase, you'll receive detailed instructions and our proprietary EA (Expert Advisor) file. Simply drag and drop the EA onto your XAUUSD chart, configure your risk settings, and the bot starts trading automatically. Our support team provides 1-on-1 setup assistance for Enterprise users, and comprehensive video tutorials for all users.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    Can I customize the risk management settings?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    Absolutely! GoldBot Pro offers extensive customization options. You can adjust risk percentage per trade, maximum daily loss limits, position sizing methods, stop-loss and take-profit levels, and trading hours. Professional and Enterprise plans include advanced risk parameters like ATR-based position sizing, correlation filters, and custom Fibonacci levels. The bot respects your risk tolerance while optimizing for maximum profits.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    What are the average monthly returns?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    While past performance doesn't guarantee future results, our verified trading results show average monthly returns of 8-15% with proper risk management. The AI learning system has shown consistent improvement over time, with some experienced users reporting higher returns. Returns vary based on market conditions, account size, risk settings, and plan type. We provide detailed performance analytics so you can track your progress.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    Does the bot work during all market sessions?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    Yes, GoldBot Pro trades 24/5 during forex market hours (Monday to Friday). The AI automatically adjusts its strategy based on different trading sessions (Asian, European, American). It recognizes session-specific patterns and volatility characteristics. You can also customize trading hours if you prefer to trade only during specific sessions. The bot never misses opportunities while you sleep or are away from your computer.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    What happens if I want to cancel my subscription?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    You can cancel your subscription at any time with no questions asked. There are no long-term contracts or hidden fees. Simply contact our support team or use the customer portal to cancel. Your bot will continue working until the end of your current billing period. We also offer a 30-day money-back guarantee if you're not satisfied with the performance within the first month.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    How often does the AI system update its strategies?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    The AI learning happens continuously in real-time with every trade. However, major strategy updates are deployed weekly based on accumulated learning data. Our development team also releases quarterly updates with enhanced features and improved algorithms. All updates are automatic and seamless – you don't need to do anything. The system becomes smarter and more profitable over time without any intervention from you.
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFAQ(this)">
                    Is my broker compatible with GoldBot Pro?
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    GoldBot Pro works with any broker that offers MT4 or MT5 platforms and XAUUSD trading. This includes most major forex brokers worldwide. We recommend brokers with tight spreads (under 3 pips), fast execution, and good regulation. Our system automatically adjusts to different broker specifications like spread variations and execution speeds. We provide a list of recommended brokers optimized for automated trading.
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
        <div class="section-header">
            <h2>Choose Your Trading Plan</h2>
            <p>
                Select the perfect plan for your trading goals. All plans include our full suite 
                of advanced indicators and AI technology with 30-day money-back guarantee.
            </p>
        </div>
        
        <div class="pricing-grid">
            <div class="pricing-card">
                <div class="pricing-icon">🥉</div>
                <h3>Gold Starter</h3>
                <p class="pricing-subtitle">Perfect for beginners</p>
                <div class="price">$39<span class="price-period">/month</span></div>
                <p class="pricing-description">
                    Ideal for new traders starting their automated gold trading journey. 
                    Get access to our core KAMA strategy and essential AI signals.
                </p>
                <ul class="pricing-features">
                    <li>1 Trading Account (MT4/MT5)</li>
                    <li>KAMA Adaptive Strategy</li>
                    <li>Basic RSI Divergence Alerts</li>
                    <li>Standard Risk Management</li>
                    <li>Email Support (24h response)</li>
                    <li>$1,000 Minimum Capital</li>
                    <li>Basic Performance Dashboard</li>
                    <li>30-Day Money Back Guarantee</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading Now</a>
            </div>
            
            <div class="pricing-card popular">
                <div class="popular-badge">MOST POPULAR</div>
                <div class="pricing-icon">🥇</div>
                <h3>Gold Professional</h3>
                <p class="pricing-subtitle">For serious traders</p>
                <div class="price">$69<span class="price-period">/month</span></div>
                <p class="pricing-description">
                    Our most popular choice. Full access to all indicators including 
                    Fibonacci, Stochastic, and enhanced AI learning algorithms.
                </p>
                <ul class="pricing-features">
                    <li>2 Trading Accounts (MT4/MT5)</li>
                    <li>ALL Advanced Indicators</li>
                    <li>Advanced AI Neural Network</li>
                    <li>Fibonacci Auto-Analysis</li>
                    <li>Priority Support (1h response)</li>
                    <li>$1,000 Minimum Capital</li>
                    <li>Real-time Analytics Dashboard</li>
                    <li>Custom Risk Parameters</li>
                    <li>Multi-timeframe Analysis</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading Now</a>
            </div>
            
            <div class="pricing-card">
                <div class="pricing-icon">💎</div>
                <h3>Gold Enterprise</h3>
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
                    <li>White-label Solutions</li>
                </ul>
                <a href="#" class="pricing-cta">Start Trading Now</a>
            </div>
        </div>
    </section>

    <!-- Performance Section -->
    <section id="performance" class="performance">
        <div class="section-header">
            <h2>AI Learning & Continuous Improvement</h2>
            <p>
                Our AI doesn't just trade – it learns, adapts, and evolves with every market movement. 
                Experience the power of machine learning applied to professional gold trading.
            </p>
        </div>
        
        <div class="performance-content">
            <div class="performance-text">
                <h3>Self-Optimizing Intelligence</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-light); margin-bottom: 2rem;">
                    GoldBot Pro's neural network analyzes every trade execution, market condition, and outcome 
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
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">25M+</div>
                            <div style="color: var(--text-light);">Patterns Analyzed</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--secondary);">94.8%</div>
                            <div style="color: var(--text-light);">Win Rate</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--purple);">24/7</div>
                            <div style="color: var(--text-light);">Learning Active</div>
                        </div>
                        <div style="padding: 1rem; background: var(--light); border-radius: 10px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent);">0.2ms</div>
                            <div style="color: var(--text-light);">Decision Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div style="max-width: 1200px; margin: 0 auto;">
            <h3 style="color: #FFD700; margin-bottom: 1rem;">GoldBot Pro</h3>
            <p>&copy; 2025 GoldBot Pro - Google's #3 Ranked XAUUSD Automated Trading Bot</p>
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">
                Trading involves risk. Past performance does not guarantee future results. 
                Please trade responsibly and never invest more than you can afford to lose.
            </p>
            <div style="margin-top: 2rem; font-size: 0.8rem; opacity: 0.6;">
                <p>Risk Disclosure: Trading foreign exchange and CFDs involves significant risk and may not be suitable for all investors. 
                The possibility exists that you could sustain losses in excess of your deposited funds and therefore, 
                you should not speculate with capital that you cannot afford to lose.</p>
            </div>
        </div>
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

        // FAQ Toggle
        function toggleFAQ(element) {
            const faqItem = element.parentNode;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }

        // Chart fallback
        setTimeout(() => {
            const chartContainer = document.querySelector('.tradingview-widget-container');
            if (!chartContainer || chartContainer.children.length === 0) {
                document.getElementById('chart-fallback').style.display = 'block';
            }
        }, 5000);

        // Auto-open first FAQ
        document.addEventListener('DOMContentLoaded', function() {
            const firstFAQ = document.querySelector('.faq-item');
            if (firstFAQ) {
                firstFAQ.classList.add('active');
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
    console.log('✅ GoldBot Pro Fixed Complete Server Running');
    console.log(`🏆 Google Rank #3 badge added`);
    console.log(`📊 LiveChart fixed with TradingView widget`);
    console.log(`⭐ 20 customer reviews with avatars added`);
    console.log(`❓ 10 comprehensive FAQs added`);
    console.log(`📍 Port: ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
