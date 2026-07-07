import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = React.useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  // Don't render custom cursor on mobile/touch devices
  if (isMobile) {
    // Add mobile-friendly cursor styling
    return (
      <style>{`
        * { cursor: auto !important; }
        button, a, [role="button"] { cursor: pointer !important; }
      `}</style>
    );
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`w-[10px] h-[10px] rounded-full transition-all duration-150 ${
            isHovering
              ? 'bg-electric-cyan shadow-[0_0_20px_rgba(0,240,255,0.8)]'
              : 'bg-white'
          }`}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 2 : isClicking ? 0.3 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border transition-all duration-150 ${
            isHovering
              ? 'border-electric-cyan/50'
              : 'border-white/30'
          }`}
        />
      </motion.div>

      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="fixed pointer-events-none z-[9998]"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              left: trail.x - 3,
              top: trail.y - 3,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-electric-cyan/50" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-[9997]"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              left: position.x - 25,
              top: position.y - 25,
            }}
          >
            <div className="w-[50px] h-[50px] rounded-full border-2 border-electric-cyan/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event listeners script */}
      <EventListeners
        setPosition={setPosition}
        setIsVisible={setIsVisible}
        setIsHovering={setIsHovering}
        setIsClicking={setIsClicking}
        setTrails={setTrails}
        trailIdRef={trailIdRef}
      />
    </>
  );
};

interface EventListenersProps {
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClicking: React.Dispatch<React.SetStateAction<boolean>>;
  setTrails: React.Dispatch<React.SetStateAction<TrailPoint[]>>;
  trailIdRef: React.MutableRefObject<number>;
}

const EventListeners: React.FC<EventListenersProps> = ({
  setPosition,
  setIsVisible,
  setIsHovering,
  setIsClicking,
  setTrails,
  trailIdRef,
}) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail point
      if (trailIdRef.current % 3 === 0) {
        setTrails(prev => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: Date.now() }]);
      }
      trailIdRef.current++;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [setPosition, setIsVisible, setIsHovering, setIsClicking, setTrails, trailIdRef]);

  return null;
};

export default CustomCursor;
