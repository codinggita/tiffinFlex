import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Menu', href: '#' },
    { name: 'Subscription Plans', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Gifting', href: '#' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-espresso/80 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <UtensilsCrossed className="w-8 h-8 text-gold group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-serif font-bold tracking-tight italic text-gold">TiffinFlex</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-offwhite/80 hover:text-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gold hover:text-gold-light transition-colors">
              Login
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold hover:bg-gold-light text-espresso px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-gold/20"
            >
              Subscribe Now
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cocoa border-t border-white/5 px-4 py-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-lg font-medium text-offwhite hover:text-gold">
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            <button className="text-gold font-bold">Login</button>
            <button className="bg-gold text-espresso py-3 rounded-full font-bold">Subscribe Now</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
