'use client';

import { motion } from 'framer-motion';
import { ChartBar, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Automated XAUUSD Trading Excellence</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            AutoXAU Trading Bot
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            Professional automated trading system specialized in XAUUSD (Gold) markets. 
            Powered by advanced algorithms and years of market expertise.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur">
              <TrendingUp className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">79.3%</p>
              <p className="text-sm text-gray-400">Win Rate</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur">
              <ChartBar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">$793</p>
              <p className="text-sm text-gray-400">Weekly Profit</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur">
              <Shield className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-gray-400">Auto Trading</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">0.1s</p>
              <p className="text-sm text-gray-400">Execution Speed</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg transition-colors">
                Start Trading Now
              </button>
            </Link>
            <Link href="#pricing">
              <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 px-8 py-3 rounded-lg transition-colors">
                View Pricing Plans
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
