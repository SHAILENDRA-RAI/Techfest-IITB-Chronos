import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TimeCore from '../3d/TimeCore';
import Modal from '../ui/Modal';
import { useChronos } from '../../context/ChronosContext';

const timelineData = [
  { year: 1998, event: 'Techfest Founded', description: 'The journey of innovation begins at IIT Bombay' },
  { year: 2005, event: 'National Expansion', description: 'Techfest becomes India\'s largest tech fest' },
  { year: 2015, event: 'International Recognition', description: 'Partnerships with global tech giants' },
  { year: 2023, event: '30th Anniversary', description: 'Three decades of inspiring innovation' },
  { year: 2050, event: 'The Future Awaits', description: 'Next generation of technological breakthroughs' },
];

const HeroSection: React.FC = () => {
  const [showTimeline, setShowTimeline] = useState(false);
  const { playSound } = useChronos();

  const handleStartJourney = () => {
    playSound('click');
    const originSection = document.getElementById('origin');
    if (originSection) {
      originSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewTimeline = () => {
    playSound('click');
    setShowTimeline(true);
  };

  const handleCloseTimeline = () => {
    playSound('click');
    setShowTimeline(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 gradient-space" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 gradient-grid opacity-30" />

      {/* 3D Time Core */}
      <div className="absolute inset-0">
        <TimeCore className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <span className="text-glow-cyan text-electric-cyan">TECHFEST</span>
          <br />
          <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan bg-clip-text text-transparent">
            CHRONOS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-display text-lg sm:text-xl md:text-2xl text-white/70 tracking-widest mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          Journey Across Innovation Timelines
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <motion.button
            className="btn-primary text-white"
            onClick={handleStartJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START JOURNEY
          </motion.button>

          <motion.button
            className="btn-secondary text-white"
            onClick={handleViewTimeline}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW TIMELINE
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-electric-cyan rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      <Modal isOpen={showTimeline} onClose={handleCloseTimeline} title="Innovation Timeline">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric-cyan via-neon-purple to-electric-cyan" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Year Badge */}
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full glass flex items-center justify-center border border-electric-cyan/50">
                  <span className="font-display text-sm font-bold text-electric-cyan">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-4">
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {item.event}
                  </h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;
