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
