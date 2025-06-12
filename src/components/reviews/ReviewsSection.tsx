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
