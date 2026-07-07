import React from 'react';
import { motion } from 'framer-motion';
import { useChronos } from '../../context/ChronosContext';
import { Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { soundEnabled, toggleSound, hyperMode, toggleHyperMode, playSound } = useChronos();

  const handleSoundToggle = () => {
    toggleSound();
  };

  const handleHyperToggle = () => {
    playSound('click');
    toggleHyperMode();
  };

  return (
    <motion.div
      className="fixed bottom-8 left-6 sm:left-8 z-40 flex items-center space-x-2 sm:space-x-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      {/* Sound Toggle */}
      <motion.button
        onClick={handleSoundToggle}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-electric-cyan transition-colors border border-white/10 overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          borderColor: soundEnabled
            ? 'rgba(0, 240, 255, 0.5)'
            : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-electric-cyan" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}

        {/* Sound label on hover */}
        <motion.span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-display uppercase tracking-wider whitespace-nowrap text-white/50"
          initial={{ opacity: 0, y: -5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
        </motion.span>
      </motion.button>

      {/* Hyper Mode Toggle */}
      <motion.button
        onClick={handleHyperToggle}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center transition-all border"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          borderColor: hyperMode
            ? 'rgba(168, 85, 247, 0.8)'
            : 'rgba(255, 255, 255, 0.1)',
          boxShadow: hyperMode
            ? '0 0 30px rgba(168, 85, 247, 0.4)'
            : '0 0 0px rgba(168, 85, 247, 0)',
        }}
      >
        {hyperMode ? (
          <Zap className="w-5 h-5 text-neon-purple" />
        ) : (
          <ZapOff className="w-5 h-5 text-white/60" />
        )}
      </motion.button>

      {/* Mode Label - hidden on mobile */}
      <motion.span
        className="font-display text-xs uppercase tracking-wider hidden lg:block"
        animate={{ color: hyperMode ? '#a855f7' : 'rgba(255, 255, 255, 0.4)' }}
      >
        {hyperMode ? 'HYPER MODE' : 'NORMAL'}
      </motion.span>
    </motion.div>
  );
};

export default ControlPanel;
