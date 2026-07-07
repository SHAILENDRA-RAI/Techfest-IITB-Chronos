import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChronos } from '../../context/ChronosContext';

const HUDMessages: React.FC = () => {
  const { hudMessages, isLoading } = useChronos();

  if (isLoading || hudMessages.length === 0) return null;

  return (
    <div className="fixed top-24 left-6 z-40 pointer-events-none max-w-xs">
      <AnimatePresence mode="popLayout">
        {hudMessages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`mb-2 text-xs font-mono px-3 py-1.5 rounded border-l-2 backdrop-blur-sm
              ${msg.type === 'success' ? 'text-electric-cyan border-electric-cyan bg-electric-cyan/5' :
                msg.type === 'info' ? 'text-neon-purple border-neon-purple bg-neon-purple/5' :
                'text-white/50 border-white/20 bg-white/5'}`}
          >
            <span className="mr-2 opacity-50">&gt;</span>
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HUDMessages;
