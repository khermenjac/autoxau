#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        html = '''
<!DOCTYPE html>
<html>
<head>
    <title>AutoXAU</title>
    <style>
        body { margin: 0; background: #000; color: white; font-family: Arial; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .container { text-align: center; }
        h1 { font-size: 5rem; color: #FFD700; }
        .stats { display: flex; gap: 2rem; justify-content: center; margin: 2rem 0; }
        .stat { background: rgba(255,255,255,0.1); padding: 1rem 2rem; border-radius: 10px; }
        .value { font-size: 2rem; color: #FFD700; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>AutoXAU</h1>
        <p>Professional XAUUSD Trading Bot</p>
        <div class="stats">
            <div class="stat"><div class="value">79.3%</div><div>Win Rate</div></div>
            <div class="stat"><div class="value">$793</div><div>Weekly Profit</div></div>
            <div class="stat"><div class="value">24/7</div><div>Trading</div></div>
        </div>
    </div>
</body>
</html>
        '''
        self.wfile.write(html.encode())

print('Starting AutoXAU on port 3000...')
httpd = HTTPServer(('0.0.0.0', 3000), Handler)
print('Server running at http://localhost:3000')
httpd.serve_forever()
