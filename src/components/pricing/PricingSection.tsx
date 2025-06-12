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
