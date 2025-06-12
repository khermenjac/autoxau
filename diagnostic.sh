#!/bin/bash

# AutoXAU Diagnostic Script
echo "🔍 Running AutoXAU Diagnostic..."

# Check Node version
echo -e "\n📦 Node.js Version:"
node --version
if [ $? -ne 0 ]; then
    echo "❌ Node.js not found! Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if we're in the right directory
echo -e "\n📁 Current directory:"
pwd

# Check if project exists
echo -e "\n📂 Checking project status:"
if [ -d "/var/www/autoxau" ]; then
    cd /var/www/autoxau
    echo "✅ Project directory exists"
    
    # Check if package.json exists
    if [ -f "package.json" ]; then
        echo "✅ package.json found"
    else
        echo "❌ package.json missing - creating new project"
        
        # Create a minimal package.json
        cat > package.json << 'EOF'
{
  "name": "autoxau",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
EOF
    fi
else
    echo "❌ Project directory missing - creating it"
    sudo mkdir -p /var/www/autoxau
    sudo chown $USER:$USER /var/www/autoxau
    cd /var/www/autoxau
fi

# Check PM2 status
echo -e "\n🚀 PM2 Status:"
pm2 list

# Check if site is accessible
echo -e "\n🌐 Checking if site is running:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000 || echo "Site not accessible"

# Fix: Install dependencies with npm (more reliable than pnpm)
echo -e "\n📦 Installing dependencies with npm..."
npm install next@14.0.4 react@latest react-dom@latest
npm install -D typescript @types/react @types/node tailwindcss postcss autoprefixer

# Create minimal Next.js config if missing
if [ ! -f "next.config.js" ]; then
    echo -e "\n📝 Creating next.config.js..."
    cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
EOF
fi

# Create TypeScript config if missing
if [ ! -f "tsconfig.json" ]; then
    echo -e "\n📝 Creating tsconfig.json..."
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF
fi

# Create Tailwind config if missing
if [ ! -f "tailwind.config.js" ]; then
    echo -e "\n📝 Creating tailwind.config.js..."
    cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF
fi

# Create PostCSS config if missing
if [ ! -f "postcss.config.js" ]; then
    echo -e "\n📝 Creating postcss.config.js..."
    cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
fi

# Create src directory structure
echo -e "\n📁 Creating directory structure..."
mkdir -p src/app

# Create a simple page if missing
if [ ! -f "src/app/page.tsx" ]; then
    echo -e "\n📝 Creating simple home page..."
    cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">AutoXAU</h1>
        <p className="text-xl">Professional XAUUSD Trading Bot</p>
        <p className="mt-8 text-gray-400">Site is being set up...</p>
      </div>
    </div>
  )
}
EOF
fi

# Create layout if missing
if [ ! -f "src/app/layout.tsx" ]; then
    echo -e "\n📝 Creating layout..."
    cat > src/app/layout.tsx << 'EOF'
export const metadata = {
  title: 'AutoXAU Trading Bot',
  description: 'Professional XAUUSD automated trading',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOF
fi

# Create globals.css if missing
if [ ! -f "src/app/globals.css" ]; then
    echo -e "\n📝 Creating globals.css..."
    cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
fi

# Try to build
echo -e "\n🔨 Building application..."
npm run build

# Start with PM2
echo -e "\n🚀 Starting with PM2..."
pm2 delete autoxau 2>/dev/null || true
pm2 start npm --name "autoxau" -- start
pm2 save

# Final status check
echo -e "\n✅ Diagnostic Complete!"
echo -e "\n📊 Final Status:"
pm2 status

echo -e "\n🌐 Your site should now be accessible at:"
echo "- http://localhost:3000"
echo "- http://$(hostname -I | awk '{print $1}'):3000"

echo -e "\n📝 Next Steps:"
echo "1. Check if the site is loading: curl http://localhost:3000"
echo "2. View logs: pm2 logs autoxau"
echo "3. If you see errors, run: pm2 logs autoxau --lines 50"
echo ""
echo "🔧 Common fixes:"
echo "- If port 3000 is in use: pm2 delete all && pm2 start npm --name autoxau -- start -- --port 3001"
echo "- If build fails: rm -rf node_modules package-lock.json && npm install"
echo "- To restart: pm2 restart autoxau"
