import React from 'react';
import { motion, useScroll, useMotionTemplate } from 'framer-motion';

const ScrollIndicators: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan"
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        />
      </div>
    </>
  );
};

export default ScrollIndicators;
