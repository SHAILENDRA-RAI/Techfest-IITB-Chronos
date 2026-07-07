import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChronosProvider, useChronos } from './context/ChronosContext';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Navigation from './components/ui/Navigation';
import ScrollIndicators from './components/ui/ScrollIndicators';
import YearIndicator from './components/ui/YearIndicator';
import ControlPanel from './components/ui/ControlPanel';
import AchievementNotification from './components/ui/AchievementNotification';
import HUDMessages from './components/ui/HUDMessages';
import ParticleBackground from './components/3d/ParticleBackground';
import HeroSection from './components/sections/HeroSection';
import OriginSection from './components/sections/OriginSection';
import PresentSection from './components/sections/PresentSection';
import DimensionsSection from './components/sections/DimensionsSection';
import FutureSection from './components/sections/FutureSection';
import PortalSection from './components/sections/PortalSection';

// First interaction handler to initialize audio
const FirstInteractionHandler: React.FC<{ onInteract: () => void }> = ({ onInteract }) => {
  React.useEffect(() => {
    const handleFirstInteraction = () => {
      onInteract();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [onInteract]);

  return null;
};

const MainContent: React.FC = () => {
  const { isLoading, hyperMode, initSound } = useChronos();
  const [soundInitialized, setSoundInitialized] = React.useState(false);

  const handleFirstInteraction = React.useCallback(async () => {
    if (!soundInitialized) {
      await initSound();
      setSoundInitialized(true);
    }
  }, [soundInitialized, initSound]);

  return (
    <div className={`relative ${hyperMode ? 'hyper-mode' : 'normal-mode'}`}>
      {/* First interaction handler for audio */}
      <FirstInteractionHandler onInteract={handleFirstInteraction} />

      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Custom Cursor - only show after loading */}
      {!isLoading && <CustomCursor />}

      {/* Background particles - always visible */}
      <ParticleBackground className="fixed inset-0 pointer-events-none z-0" />

      {/* Navigation */}
      {!isLoading && <Navigation />}

      {/* HUD Messages */}
      {!isLoading && <HUDMessages />}

      {/* Scroll Indicators */}
      {!isLoading && <ScrollIndicators />}

      {/* Year Indicator */}
      {!isLoading && <YearIndicator />}

      {/* Control Panel */}
      {!isLoading && <ControlPanel />}

      {/* Achievement Notifications */}
      {!isLoading && <AchievementNotification />}

      {/* Main Content */}
      {!isLoading && (
        <main>
          <HeroSection />
          <OriginSection />
          <PresentSection />
          <DimensionsSection />
          <FutureSection />
          <PortalSection />
        </main>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ChronosProvider>
      <MainContent />
    </ChronosProvider>
  );
};

export default App;
