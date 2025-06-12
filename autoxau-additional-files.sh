// src/app/api/download-ea/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { subscriptions } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has active subscription
    const userSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.clerkId, userId))
      .limit(1);

    if (!userSubscription.length || userSubscription[0].status !== 'active') {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      );
    }

    // Determine EA file based on subscription plan
    const plan = userSubscription[0].plan;
    const eaFileName = 'AutoXAU_Pro.ex5'; // Same EA for all plans
    
    // Path to EA files (store these securely outside web root)
    const eaPath = path.join('/secure/ea-files', eaFileName);
    
    try {
      const fileBuffer = readFileSync(eaPath);
      
      // Log download for tracking
      console.log(`EA downloaded by user: ${userId}, plan: ${plan}`);
      
      // Return file as download
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${eaFileName}"`,
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    } catch (error) {
      console.error('EA file not found:', error);
      return NextResponse.json(
        { error: 'EA file not available' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed' },
      { status: 500 }
    );
  }
}

// src/components/dashboard/EADownload.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Shield, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EADownload({ subscription }: { subscription: any }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      
      const response = await fetch('/api/download-ea');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Download failed');
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'AutoXAU.ex5';

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('EA downloaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  if (!subscription || subscription.status !== 'active') {
    return (
      <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">EA Download</h3>
        </div>
        <p className="text-gray-400 mb-4">
          An active subscription is required to download the AutoXAU EA.
        </p>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={() => window.location.href = '/#pricing'}
        >
          View Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-green-500" />
        <h3 className="text-xl font-semibold">EA Download</h3>
      </div>
      
      <div className="space-y-3 mb-4">
        <p className="text-sm text-gray-400">
          Plan: <span className="text-yellow-500 font-semibold capitalize">{subscription.plan}</span>
        </p>
        <p className="text-sm text-gray-400">
          Version: <span className="text-white">AutoXAU Pro v2.5</span>
        </p>
      </div>

      <Button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      >
        {downloading ? (
          'Downloading...'
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download AutoXAU EA
          </>
        )}
      </Button>

      <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
        <p className="text-xs text-yellow-500">
          ⚡ This EA is licensed to your account only. Sharing or redistribution is prohibited.
        </p>
      </div>
    </div>
  );
}

// src/lib/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

export const db = drizzle(sql);

// src/app/dashboard/page.tsx (Updated)
'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, Users } from 'lucide-react';
import EADownload from '@/components/dashboard/EADownload';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<any>(null);
  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    profit: 0,
  });

  useEffect(() => {
    // Check for success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast.success('Subscription successful! Welcome to AutoXAU!');
      window.history.replaceState({}, '', '/dashboard');
    }

    // Fetch user subscription
    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/user/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    }
  };

  const accountLimit = {
    basic: 1,
    professional: 2,
    premium: 3,
  }[subscription?.plan || 'basic'] || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.firstName || 'Trader'}!
          </h1>
          <p className="text-gray-400">
            Manage your AutoXAU trading system and monitor performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-sm text-gray-400 mb-1">Trading Status</h3>
            <p className="text-2xl font-bold text-green-500">Active</p>
          </Card>

          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <BarChart3 className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-sm text-gray-400 mb-1">Current Plan</h3>
            <p className="text-2xl font-bold text-yellow-500 capitalize">
              {subscription?.plan || 'None'}
            </p>
          </Card>

          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-sm text-gray-400 mb-1">Account Limit</h3>
            <p className="text-2xl font-bold">{accountLimit}</p>
          </Card>

          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <TrendingUp className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-sm text-gray-400 mb-1">Win Rate</h3>
            <p className="text-2xl font-bold">79.3%</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* EA Download Section */}
          <EADownload subscription={subscription} />

          {/* Quick Start Guide */}
          <Card className="bg-gray-800/50 p-6 backdrop-blur border-gray-700">
            <h2 className="text-xl font-bold mb-4">Installation Guide</h2>
            <ol className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">1.</span>
                Download the AutoXAU EA file
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">2.</span>
                Open MT4/MT5 → File → Open Data Folder
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">3.</span>
                Navigate to MQL4/5 → Experts folder
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">4.</span>
                Copy AutoXAU.ex5 to the Experts folder
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">5.</span>
                Restart MT4/MT5
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">6.</span>
                Drag AutoXAU onto XAUUSD chart
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500 font-bold">7.</span>
                Enable Auto Trading and start earning!
              </li>
            </ol>
          </Card>
        </div>

        {/* Trading Accounts */}
        <Card className="mt-8 bg-gray-800/50 p-6 backdrop-blur border-gray-700">
          <h2 className="text-xl font-bold mb-4">Trading Accounts</h2>
          <div className="space-y-3">
            <p className="text-gray-400">
              You can connect up to {accountLimit} MT4/MT5 account{accountLimit > 1 ? 's' : ''} with your {subscription?.plan || 'current'} plan.
            </p>
            {/* Account management UI would go here */}
          </div>
        </Card>
      </div>
    </div>
  );
}

// src/app/api/user/subscription/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { subscriptions } from '@/models/Schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.clerkId, userId))
      .limit(1);

    if (!userSubscription.length) {
      return NextResponse.json(null);
    }

    return NextResponse.json(userSubscription[0]);
  } catch (error) {
    console.error('Failed to fetch subscription:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}
