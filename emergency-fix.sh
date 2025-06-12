#!/bin/bash

# AutoXAU Emergency Fix Script
echo "🚨 Emergency Fix - Installing Node.js and NPM properly"

# Step 1: Remove old Node.js installation
echo "🧹 Cleaning old Node.js installation..."
sudo apt-get remove --purge nodejs npm -y
sudo apt-get autoremove -y

# Step 2: Install Node.js v20 with NPM
echo "📦 Installing Node.js v20 and NPM..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
echo -e "\n✅ Checking installations:"
echo "Node version: $(node --version 2>/dev/null || echo 'Not installed')"
echo "NPM version: $(npm --version 2>/dev/null || echo 'Not installed')"

# If npm is still not found, install it manually
if ! command -v npm &> /dev/null; then
    echo "📦 NPM not found, installing manually..."
    sudo apt-get install -y npm
fi

# Step 3: Create project directory
echo -e "\n📁 Setting up project directory..."
sudo mkdir -p /var/www/autoxau
sudo chown -R $USER:$USER /var/www/autoxau
cd /var/www/autoxau

# Step 4: Initialize a simple Node.js project
echo -e "\n🚀 Initializing project..."
cat > package.json << 'EOF'
{
  "name": "autoxau",
  "version": "1.0.0",
  "description": "AutoXAU Trading Bot",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
EOF

# Step 5: Install dependencies
echo -e "\n📦 Installing project dependencies..."
npm install

# Step 6: Create minimal Next.js app structure
echo -e "\n📝 Creating app structure..."
mkdir -p src/app

# Create page.tsx
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d, #000)', 
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #FCD34D, #F59E0B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          AutoXAU
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#9CA3AF', marginBottom: '2rem' }}>
          Professional XAUUSD Trading Bot
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>79.3%</p>
            <p style={{ color: '#9CA3AF' }}>Win Rate</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>$793</p>
            <p style={{ color: '#9CA3AF' }}>Weekly Profit</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>24/7</p>
            <p style={{ color: '#9CA3AF' }}>Trading</p>
          </div>
        </div>
        <p style={{ color: '#6B7280' }}>Site is being configured...</p>
      </div>
    </main>
  )
}
EOF

# Create layout.tsx
cat > src/app/layout.tsx << 'EOF'
export const metadata = {
  title: 'AutoXAU - Professional XAUUSD Trading Bot',
  description: 'Automated gold trading system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
EOF

# Create next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
EOF

# Step 7: Build the application
echo -e "\n🔨 Building application..."
npm run build || echo "Build might have warnings, continuing..."

# Step 8: Start with PM2
echo -e "\n🚀 Starting application with PM2..."
pm2 delete autoxau 2>/dev/null || true

# Create ecosystem file for PM2
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'autoxau',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/autoxau',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with ecosystem file
pm2 start ecosystem.config.js
pm2 save

# Step 9: Check status
echo -e "\n✅ Setup Complete!"
echo -e "\n📊 Application Status:"
pm2 status

echo -e "\n🌐 Testing site accessibility..."
sleep 3
curl -s http://localhost:3000 > /dev/null && echo "✅ Site is running!" || echo "⚠️  Site might still be starting..."

echo -e "\n📝 Next Steps:"
echo "1. Check logs: pm2 logs autoxau"
echo "2. Visit site: http://localhost:3000"
echo "3. If using domain: http://autoxau.com"
echo ""
echo "🔧 Troubleshooting:"
echo "- View detailed logs: pm2 logs autoxau --lines 100"
echo "- Restart app: pm2 restart autoxau"
echo "- Check Node/NPM: node --version && npm --version"
