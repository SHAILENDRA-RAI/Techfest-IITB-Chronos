import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Modal from '../ui/Modal';
import { useChronos } from '../../context/ChronosContext';
import { Building2, Car, User, Network, Rocket, Zap } from 'lucide-react';

interface Building {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

const buildings: Building[] = [
  {
    id: 'ai-tower',
    title: 'AI Control Tower',
    icon: <Building2 className="w-8 h-8" />,
    description: 'The neural center of the smart city. AI systems manage everything from traffic to energy distribution.',
    features: ['Neural Networks', 'Real-time Analytics', 'Autonomous Systems', 'Predictive AI'],
    stats: [
      { label: 'Processing Power', value: '10 ZettaFLOPS' },
      { label: 'Response Time', value: '< 1ms' },
    ],
  },
  {
    id: 'sky-transit',
    title: 'Sky Transit Hub',
    icon: <Car className="w-8 h-8" />,
    description: 'Flying vehicles and autonomous pods redefine urban transportation in 2050.',
    features: ['Electric VTOLs', 'Hyperloop', 'Drone Delivery', 'Smart Roads'],
    stats: [
      { label: 'Daily Passengers', value: '5 Million' },
      { label: 'Zero Emissions', value: '100%' },
    ],
  },
  {
    id: 'digital-life',
    title: 'Digital Life Center',
    icon: <User className="w-8 h-8" />,
    description: 'Where biological and digital humanity merge. Neural interfaces and digital consciousness.',
    features: ['Neural Links', 'VR Metaverse', 'Digital Twins', 'Brain Upload'],
    stats: [
      { label: 'Connected Minds', value: '2 Billion' },
      { label: 'VR Users Daily', value: '8 Hours' },
    ],
  },
  {
    id: 'quantum-grid',
    title: 'Quantum Grid',
    icon: <Network className="w-8 h-8" />,
    description: 'Global quantum-secured network enabling instant communication and computation.',
    features: ['Quantum Internet', 'Secure Comms', 'Instant Transfer', 'Cloud Computing'],
    stats: [
      { label: 'Latency', value: '0ms' },
      { label: 'Security Level', value: 'Unbreakable' },
    ],
  },
  {
    id: 'space-port',
    title: 'Space Elevator Port',
    icon: <Rocket className="w-8 h-8" />,
    description: 'Gateway to the stars. Carbon nanotube elevators make space travel routine.',
    features: ['Orbital Hotels', 'Mars Cruises', 'Asteroid Mining', 'Lunar Base'],
    stats: [
      { label: 'Daily Launches', value: '100+' },
      { label: 'Cost per KG', value: '$10' },
    ],
  },
  {
    id: 'fusion-core',
    title: 'Fusion Reactor Core',
    icon: <Zap className="w-8 h-8" />,
    description: 'Unlimited clean energy from nuclear fusion. Powering the entire city sustainably.',
    features: ['Clean Energy', 'Hydrogen Fuel', 'Zero Waste', 'Grid Stabilization'],
    stats: [
      { label: 'Output', value: '100 GW' },
      { label: 'Efficiency', value: '99.9%' },
    ],
  },
];

const FutureSection: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const { unlockAchievement, playSound } = useChronos();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleBuildingClick = (building: Building) => {
    playSound('click');
    setSelectedBuilding(building);
  };

  const handleCloseModal = () => {
    playSound('click');
    setSelectedBuilding(null);
  };

  useEffect(() => {
    if (isInView) {
      unlockAchievement('future');
    }
  }, [isInView, unlockAchievement]);

  return (
    <section
      id="future"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-space" />

      {/* Futuristic City Skyline SVG Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="cityGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 30 }).map((_, i) => {
            const x = i * 50;
            const height = 50 + Math.random() * 200;
            return (
              <motion.rect
                key={i}
                x={x}
                y={400 - height}
                width="40"
                height={height}
                fill="url(#cityGradient)"
                initial={{ opacity: 0, y: 400 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Stars/Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Moving Light Beams */}
      <motion.div
        className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-purple/30 to-transparent"
        animate={{ opacity: [0, 0.5, 0], x: ['-100%', '200%'] }}
        transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.div
        className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-electric-cyan/30 to-transparent"
        animate={{ opacity: [0, 0.5, 0], x: ['100%', '-200%'] }}
        transition={{ duration: 7, repeat: Infinity, repeatDelay: 5 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-display text-sm text-neon-purple uppercase tracking-[0.3em] mb-4">
            What Awaits
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Future Era</span>
            <span className="text-neon-purple ml-4">2050</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A glimpse into the world of tomorrow. Smart cities, autonomous systems, and human-AI collaboration.
          </p>
        </motion.div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building, index) => (
            <motion.button
              key={building.id}
              className="glass-card rounded-2xl p-6 text-left group relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleBuildingClick(building)}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-neon-purple/10" />
              </div>

              <div className="relative z-10">
                {/* Animated Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl glass flex items-center justify-center text-neon-purple mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  {building.icon}
                </motion.div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                  {building.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm line-clamp-2">
                  {building.description}
                </p>

                {/* Stats */}
                <div className="mt-4 flex gap-4">
                  {building.stats.map((stat, i) => (
                    <div key={i} className="text-xs">
                      <span className="text-neon-purple font-bold">{stat.value}</span>
                      <span className="text-white/30 ml-1">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Building Modal */}
      <Modal
        isOpen={!!selectedBuilding}
        onClose={handleCloseModal}
        title={selectedBuilding?.title}
      >
        {selectedBuilding && (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-neon-purple">
                {selectedBuilding.icon}
              </div>
            </div>

            <p className="text-white/80 mb-8">{selectedBuilding.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {selectedBuilding.stats.map((stat, i) => (
                <div key={i} className="glass rounded-lg p-4">
                  <div className="font-display text-xl font-bold text-neon-purple">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
              Features
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {selectedBuilding.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-lg p-3 flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-neon-purple" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default FutureSection;
