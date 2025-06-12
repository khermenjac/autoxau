'use client';

import { motion } from 'framer-motion';
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  Zap, 
  Clock, 
  BarChart3,
  Lock,
  HeadphonesIcon
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: "Fully Automated Trading",
    description: "Set it and forget it. AutoXAU handles all trading decisions 24/7 without manual intervention."
  },
  {
    icon: TrendingUp,
    title: "Proven Profitability",
    description: "79.3% win rate with consistent weekly returns. Real results from real market conditions."
  },
  {
    icon: Shield,
    title: "Advanced Risk Management",
    description: "Sophisticated stop-loss and position sizing algorithms protect your capital."
  },
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "0.1 second average execution speed ensures you never miss profitable opportunities."
  },
  {
    icon: Clock,
    title: "24/7 Market Coverage",
    description: "Never miss a trading opportunity. AutoXAU monitors and trades round the clock."
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Monitor your performance with detailed statistics and live trading data."
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "Bank-level security with encrypted connections. Your funds stay in your broker account."
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Dedicated support team and exclusive community for all your trading needs."
  }
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose AutoXAU?
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Advanced features designed for consistent XAUUSD trading success
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur border border-gray-700 hover:border-yellow-500 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
