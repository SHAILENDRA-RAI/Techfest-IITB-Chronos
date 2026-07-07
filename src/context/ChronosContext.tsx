import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSound, SoundType } from '../hooks/useSoundSystem';

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  timestamp?: number;
}

interface HUDMessage {
  id: string;
  text: string;
  type: 'info' | 'success' | 'system';
  timestamp: number;
}

interface ChronosContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  hyperMode: boolean;
  toggleHyperMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  portalActivated: boolean;
  setPortalActivated: (activated: boolean) => void;
  playSound: (type: SoundType) => void;
  initSound: () => Promise<void>;
  hudMessages: HUDMessage[];
  addHUDMessage: (text: string, type?: 'info' | 'success' | 'system') => void;
}

const defaultAchievements: Achievement[] = [
  { id: 'origin', title: 'Origin Discovered', description: 'Explored the birth of innovation', unlocked: false },
  { id: 'present', title: 'Present Unlocked', description: 'Witnessed Techfest 30th Edition', unlocked: false },
  { id: 'dimensions', title: 'Dimensions Explored', description: 'Navigated all innovation dimensions', unlocked: false },
  { id: 'future', title: 'Future Activated', description: 'Activated the time portal', unlocked: false },
  { id: 'ai', title: 'AI Dimension Unlocked', description: 'Entered the AI world', unlocked: false },
  { id: 'robotics', title: 'Robotics Mastered', description: 'Explored robotics dimension', unlocked: false },
  { id: 'space', title: 'Space Pioneer', description: 'Ventured into space technology', unlocked: false },
  { id: 'quantum', title: 'Quantum Achieved', description: 'Understanding quantum computing', unlocked: false },
];

const systemMessages = [
  'Timeline synchronization complete',
  'Innovation archive detected',
  'Future pathway unlocked',
  'Scanning historical data...',
  'Quantum processors online',
  'Neural network calibrated',
  'Dimensional rift detected',
  'Chronometer stabilized',
  'Memory banks synchronized',
  'Predictive algorithms active',
  'Temporal flux normalized',
  'Data stream established',
];

const ChronosContext = createContext<ChronosContextType | undefined>(undefined);

export const ChronosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentYear, setCurrentYear] = useState(2026);
  const [hyperMode, setHyperMode] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements);
  const [activeSection, setActiveSection] = useState('hero');
  const [portalActivated, setPortalActivated] = useState(false);
  const [hudMessages, setHUDMessages] = useState<HUDMessage[]>([]);

  const { isMuted, isReady, initSound, playSound: playSoundInternal, toggleMute } = useSound();

  // Sound preference from localStorage
  const savedSoundPref = localStorage.getItem('chronos-sound-muted');
  const initialSoundEnabled = savedSoundPref !== 'true';
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled);

  useEffect(() => {
    // Apply hyper mode class to body
    document.body.classList.remove('hyper-mode', 'normal-mode');
    document.body.classList.add(hyperMode ? 'hyper-mode' : 'normal-mode');
  }, [hyperMode]);

  // Play sound with mute check
  const playSound = useCallback((type: SoundType) => {
    if (!isMuted && isReady) {
      playSoundInternal(type);
    }
  }, [isMuted, isReady, playSoundInternal]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    toggleMute();
    setSoundEnabled(isMuted);
    localStorage.setItem('chronos-sound-enabled', String(isMuted));
    // Play confirmation sound when toggling on
    if (isMuted && isReady) {
      playSoundInternal('click');
    }
  }, [isMuted, isReady, toggleMute, playSoundInternal]);

  // Toggle hyper mode
  const toggleHyperMode = useCallback(() => {
    setHyperMode(prev => !prev);
    playSound('click');
  }, [playSound]);

  // Unlock achievement
  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        playSound('achievement');
        return prev.map(a =>
          a.id === id ? { ...a, unlocked: true, timestamp: Date.now() } : a
        );
      }
      return prev;
    });
  }, [playSound]);

  // Add HUD message
  const addHUDMessage = useCallback((text: string, type: 'info' | 'success' | 'system' = 'system') => {
    const message: HUDMessage = {
      id: `hud-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      type,
      timestamp: Date.now(),
    };
    setHUDMessages(prev => [...prev.slice(-4), message]);
  }, []);

  // Random HUD messages every few seconds
  useEffect(() => {
    if (isLoading) return;

    // Initial message
    addHUDMessage('System initialized', 'success');

    const interval = setInterval(() => {
      const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
      addHUDMessage(randomMessage, 'info');
    }, 8000 + Math.random() * 4000); // Random interval between 8-12 seconds

    return () => clearInterval(interval);
  }, [isLoading, addHUDMessage]);

  // Section change whoosh sound
  useEffect(() => {
    if (!isLoading && isReady) {
      playSound('whoosh');
    }
  }, [activeSection, isLoading, isReady, playSound]);

  return (
    <ChronosContext.Provider
      value={{
        isLoading,
        setIsLoading,
        loadingProgress,
        setLoadingProgress,
        currentYear,
        setCurrentYear,
        hyperMode,
        toggleHyperMode,
        soundEnabled,
        toggleSound,
        achievements,
        unlockAchievement,
        activeSection,
        setActiveSection,
        portalActivated,
        setPortalActivated,
        playSound,
        initSound,
        hudMessages,
        addHUDMessage,
      }}
    >
      {children}
    </ChronosContext.Provider>
  );
};

export const useChronos = () => {
  const context = useContext(ChronosContext);
  if (!context) {
    throw new Error('useChronos must be used within a ChronosProvider');
  }
  return context;
};
