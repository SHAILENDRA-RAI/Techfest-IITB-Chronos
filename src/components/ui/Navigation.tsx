import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useChronos } from '../../context/ChronosContext';

const navItems = [
  { id: 'hero', label: 'Origin' },
  { id: 'origin', label: 'Past' },
  { id: 'present', label: 'Present' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'future', label: 'Future' },
  { id: 'portal', label: 'Portal' },
];

const Navigation: React.FC = () => {
  const { activeSection, setActiveSection, playSound } = useChronos();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (id: string) => {
    playSound('click');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong py-4' : 'py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('hero')}
          style={{ cursor: 'pointer' }}
        >
          <div className="relative w-10 h-10">
            <motion.div
              className="absolute inset-0 rounded-full border border-electric-cyan/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-electric-cyan/30 to-neon-purple/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-electric-cyan" />
            </div>
          </div>
          <span className="font-display text-lg font-semibold tracking-wider hidden sm:block">
            CHRONOS
          </span>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {navItems.slice(1).map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 sm:px-4 py-2 font-display text-xs sm:text-sm uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? 'text-electric-cyan'
                  : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 glass rounded-lg border-glow-cyan"
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
