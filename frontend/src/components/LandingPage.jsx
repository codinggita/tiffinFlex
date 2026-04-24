import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, ArrowRight, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating icons animation
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] overflow-hidden">
      {/* ============ NAVIGATION ============ */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#E65A2C] to-[#2A9D8F] rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:inline text-[#1a1a1a]">
                TiffinFlex
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {['How It Works', 'Benefits', 'Plans', 'About'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-medium text-[#1a1a1a] hover:text-[#E65A2C] transition"
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.button
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#E65A2C] to-[#D94A1C] text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Customising
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1a1a1a]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1a1a1a]" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden pb-4 flex flex-col gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {['How It Works', 'Benefits', 'Plans'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-[#1a1a1a] hover:text-[#E65A2C]"
                  >
                    {item}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {['🍛', '🍚', '🫔', '🥘'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-10"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + i * 20}%`,
              }}
              custom={i}
              variants={floatingVariants}
              animate="animate"
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1a1a1a] leading-tight mb-6"
            >
              Tiffin that listens to your
              <span className="block bg-gradient-to-r from-[#E65A2C] to-[#2A9D8F] bg-clip-text text-transparent">
                taste buds.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-[#666] mb-8 leading-relaxed"
            >
              Subscribe once, personalise daily. No more eating what you don't like.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#E65A2C] to-[#D94A1C] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 20px rgba(230, 90, 44, 0.3)', '0 0 40px rgba(230, 90, 44, 0.5)', '0 0 20px rgba(230, 90, 44, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-[#E65A2C] text-[#E65A2C] rounded-lg font-bold text-lg"
                whileHover={{ scale: 1.05, backgroundColor: '#FFF5F0' }}
                whileTap={{ scale: 0.95 }}
              >
                See How It Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - Carousel Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-96 hidden md:flex items-center justify-center"
          >
            <div className="w-full h-full relative">
              {/* Plate Circle */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFE8D6] to-[#FFF5F0] shadow-2xl"
                animate={{ rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-8 rounded-full bg-white flex items-center justify-center text-5xl">
                  🍛
                </div>
              </motion.div>

              {/* Orbiting dishes */}
              {[0, 120, 240].map((angle, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-16 h-16 text-4xl flex items-center justify-center"
                  animate={{
                    rotateZ: -360,
                    x: Math.cos((angle * Math.PI) / 180) * 120,
                    y: Math.sin((angle * Math.PI) / 180) * 120,
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  {['🍚', '🫔', '🥘'][idx]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
