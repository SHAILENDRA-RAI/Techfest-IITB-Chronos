import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Torus, Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { useChronos } from '../../context/ChronosContext';

const Portal3D: React.FC<{ activated: boolean; activationPhase: number }> = ({ activated, activationPhase }) => {
  const portalRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += activated ? 0.02 : 0.005;

      if (activated) {
        const targetScale = 1 + activationPhase * 0.5;
        portalRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

        // Gradually zoom camera out for dramatic effect
        if (camera.position.z < 12 && activationPhase > 0.5) {
          camera.position.z += 0.03;
        }
      }
    }
    if (particlesRef.current) {
      const speedMult = activated ? 5 : 1;
      particlesRef.current.rotation.y += 0.001 * speedMult;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3 + Math.random() * 8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const emissiveIntensity = activated ? 1.5 + activationPhase : 0.5;

  return (
    <>
      {/* Portal Group */}
      <group ref={portalRef}>
        {/* Outer ring */}
        <Torus args={[2.5, 0.1, 16, 100]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={emissiveIntensity}
          />
        </Torus>

        {/* Inner ring */}
        <Torus args={[2, 0.08, 16, 100]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={emissiveIntensity}
          />
        </Torus>

        {/* Third ring - added for activation */}
        {activated && (
          <Torus args={[3, 0.05, 16, 100]} rotation={[0, 0, Math.PI / 3]}>
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={emissiveIntensity * 0.8}
            />
          </Torus>
        )}

        {/* Core */}
        <Sphere args={[activated ? 0.5 + activationPhase * 0.3 : 0.5, 32, 32]}>
          <meshStandardMaterial
            color={activated ? '#00f0ff' : '#a855f7'}
            emissive={activated ? '#00f0ff' : '#a855f7'}
            emissiveIntensity={emissiveIntensity}
          />
        </Sphere>

        {/* Energy rings */}
        {[0, 1, 2, ...(activated ? [3] : [])].map((i) => (
          <Ring
            key={i}
            args={[1.5 + i * 0.35, 1.55 + i * 0.35, 64]}
            rotation={[Math.PI / 2, 0, i * 0.4]}
          >
            <meshBasicMaterial
              color={i % 2 === 0 ? '#00f0ff' : '#a855f7'}
              transparent
              opacity={0.4 - i * 0.08}
              side={THREE.DoubleSide}
            />
          </Ring>
        ))}
      </group>

      {/* Accelerated particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={activated ? 0.05 : 0.03}
          color="#00f0ff"
          transparent
          opacity={activated ? 0.8 : 0.6}
          sizeAttenuation
        />
      </points>

      {/* Lights */}
      <ambientLight intensity={activated ? 0.4 : 0.2} />
      <pointLight position={[0, 0, 0]} intensity={activated ? 5 : 1.5} color="#00f0ff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
      {activated && <pointLight position={[-5, -5, 5]} intensity={2} color="#00ff88" />}
    </>
  );
};

// Energy wave overlay component
const EnergyWave: React.FC<{ phase: number }> = ({ phase }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: phase * 0.3 }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at center, rgba(0, 240, 255, ${phase * 0.3}) 0%, transparent 70%)`,
      }}
    />
    {phase > 0.5 && (
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at center, rgba(0, 240, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    )}
  </motion.div>
);

const PortalSection: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activationPhase, setActivationPhase] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const { unlockAchievement, portalActivated, setPortalActivated, playSound, addHUDMessage } = useChronos();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleActivate = () => {
    playSound('click');
    setPortalActivated(true);
    addHUDMessage('Portal energy charging...', 'info');

    // Play portal sound
    setTimeout(() => playSound('portal'), 100);

    // Phase progression
    let phase = 0;
    const phaseInterval = setInterval(() => {
      phase += 0.1;
      setActivationPhase(Math.min(phase, 1));

      if (phase >= 0.5 && phase < 0.6) {
        addHUDMessage('Energy threshold reached', 'success');
      }
      if (phase >= 1) {
        clearInterval(phaseInterval);
        addHUDMessage('Portal fully activated!', 'success');
        setShowFlash(true);
        setTimeout(() => {
          setShowFlash(false);
          setShowSuccess(true);
          unlockAchievement('future');
        }, 500);
      }
    }, 150);
  };

  const handleRestart = () => {
    playSound('click');
    setPortalActivated(false);
    setShowSuccess(false);
    setActivationPhase(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addHUDMessage('Timeline reset initiated', 'system');
  };

  return (
    <section
      id="portal"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-space" />

      {/* Energy wave overlay when activated */}
      {portalActivated && <EnergyWave phase={activationPhase} />}

      {/* Flash overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="fixed inset-0 z-50 bg-electric-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* 3D Portal */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Portal3D activated={portalActivated} activationPhase={activationPhase} />
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-space/50 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.h2
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  {portalActivated ? (
                    <motion.span
                      key="activating"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="block"
                    >
                      <span className="text-electric-cyan text-glow-cyan">PORTAL ACTIVATING...</span>
                      <motion.div
                        className="mt-4 text-sm text-white/50"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {Math.round(activationPhase * 100)}%
                      </motion.div>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="quote"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="block"
                    >
                      "The Future Was Always Being Built"
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.h2>

              {!portalActivated && (
                <motion.button
                  className="btn-primary text-white relative overflow-hidden group"
                  onClick={handleActivate}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="relative z-10 font-display text-sm uppercase tracking-widest">
                    Activate Future
                  </span>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-neon-purple opacity-0 group-hover:opacity-30 transition-opacity"
                  />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              {/* Success Badge */}
              <motion.div
                className="w-28 h-28 mx-auto mb-8 rounded-full glass border-2 border-electric-cyan flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(0, 240, 255, 0.3)',
                    '0 0 60px rgba(0, 240, 255, 0.5)',
                    '0 0 30px rgba(0, 240, 255, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="text-5xl text-electric-cyan"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  ✓
                </motion.span>
              </motion.div>

              <motion.h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-electric-cyan mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                MISSION COMPLETE
              </motion.h2>

              <motion.p
                className="text-white/70 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                You travelled through decades of innovation.
              </motion.p>

              <motion.p
                className="text-neon-purple text-xl font-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Welcome to the future of Techfest.
              </motion.p>

              {/* Techfest branding */}
              <motion.div
                className="mt-8 flex items-center justify-center space-x-4 text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <div className="h-px w-12 bg-white/20" />
                <span className="font-display text-sm uppercase tracking-widest">
                  30 Years of Innovation
                </span>
                <div className="h-px w-12 bg-white/20" />
              </motion.div>

              <motion.p
                className="mt-2 text-white/30 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Techfest IIT Bombay
              </motion.p>

              {/* Restart Button */}
              <motion.button
                className="mt-8 btn-secondary text-white"
                onClick={handleRestart}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-display text-sm uppercase tracking-widest">
                  Restart Journey
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortalSection;
