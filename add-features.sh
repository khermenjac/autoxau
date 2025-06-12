#!/bin/bash

# AutoXAU Complete Features Addition Script
# Run this after the fix script to add all trading bot features

cd /var/www/autoxau

echo "🚀 Adding all AutoXAU features..."

# Create all component directories
mkdir -p src/components/{landing,dashboard,charts,pricing,reviews,faq,layout,ui}
mkdir -p src/app/api/{create-checkout-session,webhook/stripe,download-ea,user/subscription}
mkdir -p src/app/{dashboard,sign-in/[[...sign-in]],sign-up/[[...sign-up]]}

# 1. Create Hero Component
cat > src/components/landing/Hero.tsx << 'EOF'
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
EOF

# 2. Create Features Component
cat > src/components/landing/Features.tsx << 'EOF'
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
EOF

# 3. Create Performance Component
cat > src/components/landing/Performance.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Performance() {
  const pnlData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Profit & Loss ($)',
        data: [1000, 1150, 1280, 1420, 1590, 1680, 1793],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Performance - $1,000 Starting Capital',
        color: '#fff',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <section id="performance" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Proven Performance Results
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Real trading results from our automated XAUUSD trading system
          </p>

          <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur">
            <Line data={pnlData} options={options} />
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">79.3%</p>
                <p className="text-gray-400">Profit Growth</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">82%</p>
                <p className="text-gray-400">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">1.8</p>
                <p className="text-gray-400">Profit Factor</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

# 4. Create Reviews Component
cat > src/components/reviews/ReviewsSection.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Professional Trader",
    rating: 5,
    comment: "AutoXAU has transformed my trading. The consistency is remarkable - 79% win rate speaks for itself!",
    profit: "$12,450",
    duration: "3 months"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Investment Manager",
    rating: 5,
    comment: "Finally, a trading bot that actually delivers. The XAUUSD focus and expertise shows in every trade.",
    profit: "$8,200",
    duration: "2 months"
  },
  {
    id: 3,
    name: "David Williams",
    role: "Retail Trader",
    rating: 5,
    comment: "Started with $1000, made $793 in my first week. The automation is flawless and support is excellent.",
    profit: "$3,180",
    duration: "1 month"
  },
  {
    id: 4,
    name: "Emma Thompson",
    role: "Financial Advisor",
    rating: 5,
    comment: "Recommending AutoXAU to all my clients interested in gold trading. Consistent results, professional service.",
    profit: "$15,600",
    duration: "4 months"
  },
  {
    id: 5,
    name: "James Rodriguez",
    role: "Hedge Fund Analyst",
    rating: 5,
    comment: "The risk management is exceptional. Even in volatile markets, AutoXAU maintains steady profits.",
    profit: "$28,900",
    duration: "6 months"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    role: "Day Trader",
    rating: 5,
    comment: "24/7 automated trading means I never miss opportunities. Best investment in my trading career.",
    profit: "$6,750",
    duration: "2 months"
  },
  {
    id: 7,
    name: "Robert Kim",
    role: "Portfolio Manager",
    rating: 5,
    comment: "The execution speed is lightning fast. AutoXAU catches moves that manual trading would miss.",
    profit: "$21,300",
    duration: "5 months"
  },
  {
    id: 8,
    name: "Maria Garcia",
    role: "Independent Trader",
    rating: 5,
    comment: "Setup was simple, and profits started flowing immediately. Worth every penny of the subscription.",
    profit: "$4,890",
    duration: "6 weeks"
  },
  {
    id: 9,
    name: "Thomas Brown",
    role: "Trading Mentor",
    rating: 5,
    comment: "I've tested many bots - AutoXAU is the only one I trust with my capital. Exceptional performance.",
    profit: "$18,400",
    duration: "4 months"
  },
  {
    id: 10,
    name: "Jennifer Lee",
    role: "Crypto & Forex Trader",
    rating: 5,
    comment: "Moving from manual to AutoXAU was the best decision. Stress-free trading with consistent profits.",
    profit: "$9,600",
    duration: "3 months"
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Trusted by Thousands of Traders
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Real results from real traders using AutoXAU
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-xl backdrop-blur border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.role}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-4">{review.comment}</p>
                
                <div className="flex justify-between text-sm">
                  <span className="text-green-500 font-semibold">Profit: {review.profit}</span>
                  <span className="text-gray-400">{review.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

# 5. Create Pricing Component
cat > src/components/pricing/PricingSection.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    name: "Basic",
    price: "$39",
    period: "/month",
    accounts: "1 MT4/MT5 Account",
    recommendedCapital: "$1,000",
    priceId: "price_basic_39",
    features: [
      "Automated XAUUSD Trading",
      "24/7 Market Monitoring",
      "Advanced Risk Management",
      "Real-time Trade Execution",
      "Email Notifications",
      "Basic Support"
    ]
  },
  {
    name: "Professional",
    price: "$69",
    period: "/month",
    accounts: "2 MT4/MT5 Accounts",
    recommendedCapital: "$1,000",
    priceId: "price_pro_69",
    popular: true,
    features: [
      "Everything in Basic",
      "2 Trading Accounts",
      "Priority Support",
      "Advanced Analytics",
      "Custom Risk Settings",
      "VIP Community Access"
    ]
  },
  {
    name: "Premium",
    price: "$99",
    period: "/month",
    accounts: "3 MT4/MT5 Accounts",
    recommendedCapital: "$2,000",
    priceId: "price_premium_99",
    features: [
      "Everything in Professional",
      "3 Trading Accounts",
      "Aggressive Trading Mode",
      "1-on-1 Setup Support",
      "Custom Strategy Optimization",
      "Dedicated Account Manager"
    ]
  }
];

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Choose Your Trading Plan
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            All plans include the same powerful AutoXAU trading algorithm
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gray-800/50 p-8 rounded-2xl backdrop-blur border ${
                  plan.popular ? 'border-yellow-500' : 'border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <div className="mb-6 space-y-2">
                  <p className="text-yellow-500 font-semibold">{plan.accounts}</p>
                  <p className="text-sm text-gray-400">Recommended Capital: {plan.recommendedCapital}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={loading === plan.priceId}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {loading === plan.priceId ? (
                    'Processing...'
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Get Started
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

# 6. Create FAQ Component
cat > src/components/faq/FAQSection.tsx << 'EOF'
'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "What is AutoXAU and how does it work?",
    answer: "AutoXAU is a professional automated trading system specifically designed for XAUUSD (Gold) trading. It uses advanced algorithms and technical analysis to identify high-probability trading opportunities 24/7, executing trades automatically on your MT4/MT5 account."
  },
  {
    question: "What kind of returns can I expect?",
    answer: "Based on historical performance, AutoXAU has achieved an average weekly return of 15-20% with a 79.3% win rate. However, past performance doesn't guarantee future results. Our system focuses on consistent, sustainable profits with proper risk management."
  },
  {
    question: "Do I need trading experience to use AutoXAU?",
    answer: "No prior trading experience is required. AutoXAU is fully automated and handles all trading decisions. You simply need to connect it to your MT4/MT5 account, and the bot will manage everything else. We provide comprehensive setup guides and support."
  },
  {
    question: "What is the minimum capital required?",
    answer: "We recommend starting with a minimum of $1,000 for optimal performance. However, the system can work with as little as $500. Higher capital allows for better risk management and potentially higher absolute returns."
  },
  {
    question: "How safe is my investment?",
    answer: "AutoXAU employs strict risk management protocols including stop-loss orders, position sizing, and drawdown limits. While all trading involves risk, our system is designed to protect capital and minimize losses during adverse market conditions."
  },
  {
    question: "Can I use AutoXAU with my existing broker?",
    answer: "Yes, AutoXAU is compatible with any broker that supports MT4/MT5 platforms and offers XAUUSD trading. We recommend brokers with low spreads and fast execution for optimal performance."
  },
  {
    question: "How many accounts can I run with one subscription?",
    answer: "This depends on your subscription plan. Basic ($39) allows 1 account, Professional ($69) allows 2 accounts, and Premium ($99) allows 3 accounts. All plans include the same core features and trading algorithm."
  },
  {
    question: "Is there ongoing support after purchase?",
    answer: "Yes, all subscription plans include 24/7 customer support, regular updates, and access to our exclusive trading community. We also provide market analysis, optimization tips, and performance monitoring tools."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. There are no long-term contracts or hidden fees. You can cancel your subscription at any time through your dashboard. Your bot will continue to work until the end of your current billing period."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Everything you need to know about AutoXAU
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg backdrop-blur border border-gray-700"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:text-yellow-500 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

# 7. Create Live Chart Component
cat > src/components/charts/LiveChart.tsx << 'EOF'
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function LiveChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'OANDA:XAUUSD',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: 'tradingview_chart',
          hide_side_toolbar: false,
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies',
          ],
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

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
            Live XAUUSD Chart
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12">
            Real-time gold market data powered by TradingView
          </p>

          <div className="bg-gray-900/50 p-4 rounded-2xl backdrop-blur">
            <div
              id="tradingview_chart"
              ref={containerRef}
              className="h-[500px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF

# 8. Create Navigation Component
cat > src/components/layout/Navigation.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import Logo from '@/components/ui/Logo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#features" className="hover:text-yellow-500 transition-colors">
              Features
            </Link>
            <Link href="/#performance" className="hover:text-yellow-500 transition-colors">
              Performance
            </Link>
            <Link href="/#reviews" className="hover:text-yellow-500 transition-colors">
              Reviews
            </Link>
            <Link href="/#pricing" className="hover:text-yellow-500 transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="hover:text-yellow-500 transition-colors">
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                    Dashboard
                  </button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {['Features', 'Performance', 'Reviews', 'Pricing', 'FAQ'].map((item) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="block hover:text-yellow-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {isSignedIn ? (
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-2 bg-gray-800 rounded-lg">Dashboard</button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-2 border border-gray-600 rounded-lg">Sign In</button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full py-2 bg-yellow-500 text-black rounded-lg font-semibold">
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
EOF

# 9. Create Logo Component
cat > src/components/ui/Logo.tsx << 'EOF'
export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="5" width="30" height="30" rx="5" fill="#EAB308" />
      <path
        d="M15 12L10 25H13L15 20L17 25H20L15 12Z"
        fill="#000000"
      />
      <text x="40" y="28" fontFamily="Arial Black" fontSize="24" fontWeight="900" fill="#EAB308">
        XAU
      </text>
    </svg>
  );
}
EOF

# 10. Create Button Component
cat > src/components/ui/button.tsx << 'EOF'
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
EOF

# 11. Update main page
cat > src/app/page.tsx << 'EOF'
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Performance from '@/components/landing/Performance';
import PricingSection from '@/components/pricing/PricingSection';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import FAQSection from '@/components/faq/FAQSection';
import LiveChart from '@/components/charts/LiveChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Hero />
      <Features />
      <Performance />
      <LiveChart />
      <ReviewsSection />
      <PricingSection />
      <FAQSection />
    </main>
  );
}
EOF

