#!/bin/bash

# Additional configuration files for AutoXAU

# Create tailwind.config.js
cat > /var/www/autoxau/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

# Create globals.css
cat > /var/www/autoxau/src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --popover: 0 0% 0%;
    --popover-foreground: 0 0% 100%;
    --primary: 45 93% 47%;
    --primary-foreground: 0 0% 0%;
    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 100%;
    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 60%;
    --accent: 0 0% 10%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 45 93% 47%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #111;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
EOF

# Create middleware for authentication
cat > /var/www/autoxau/src/middleware.ts << 'EOF'
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhook/stripe",
    "/api/create-checkout-session"
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
EOF

# Create database schema
cat > /var/www/autoxau/src/models/Schema.ts << 'EOF'
import { pgTable, serial, text, integer, timestamp, boolean, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  stripeCustomerId: text('stripe_customer_id'),
  stripeSubscriptionId: text('stripe_subscription_id'),
  plan: text('plan').notNull(), // basic, professional, premium
  status: text('status').notNull(), // active, canceled, past_due
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tradingAccounts = pgTable('trading_accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  accountNumber: text('account_number').notNull(),
  broker: text('broker').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const trades = pgTable('trades', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').references(() => tradingAccounts.id),
  orderType: text('order_type').notNull(), // buy, sell
  lotSize: decimal('lot_size', { precision: 10, scale: 2 }),
  entryPrice: decimal('entry_price', { precision: 10, scale: 2 }),
  exitPrice: decimal('exit_price', { precision: 10, scale: 2 }),
  profit: decimal('profit', { precision: 10, scale: 2 }),
  status: text('status').notNull(), // open, closed
  openedAt: timestamp('opened_at').defaultNow(),
  closedAt: timestamp('closed_at'),
});
EOF

# Create Stripe webhook handler
mkdir -p /var/www/autoxau/src/app/api/webhook/stripe
cat > /var/www/autoxau/src/app/api/webhook/stripe/route.ts << 'EOF'
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Handle successful subscription
      console.log('Subscription created:', session);
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle subscription update
      console.log('Subscription updated:', subscription);
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      console.log('Subscription canceled:', deletedSubscription);
      break;
  }

  return NextResponse.json({ received: true });
}
EOF

# Create dashboard page
mkdir -p /var/www/autoxau/src/app/dashboard
cat > /var/www/autoxau/src/app/dashboard/page.tsx << 'EOF'
'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Settings, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    // Check for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast.success('Subscription successful! Welcome to AutoXAU!');
      // Clear the URL parameter
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Welcome back, {user?.firstName || 'Trader'}!
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trading Status</h3>
            <p className="text-green-500 font-bold">Active</p>
          </Card>

          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <Settings className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
            <p className="text-yellow-500 font-bold">
              {subscription?.plan || 'No active plan'}
            </p>
          </Card>

          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <Download className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">EA Download</h3>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Download EA
            </Button>
          </Card>
        </div>

        <Card className="bg-gray-800/50 p-8 backdrop-blur border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
          <ol className="space-y-3 list-decimal list-inside text-gray-300">
            <li>Download the AutoXAU EA file using the button above</li>
            <li>Open your MT4/MT5 platform</li>
            <li>Go to File → Open Data Folder → MQL4/5 → Experts</li>
            <li>Copy the AutoXAU.ex4/ex5 file into the Experts folder</li>
            <li>Restart MT4/MT5 and find AutoXAU in the Navigator panel</li>
            <li>Drag AutoXAU onto the XAUUSD chart</li>
            <li>Enable Auto Trading and let AutoXAU work for you!</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
EOF

# Create sign-in and sign-up pages
mkdir -p /var/www/autoxau/src/app/sign-in/[[...sign-in]]
cat > /var/www/autoxau/src/app/sign-in/[[...sign-in]]/page.tsx << 'EOF'
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SignIn />
    </div>
  );
}
EOF

mkdir -p /var/www/autoxau/src/app/sign-up/[[...sign-up]]
cat > /var/www/autoxau/src/app/sign-up/[[...sign-up]]/page.tsx << 'EOF'
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SignUp />
    </div>
  );
}
EOF

# Create Card component
cat > /var/www/autoxau/src/components/ui/card.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
EOF

echo "✅ Additional configuration files created!"
echo ""
echo "📝 Final steps:"
echo "1. Update all environment variables in .env"
echo "2. Set up your database (PostgreSQL recommended)"
echo "3. Create Stripe products with the correct price IDs"
echo "4. Configure Clerk with organization support enabled"
echo "5. Upload your EA files to a secure location for download"
echo ""
echo "🔧 To restart the application after changes:"
echo "cd /var/www/autoxau"
echo "pnpm build"
echo "pm2 restart autoxau"
