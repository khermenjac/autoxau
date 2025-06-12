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
