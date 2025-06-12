const http = require('http');
const PORT = 3000;

console.log('Starting AutoXAU server...');

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.url}`);
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoXAU - Professional XAUUSD Trading Bot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: white;
            overflow-x: hidden;
        }
        
        .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(ellipse at center, #1a1a1a 0%, #000 100%);
            padding: 20px;
        }
        
        .content {
            text-align: center;
            max-width: 800px;
            animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        h1 {
            font-size: 5rem;
            font-weight: 900;
            margin-bottom: 20px;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }
        
        .tagline {
            font-size: 1.5rem;
            color: #888;
            margin-bottom: 50px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 50px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.2);
            border-radius: 15px;
            padding: 30px 20px;
            transition: all 0.3s ease;
        }
        
        .stat-card:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }
        
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #aaa;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .cta-section {
            margin-top: 50px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            color: #000;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            border-radius: 50px;
            transition: all 0.3s ease;
            margin: 10px;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
        }
        
        .cta-button.secondary {
            background: transparent;
            border: 2px solid #FFD700;
            color: #FFD700;
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 3rem; }
            .tagline { font-size: 1.2rem; }
            .stats { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>AutoXAU</h1>
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
                    <div class="stat-label">Execution</div>
                </div>
            </div>
            
            <div class="cta-section">
                <a href="#" class="cta-button">Start Trading Now</a>
                <a href="#pricing" class="cta-button secondary">View Plans</a>
            </div>
        </div>
    </div>
</body>
</html>
    `);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('✅ AutoXAU server is running!');
    console.log('📍 Local: http://localhost:' + PORT);
    console.log('📍 Network: http://0.0.0.0:' + PORT);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});
