import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Modal from '../ui/Modal';
import { useChronos } from '../../context/ChronosContext';
import { Brain, Bot, Rocket, Atom, Shield, Dna } from 'lucide-react';

interface Dimension {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  details: string[];
  innovations: string[];
  impact: string;
  year: number;
}

const dimensions: Dimension[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: <Brain className="w-10 h-10" />,
    color: 'text-electric-cyan',
    bgColor: 'bg-electric-cyan',
    description: 'Machines that think, learn, and evolve. AI is reshaping every aspect of human civilization.',
    innovations: ['Neural Networks', 'Deep Learning', 'Computer Vision', 'Natural Language'],
    details: [
      'AI systems achieving human-level performance',
      'Autonomous decision-making algorithms',
      'Real-time pattern recognition at scale',
      'Ethical AI frameworks development',
    ],
    impact: 'Revolutionizing healthcare, finance, transportation, and daily life.',
    year: 2026,
  },
  {
    id: 'robotics',
    title: 'Robotics',
    icon: <Bot className="w-10 h-10" />,
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple',
    description: 'Mechanical minds and bionic bodies. Creating the next generation of human augmentation.',
    innovations: ['Humanoids', 'Soft Robotics', 'Swarm Bots', 'Exoskeletons'],
    details: [
      'Human-robot collaboration in manufacturing',
      'Surgical precision robotics',
      'Autonomous exploration systems',
      'Emotional intelligence in robots',
    ],
    impact: 'Transforming industries from medicine to space exploration.',
    year: 2028,
  },
  {
    id: 'space',
    title: 'Space Technology',
    icon: <Rocket className="w-10 h-10" />,
    color: 'text-electric-cyan',
    bgColor: 'bg-electric-cyan',
    description: 'Reaching for the stars. Making interplanetary travel a reality for humanity.',
    innovations: ['Space Elevators', 'Mars Colonies', 'Orbital Hotels', 'Launch Systems'],
    details: [
      'Reusable rocket technology',
      'In-situ resource utilization',
      'Space manufacturing facilities',
      'Interplanetary communication networks',
    ],
    impact: 'Opening the final frontier for human civilization.',
    year: 2035,
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    icon: <Atom className="w-10 h-10" />,
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple',
    description: 'Computing beyond classical limits. Harnessing quantum mechanics for infinite possibilities.',
    innovations: ['Qubits', 'Quantum Internet', 'Cryptography', 'Simulation'],
    details: [
      'Quantum supremacy achieved',
      'Error-corrected qubits',
      'Quantum machine learning',
      'Quantum-secure communications',
    ],
    impact: 'Solving previously impossible computational problems.',
    year: 2030,
  },
  {
    id: 'cyber',
    title: 'Cyber Security',
    icon: <Shield className="w-10 h-10" />,
    color: 'text-electric-cyan',
    bgColor: 'bg-electric-cyan',
    description: 'Protecting the digital realm. Building impenetrable fortresses in the age of cyber warfare.',
    innovations: ['Zero Trust', 'AI Defense', 'Blockchains', 'Biometrics'],
    details: [
      'AI-powered threat detection',
      'Decentralized security architectures',
      'Post-quantum cryptography',
      'Autonomous incident response',
    ],
    impact: 'Securing critical infrastructure and personal data worldwide.',
    year: 2025,
  },
  {
    id: 'bio',
    title: 'Biotechnology',
    icon: <Dna className="w-10 h-10" />,
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple',
    description: 'Engineering life itself. Editing the code of existence for a healthier humanity.',
    innovations: ['CRISPR', 'Lab Meat', 'Gene Therapy', 'Bio-printing'],
    details: [
      'Genetic disease eradication',
      'Personalized medicine',
      'Synthetic biology applications',
      'Organ regeneration technology',
    ],
    impact: 'Revolutionizing healthcare and extending human lifespan.',
    year: 2032,
  },
];

const DimensionsSection: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { unlockAchievement, playSound } = useChronos();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleDimensionClick = (dimension: Dimension) => {
    playSound('click');
    setSelectedDimension(dimension);
  };

  const handleCloseModal = () => {
    playSound('click');
    setSelectedDimension(null);
  };

  useEffect(() => {
    if (isInView) {
      unlockAchievement('dimensions');
    }
  }, [isInView, unlockAchievement]);

  useEffect(() => {
    if (selectedDimension) {
      unlockAchievement(selectedDimension.id);
    }
  }, [selectedDimension, unlockAchievement]);

  return (
    <section
      id="dimensions"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-space" />
      <div className="absolute inset-0 gradient-grid opacity-10" />

      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-electric-cyan/5 to-transparent"
              style={{ left: `${i * 5}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-display text-sm text-electric-cyan uppercase tracking-[0.3em] mb-4">
            Explore The Universe
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Innovation</span>
            <span className="text-electric-cyan ml-4">Dimensions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Navigate through the frontiers of human innovation. Each dimension opens a portal to the future.
          </p>
        </motion.div>

        {/* Dimensions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dimensions.map((dimension, index) => (
            <motion.button
              key={dimension.id}
              className={`relative glass-card rounded-2xl p-6 sm:p-8 text-left group overflow-hidden ${
                hoveredId && hoveredId !== dimension.id ? 'opacity-50' : ''
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onMouseEnter={() => setHoveredId(dimension.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleDimensionClick(dimension)}
            >
              {/* Animated Border */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(90deg, var(--electric-cyan), var(--neon-purple))`,
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                }}
              />

              {/* Glow Effect */}
              <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity ${dimension.bgColor}`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl glass flex items-center justify-center ${dimension.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {dimension.icon}
                </div>

                {/* Year Badge */}
                <span className={`inline-block px-3 py-1 rounded text-xs font-display ${dimension.color} ${dimension.bgColor}/10 mb-4`}>
                  {dimension.year}
                </span>

                {/* Title */}
                <h3 className={`font-display text-xl font-bold text-white mb-2 group-hover:${dimension.color} transition-colors`}>
                  {dimension.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm mb-6 line-clamp-2">
                  {dimension.description}
                </p>

                {/* Innovations */}
                <div className="flex flex-wrap gap-2">
                  {dimension.innovations.slice(0, 3).map((innov, i) => (
                    <span key={i} className={`px-2 py-1 rounded text-xs ${dimension.bgColor}/10 ${dimension.color}`}>
                      {innov}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dimension Modal */}
      <Modal
        isOpen={!!selectedDimension}
        onClose={handleCloseModal}
        title={selectedDimension?.title}
      >
        {selectedDimension && (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-14 h-14 rounded-xl glass flex items-center justify-center ${selectedDimension.color}`}>
                {selectedDimension.icon}
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-display ${selectedDimension.bgColor}/10 ${selectedDimension.color}`}>
                  {selectedDimension.year}
                </span>
              </div>
            </div>

            <p className="text-white/80 text-lg mb-8">
              {selectedDimension.description}
            </p>

            <div className="glass rounded-lg p-4 mb-8">
              <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-2">
                Impact
              </h4>
              <p className={`text-${selectedDimension.color.replace('text-', '')}`}>{selectedDimension.impact}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
                  Innovations
                </h4>
                <div className="space-y-2">
                  {selectedDimension.innovations.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-2 text-white/70 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedDimension.bgColor}`} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
                  Details
                </h4>
                <div className="space-y-2">
                  {selectedDimension.details.slice(0, 4).map((item, i) => (
                    <motion.div
                      key={i}
                      className="text-white/70 text-sm"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      • {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default DimensionsSection;
