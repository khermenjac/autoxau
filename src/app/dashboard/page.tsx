'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { TrendingUp, Download, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
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
          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur border border-gray-700">
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trading Status</h3>
            <p className="text-green-500 font-bold">Active</p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur border border-gray-700">
            <Settings className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
            <p className="text-yellow-500 font-bold">
              {subscription?.plan || 'No active plan'}
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur border border-gray-700">
            <Download className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">EA Download</h3>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
              Download EA
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur border border-gray-700">
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
        </div>
      </div>
    </div>
  );
}
