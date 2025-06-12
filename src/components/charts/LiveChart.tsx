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
