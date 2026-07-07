import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChronos } from '../../context/ChronosContext';
import { Trophy } from 'lucide-react';

const AchievementNotification: React.FC = () => {
  const { achievements } = useChronos();
  const [shownAchievements, setShownAchievements] = useState<Set<string>>(new Set());
  const [currentAchievement, setCurrentAchievement] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    // Find newly unlocked achievements
    const newlyUnlocked = achievements.find(
      a => a.unlocked && a.timestamp && !shownAchievements.has(a.id)
    );

    if (newlyUnlocked) {
      setCurrentAchievement({
        title: newlyUnlocked.title,
        description: newlyUnlocked.description,
      });
      setShownAchievements(prev => new Set(prev).add(newlyUnlocked.id));

      // Hide after 4 seconds
      setTimeout(() => {
        setCurrentAchievement(null);
      }, 4000);
    }
  }, [achievements, shownAchievements]);

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          className="fixed bottom-8 right-8 z-[100] pointer-events-none"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="glass-card rounded-xl p-4 flex items-center space-x-4 min-w-[280px]">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-cyan/30 to-neon-purple/30 flex items-center justify-center border border-electric-cyan/50"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 240, 255, 0.3)',
                  '0 0 30px rgba(0, 240, 255, 0.5)',
                  '0 0 20px rgba(0, 240, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="w-6 h-6 text-electric-cyan" />
            </motion.div>
            <div>
              <motion.p
                className="font-display text-xs text-electric-cyan uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Achievement Unlocked
              </motion.p>
              <p className="font-display font-bold text-white mt-1">
                {currentAchievement.title}
              </p>
              <p className="text-sm text-white/60">
                {currentAchievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementNotification;
