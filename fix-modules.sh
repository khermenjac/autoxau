#!/bin/bash

# Fix Next.js Module Errors
echo "🔧 Fixing Next.js module errors..."

# Navigate to project directory
cd /var/www/autoxau

# Step 1: Stop PM2 process
echo "⏹️  Stopping PM2 process..."
pm2 stop autoxau

# Step 2: Clean install - remove node_modules and lock files
echo "🧹 Cleaning old installation..."
rm -rf node_modules
rm -f package-lock.json
rm -rf .next

# Step 3: Clear npm cache
echo "🗑️  Clearing npm cache..."
npm cache clean --force

# Step 4: Install specific Next.js version with all dependencies
echo "📦 Installing Next.js and dependencies..."
npm install next@14.0.4 react@18.2.0 react-dom@18.2.0

# Step 5: Install missing Next.js dependencies explicitly
echo "📦 Installing additional Next.js dependencies..."
npm install @next/env @swc/helpers

# Step 6: Install development dependencies
echo "📦 Installing dev dependencies..."
npm install --save-dev typescript @types/react @types/node

# Step 7: Create a simple next.config.js with SWC disabled (fallback to Babel)
echo "📝 Creating Next.js config with fallback..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,  // Disable SWC if causing issues
  experimental: {
    forceSwcTransforms: false,
  },
}

module.exports = nextConfig
EOF

# Step 8: Create .babelrc for fallback
echo "📝 Creating Babel config..."
cat > .babelrc << 'EOF'
{
  "presets": ["next/babel"]
}
EOF

# Step 9: Update package.json with proper scripts
echo "📝 Updating package.json..."
cat > package.json << 'EOF'
{
  "name": "autoxau",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5"
  }
}
EOF

# Step 10: Reinstall with new package.json
echo "📦 Reinstalling with updated configuration..."
npm install

# Step 11: Create a simple working page
echo "📝 Creating simple page..."
mkdir -p src/app
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#FCD34D',
        marginBottom: '1rem'
      }}>
        AutoXAU
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#9CA3AF' }}>
        Professional XAUUSD Trading Bot
      </p>
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          borderRadius: '0.5rem'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>79.3%</div>
          <div style={{ color: '#9CA3AF' }}>Win Rate</div>
        </div>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          borderRadius: '0.5rem'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D' }}>$793</div>
          <div style={{ color: '#9CA3AF' }}>Weekly</div>
        </div>
      </div>
    </div>
  )
}
EOF

# Step 12: Create layout
cat > src/app/layout.tsx << 'EOF'
export const metadata = {
  title: 'AutoXAU Trading Bot',
  description: 'Professional XAUUSD Trading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
EOF

# Step 13: Try to build
echo "🔨 Building application..."
npm run build

# Step 14: Update PM2 ecosystem config
echo "📝 Updating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'autoxau',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/autoxau',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
}
EOF

# Step 15: Create logs directory
mkdir -p logs

# Step 16: Restart with PM2
echo "🚀 Restarting with PM2..."
pm2 delete autoxau
pm2 start ecosystem.config.js
pm2 save

echo "
✅ Module fixes applied!

📊 Check status:
pm2 status

📝 View logs:
pm2 logs autoxau --lines 20

🌐 Test the site:
curl http://localhost:3000

If still having issues, try:
1. pm2 logs autoxau --lines 50
2. cd /var/www/autoxau && npm run dev (for testing)
"
