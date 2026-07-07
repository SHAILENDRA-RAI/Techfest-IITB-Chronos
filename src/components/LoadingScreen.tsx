import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChronos } from '../context/ChronosContext';

const loadingMessages = [
  'CHRONOS ENGINE STARTING...',
  'Scanning Innovation Archives...',
  'Building Timeline...',
  'System Ready.',
];

const LoadingScreen: React.FC = () => {
  const { loadingProgress, setLoadingProgress, setIsLoading, playSound, initSound, addHUDMessage } = useChronos();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showExit, setShowExit] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  // Initialize sound and play boot sequence
  useEffect(() => {
    const initAndPlay = async () => {
      await initSound();
      if (!soundPlayed) {
        playSound('boot');
        setSoundPlayed(true);
      }
    };

    // Small delay to ensure audio context is ready
    const timer = setTimeout(initAndPlay, 100);
    return () => clearTimeout(timer);
  }, [initSound, playSound, soundPlayed]);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 3 + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setShowExit(true);
        addHUDMessage('System ready. Welcome, Innovator.', 'success');
        setTimeout(() => setIsLoading(false), 800);
      }
      setLoadingProgress(Math.min(progress, 100));
    }, 50);

    return () => clearInterval(interval);
  }, [setLoadingProgress, setIsLoading, addHUDMessage]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (currentMessage < loadingMessages.length - 1) {
        setCurrentMessage(prev => Math.min(prev + 1, loadingMessages.length - 1));
      }
    }, 1500);

    return () => clearInterval(messageInterval);
  }, [currentMessage]);

  useEffect(() => {
    const currentFullText = loadingMessages[currentMessage];
    let charIndex = 0;
    setDisplayedText('');

    const typeInterval = setInterval(() => {
      if (charIndex < currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentMessage]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-deep-space overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 gradient-grid opacity-20" />

        {/* Scanning Lines Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-cyan/30 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Logo Animation */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer rings */}
          <div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 rounded-full border border-electric-cyan/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-neon-purple/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-electric-cyan/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center core */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-electric-cyan/20 to-neon-purple/20 backdrop-blur-sm border border-electric-cyan/40 flex items-center justify-center">
              <motion.div
                className="w-4 h-4 rounded-full bg-electric-cyan"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-center mb-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-display text-lg text-electric-cyan tracking-wider">
            {displayedText}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-72 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-electric-cyan to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <motion.p
          className="mt-6 font-display text-sm text-white/30 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(loadingProgress)}%
        </motion.p>

        {/* Techfest branding at bottom */}
        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          <p className="font-display text-xs text-white/40 tracking-widest uppercase">
            30 Years of Innovation
          </p>
          <p className="text-xs text-white/30 mt-1">
            Techfest IIT Bombay
          </p>
        </motion.div>

        {/* Exit Transition */}
        <AnimatePresence>
          {showExit && (
            <motion.div
              className="absolute inset-0 bg-electric-cyan"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: 'bottom' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
