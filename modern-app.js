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
    <title>AutoXAU - Advanced AI-Powered Gold Trading System | Automated XAUUSD Trading Bot</title>
    <meta name="description" content="Experience the future of gold trading with AutoXAU's advanced AI algorithms. Our sophisticated trading system analyzes market patterns 24/7 to maximize your trading potential in the XAUUSD market.">
    
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
            --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-2: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
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
        
        .btn-secondary {
            background: white;
            color: var(--primary);
            padding: 1rem 2.5rem;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s;
            border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
            background: var(--primary);
            color: white;
            transform: translateY(-2px);
        }
        
        .hero-image {
            position: relative;
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
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
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
        
        /* Features Section */
        .features {
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
        
        .features-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: var(--light);
            padding: 2.5rem;
            border-radius: 20px;
            transition: all 0.3s;
            border: 1px solid #E5E7EB;
        }
        
        .feature-card:hover {
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transform: translateY(-5px);
        }
        
        .feature-icon {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 2rem;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--dark);
        }
        
        .feature-card p {
            color: var(--text-light);
            line-height: 1.8;
        }
        
        /* Technology Section */
        .technology {
            padding: 5rem 2rem;
            background: linear-gradient(135deg, #F3F4F6 0%, #EBF5FF 100%);
        }
        
        .tech-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .tech-content h3 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 2rem;
            color: var(--dark);
        }
        
        .tech-list {
            list-style: none;
        }
        
        .tech-list li {
            display: flex;
            align-items: start;
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            background: white;
            border-radius: 15px;
            transition: all 0.3s;
        }
        
        .tech-list li:hover {
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        }
        
        .tech-check {
            width: 30px;
            height: 30px;
            background: var(--secondary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-right: 1rem;
        }
        
        .tech-text h4 {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }
        
        .tech-text p {
            color: var(--text-light);
            line-height: 1.6;
        }
        
        /* Performance Section */
        .performance {
            padding: 5rem 2rem;
            background: white;
        }
        
        .performance-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .performance-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
        
        .perf-card {
            text-align: center;
            padding: 2rem;
            background: linear-gradient(135deg, #EBF5FF 0%, #F3E8FF 100%);
            border-radius: 20px;
            transition: all 0.3s;
        }
        
        .perf-card:hover {
            transform: scale(1.05);
        }
        
        .perf-value {
            font-size: 3rem;
            font-weight: 800;
            background: var(--gradient-2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
        }
        
        .perf-label {
            font-size: 1.1rem;
            color: var(--text);
            font-weight: 600;
        }
        
        /* CTA Section */
        .cta-section {
            padding: 5rem 2rem;
            background: var(--gradient-2);
            color: white;
            text-align: center;
        }
        
        .cta-content h2 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
        }
        
        .cta-content p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .cta-button {
            background: white;
            color: var(--primary);
            padding: 1.25rem 3rem;
            border-radius: 9999px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
            font-size: 1.1rem;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
        }
        
        footer p {
            opacity: 0.8;
            margin-bottom: 0.5rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero-content,
            .tech-grid,
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
            
            .features-grid {
                grid-template-columns: 1fr;
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
                <li><a href="#features">Features</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#performance">Performance</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
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
                    Intelligent Gold Trading Powered by Advanced AI
                </h1>
                <p>
                    Transform your trading experience with AutoXAU's sophisticated algorithmic system. 
                    Our cutting-edge technology analyzes thousands of market signals every second, 
                    executing precision trades in the volatile XAUUSD market with unmatched accuracy.
                </p>
                <div class="hero-buttons">
                    <a href="#start" class="btn-primary">
                        Start Trading Today
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                    <a href="#demo" class="btn-secondary">
                        Watch Demo
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </a>
                </div>
            </div>
            
            <div class="hero-image">
                <div class="stats-grid float-animation">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-value">24/7</div>
                        <div class="stat-label">Market Monitoring</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⚡</div>
                        <div class="stat-value">0.01s</div>
                        <div class="stat-label">Ultra-Fast Execution</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🛡️</div>
                        <div class="stat-value">Secure</div>
                        <div class="stat-label">Bank-Level Protection</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🤖</div>
                        <div class="stat-value">AI-Driven</div>
                        <div class="stat-label">Smart Algorithms</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="section-header">
            <h2>Why Professional Traders Choose AutoXAU</h2>
            <p>
                Experience the perfect blend of advanced technology and market expertise. 
                Our platform delivers institutional-grade trading capabilities to individual traders.
            </p>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🧠</div>
                <h3>Intelligent Market Analysis</h3>
                <p>
                    Our AI engine processes millions of data points, identifying profitable patterns 
                    and market inefficiencies that human traders might miss. Advanced neural networks 
                    continuously learn and adapt to changing market conditions.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Lightning-Fast Execution</h3>
                <p>
                    With sub-millisecond response times, AutoXAU ensures you never miss a trading 
                    opportunity. Our optimized infrastructure delivers institutional-grade execution 
                    speeds to maximize your profit potential.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🛡️</div>
                <h3>Advanced Risk Management</h3>
                <p>
                    Protect your capital with our sophisticated risk control systems. Dynamic position 
                    sizing, intelligent stop-loss algorithms, and real-time exposure monitoring work 
                    together to safeguard your investments.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📈</div>
                <h3>Proven Track Record</h3>
                <p>
                    Join thousands of successful traders who trust AutoXAU. Our transparent performance 
                    metrics and verified trading history demonstrate consistent profitability across 
                    various market conditions.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <h3>Continuous Optimization</h3>
                <p>
                    Our system never stops improving. Machine learning algorithms analyze every trade, 
                    refining strategies and adapting to market evolution. Stay ahead with technology 
                    that grows smarter every day.
                </p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <h3>Global Market Coverage</h3>
                <p>
                    Trade around the clock with our worldwide infrastructure. AutoXAU monitors 
                    international gold markets 24/7, ensuring you capture opportunities across 
                    all trading sessions and time zones.
                </p>
            </div>
        </div>
    </section>

    <!-- Technology Section -->
    <section id="technology" class="technology">
        <div class="tech-grid">
            <div class="tech-content">
                <h3>Cutting-Edge Technology Stack</h3>
                <ul class="tech-list">
                    <li>
                        <div class="tech-check">✓</div>
                        <div class="tech-text">
                            <h4>Neural Network Architecture</h4>
                            <p>Deep learning models trained on decades of market data for superior pattern recognition</p>
                        </div>
                    </li>
                    <li>
                        <div class="tech-check">✓</div>
                        <div class="tech-text">
                            <h4>Quantum-Inspired Algorithms</h4>
                            <p>Next-generation computational methods for complex market analysis and prediction</p>
                        </div>
                    </li>
                    <li>
                        <div class="tech-check">✓</div>
                        <div class="tech-text">
                            <h4>Real-Time Data Processing</h4>
                            <p>High-frequency data streams analyzed instantly for immediate trading decisions</p>
                        </div>
                    </li>
                    <li>
                        <div class="tech-check">✓</div>
                        <div class="tech-text">
                            <h4>Cloud-Based Infrastructure</h4>
                            <p>Scalable, redundant systems ensure 99.99% uptime and consistent performance</p>
                        </div>
                    </li>
                </ul>
            </div>
            
            <div class="tech-image">
                <div class="section-header">
                    <h2>Built for Professional Traders</h2>
                    <p>
                        AutoXAU combines institutional-grade technology with user-friendly design, 
                        making professional trading accessible to everyone. Our platform handles the 
                        complexity while you focus on your investment goals.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Performance Section -->
    <section id="performance" class="performance">
        <div class="section-header">
            <h2>Performance That Speaks for Itself</h2>
            <p>
                Real results from real traders. Our transparent approach means you can verify 
                our performance metrics and make informed decisions about your trading future.
            </p>
        </div>
        
        <div class="performance-content">
            <div class="performance-text">
                <h3>Consistent Excellence in Gold Trading</h3>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-light); margin-bottom: 2rem;">
                    AutoXAU has established itself as the industry leader in automated gold trading. 
                    Our sophisticated algorithms have been refined through years of market analysis, 
                    delivering consistent performance that outpaces traditional trading methods.
                </p>
                <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-light);">
                    Every aspect of our system is designed for maximum efficiency and profitability. 
                    From market entry timing to position management, AutoXAU makes intelligent decisions 
                    based on comprehensive data analysis and proven trading principles.
                </p>
            </div>
            
            <div class="performance-stats">
                <div class="perf-card">
                    <div class="perf-value">10K+</div>
                    <div class="perf-label">Active Traders</div>
                </div>
                <div class="perf-card">
                    <div class="perf-value">$50M+</div>
                    <div class="perf-label">Trading Volume</div>
                </div>
                <div class="perf-card">
                    <div class="perf-value">150+</div>
                    <div class="perf-label">Countries Served</div>
                </div>
                <div class="perf-card">
                    <div class="perf-value">4.8/5</div>
                    <div class="perf-label">User Rating</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="cta-content">
            <h2>Ready to Transform Your Trading?</h2>
            <p>Join thousands of successful traders using AutoXAU</p>
            <a href="#start" class="cta-button">Start Your Journey Today</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 AutoXAU. Advanced Trading Technology.</p>
        <p style="font-size: 0.9rem; opacity: 0.7;">
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
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHTML());
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU Modern Design Server Running');
    console.log(`🎨 Beautiful light theme active`);
    console.log(`📍 Port: ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});
