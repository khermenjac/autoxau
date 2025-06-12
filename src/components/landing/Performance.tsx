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