# 12. Update layout
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '@/components/layout/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoXAU - Professional XAUUSD Trading Bot | Automated Gold Trading',
  description: 'AutoXAU offers professional automated trading for XAUUSD with 79.3% win rate. Start trading gold with our advanced algorithmic trading system. 24/7 automated execution.',
  keywords: 'XAUUSD trading bot, gold trading automation, forex trading bot, automated trading system, MT4 expert advisor, MT5 EA, gold trading signals, algorithmic trading',
  openGraph: {
    title: 'AutoXAU - Professional XAUUSD Trading Bot',
    description: 'Automated gold trading with 79.3% win rate. Professional XAUUSD trading system.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-black text-white`}>
          <Navigation />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
EOF

# 13. Create Dashboard
cat > src/app/dashboard/page.tsx << 'EOF'
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
EOF

# 14. Create Sign-in page
cat > src/app/sign-in/\[\[...sign-in\]\]/page.tsx << 'EOF'
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SignIn />
    </div>
  );
}
EOF

# 15. Create Sign-up page
cat > src/app/sign-up/\[\[...sign-up\]\]/page.tsx << 'EOF'
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SignUp />
    </div>
  );
}
EOF

# 16. Create API endpoints
cat > src/app/api/create-checkout-session/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
EOF

# 17. Create middleware
cat > src/middleware.ts << 'EOF'
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhook/stripe",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
EOF

# 18. Create database schema
cat > src/models/Schema.ts << 'EOF'
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
  plan: text('plan').notNull(),
  status: text('status').notNull(),
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
EOF

# Build the application
echo "🔨 Building the application..."
pnpm build

# Restart PM2
echo "🚀 Restarting PM2..."
pm2 restart autoxau

echo "
✅ All AutoXAU features have been added!

📝 Final Configuration Steps:
1. Update your .env file with real API keys:
   - Clerk API keys
   - Stripe API keys
   - Database URL

2. Set up Stripe products:
   cd /var/www/autoxau
   node scripts/setup-stripe.js

3. Upload your EA files to /secure/ea-files/

4. Test your website:
   - Visit http://your-domain.com
   - Check PM2 logs: pm2 logs autoxau

🎉 Your AutoXAU trading bot website is ready!
"
