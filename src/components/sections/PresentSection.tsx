import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import Modal from '../ui/Modal';
import { useChronos } from '../../context/ChronosContext';
import { Cpu, Rocket, Bot, Microscope, Users, Calendar, Award } from 'lucide-react';

interface Zone {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
}

const zones: Zone[] = [
  {
    id: 'competitions',
    title: 'Competitions',
    icon: <Award className="w-8 h-8" />,
    description: 'National and international competitions pushing the boundaries of innovation.',
    features: ['Robotics Challenge', 'Code Wars', 'Drone Racing', 'AI Showdown'],
    stats: [
      { label: 'Prize Pool', value: '₹50L+' },
      { label: 'Participants', value: '50K+' },
    ],
  },
  {
    id: 'workshops',
    title: 'Workshops',
    icon: <Microscope className="w-8 h-8" />,
    description: 'Hands-on learning experiences with industry experts and cutting-edge technology.',
    features: ['AI/ML Bootcamp', 'Blockchain Lab', 'IoT Workshop', 'Cybersecurity'],
    stats: [
      { label: 'Workshops', value: '40+' },
      { label: 'Participants', value: '15K+' },
    ],
  },
  {
    id: 'exhibitions',
    title: 'Exhibitions',
    icon: <Rocket className="w-8 h-8" />,
    description: 'Showcasing groundbreaking innovations from startups and tech giants alike.',
    features: ['Tech Expo', 'Startup Showcase', 'Research Papers', 'Product Launches'],
    stats: [
      { label: 'Exhibitors', value: '100+' },
      { label: 'Visitors', value: '100K+' },
    ],
  },
  {
    id: 'innovation',
    title: 'Innovation Hub',
    icon: <Bot className="w-8 h-8" />,
    description: 'Where ideas become reality. Labs, maker spaces, and collaboration zones.',
    features: ['Maker Spaces', 'Innovation Labs', 'Idea Pitches', 'Mentorship'],
    stats: [
      { label: 'Projects', value: '200+' },
      { label: 'Success Rate', value: '85%' },
    ],
  },
];

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(value * easeOut));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-5xl sm:text-6xl font-black text-electric-cyan">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const PresentSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const { unlockAchievement, playSound } = useChronos();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleZoneClick = (zone: Zone) => {
    playSound('click');
    setSelectedZone(zone);
  };

  const handleCloseModal = () => {
    playSound('click');
    setSelectedZone(null);
  };

  useEffect(() => {
    if (isInView) {
      unlockAchievement('present');
    }
  }, [isInView, unlockAchievement]);

  return (
    <section
      id="present"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-space" />
      <div className="absolute inset-0 gradient-grid opacity-15" />

      {/* Glowing orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl" />

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
            30th Edition
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Present Era</span>
            <span className="text-neon-purple ml-4">2026</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Techfest IIT Bombay - India's premier technology festival celebrating three decades of innovation.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { value: 30, suffix: '+', label: 'Years Innovation' },
            { value: 180, suffix: 'K+', label: 'Visitors' },
            { value: 100, suffix: '+', label: 'Events' },
            { value: 50, suffix: '+', label: 'Countries' },
          ].map((stat, i) => (
            <div key={i} className="text-center glass-card rounded-xl p-6">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="font-display text-xs uppercase tracking-wider text-white/50 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zones.map((zone, index) => (
            <motion.button
              key={zone.id}
              className="glass-card rounded-2xl p-6 sm:p-8 text-left group relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleZoneClick(zone)}
            >
              {/* Gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-electric-cyan/10" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center text-neon-purple group-hover:scale-110 transition-transform">
                    {zone.icon}
                  </div>
                  <div className="flex space-x-2">
                    {zone.stats.map((s, i) => (
                      <div key={i} className="text-right">
                        <div className="font-display font-bold text-white text-sm">{s.value}</div>
                        <div className="text-xs text-white/40">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                  {zone.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{zone.description}</p>

                <div className="flex flex-wrap gap-2">
                  {zone.features.slice(0, 2).map((feature, i) => (
                    <span key={i} className="px-2 py-1 rounded text-xs bg-neon-purple/10 text-neon-purple">
                      {feature}
                    </span>
                  ))}
                  {zone.features.length > 2 && (
                    <span className="px-2 py-1 rounded text-xs bg-white/5 text-white/40">
                      +{zone.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Zone Modal */}
      <Modal
        isOpen={!!selectedZone}
        onClose={handleCloseModal}
        title={selectedZone?.title}
      >
        {selectedZone && (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-neon-purple">
                {selectedZone.icon}
              </div>
            </div>

            <p className="text-white/80 mb-8">{selectedZone.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {selectedZone.stats.map((stat, i) => (
                <div key={i} className="glass rounded-lg p-4 text-center">
                  <div className="font-display text-2xl font-bold text-neon-purple">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
              Features
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {selectedZone.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-lg p-3 flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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

export default PresentSection;
