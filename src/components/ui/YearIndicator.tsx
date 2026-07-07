import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const YearIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [currentYear, setCurrentYear] = useState(2026);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = latest;
    let year = 2026;
    if (progress <= 0.2) {
      year = 1998;
    } else if (progress <= 0.4) {
      year = Math.round(1998 + (progress - 0.2) * (2026 - 1998) / 0.2);
    } else if (progress <= 0.6) {
      year = Math.round(2026 + (progress - 0.4) * (2050 - 2026) / 0.2);
    } else {
      year = 2050;
    }
    setCurrentYear(year);
  });

  return (
    <motion.div
      className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
    >
      <div className="glass rounded-full px-4 py-6 flex flex-col items-center space-y-4">
        {/* Year Display */}
        <div className="relative">
          <span className="font-display text-4xl lg:text-5xl font-bold text-glow-cyan text-electric-cyan">
            {currentYear}
          </span>
        </div>

        {/* Era Indicator */}
        <div className="w-px h-20 bg-gradient-to-b from-electric-cyan/50 via-neon-purple/50 to-transparent" />

        <div className="text-center">
          <p className="font-display text-xs text-white/60 tracking-widest uppercase">
            {currentYear <= 2000 ? 'Origin' : currentYear <= 2027 ? 'Present' : 'Future'}
          </p>
          <p className="font-display text-[10px] text-white/40 mt-1">ERA</p>
        </div>
      </div>
    </motion.div>
  );
};

export default YearIndicator;
