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
