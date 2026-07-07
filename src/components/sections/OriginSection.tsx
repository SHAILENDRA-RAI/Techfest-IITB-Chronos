import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Modal from '../ui/Modal';
import { useChronos } from '../../context/ChronosContext';
import { Cpu, Globe, Code, Database } from 'lucide-react';

interface OriginCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDesc: string;
  fullDescription: string;
  details: string[];
  year: number;
}

const originCards: OriginCard[] = [
  {
    id: 'early-tech',
    title: 'Early Technology',
    icon: <Cpu className="w-8 h-8" />,
    shortDesc: 'The dawn of computing at IIT Bombay',
    fullDescription: 'In 1998, a group of visionary students at IIT Bombay laid the foundation for what would become India\'s premier technology festival.',
    details: [
      'First computer labs established',
      'Early programming competitions',
      'Hardware exhibitions began',
      'Student innovation culture emerged',
    ],
    year: 1998,
  },
  {
    id: 'internet-revolution',
    title: 'Internet Revolution',
    icon: <Globe className="w-8 h-8" />,
    shortDesc: 'Connecting minds across the digital frontier',
    fullDescription: 'The internet transformed how students learned and innovated, opening doors to global collaboration.',
    details: [
      'Campus-wide internet access',
      'Online competition registrations',
      'Virtual exhibitions launched',
      'Global tech community formed',
    ],
    year: 2001,
  },
  {
    id: 'engineering-culture',
    title: 'Engineering Culture',
    icon: <Code className="w-8 h-8" />,
    shortDesc: 'Building the future through innovation',
    fullDescription: 'Techfest became the crucible where engineering excellence met creative problem-solving.',
    details: [
      'National competitions established',
      'Industry partnerships formed',
      'Workshop series launched',
      'Innovation labs created',
    ],
    year: 2005,
  },
  {
    id: 'data-revolution',
    title: 'Data Revolution',
    icon: <Database className="w-8 h-8" />,
    shortDesc: 'The era of big data and analytics',
    fullDescription: 'As data became the new oil, Techfest positioned itself at the forefront of data science education.',
    details: [
      'AI/ML workshops introduced',
      'Data hackathons launched',
      'Analytics competitions',
      'Industry mentorship programs',
    ],
    year: 2015,
  },
];

const OriginSection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<OriginCard | null>(null);
  const { unlockAchievement, playSound } = useChronos();
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleCardClick = (card: OriginCard) => {
    playSound('click');
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    playSound('click');
    setSelectedCard(null);
  };

  useEffect(() => {
    if (isInView) {
      unlockAchievement('origin');
    }
  }, [isInView, unlockAchievement]);

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-space" />
      <div className="absolute inset-0 gradient-grid opacity-20" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-electric-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      {/* Floating Code Blocks */}
      <motion.div
        className="absolute top-20 right-20 font-mono text-xs text-electric-cyan/20"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <pre>{`function innovate() {
  return future;
}`}</pre>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block font-display text-sm text-electric-cyan uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The Beginning
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Origin Era</span>
            <span className="text-electric-cyan ml-4">1998</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Where innovation took its first breath. The birth of a technological revolution at IIT Bombay.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {originCards.map((card, index) => (
            <motion.button
              key={card.id}
              className="glass-card rounded-2xl p-6 sm:p-8 text-left group relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick(card)}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-neon-purple/10" />
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-electric-cyan mb-6 group-hover:bg-electric-cyan/20 transition-colors">
                  {card.icon}
                </div>

                {/* Year Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-display bg-electric-cyan/10 text-electric-cyan mb-4">
                  {card.year}
                </span>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-electric-cyan transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-white/60">{card.shortDesc}</p>

                {/* Click Indicator */}
                <div className="mt-4 text-sm text-electric-cyan/50 group-hover:text-electric-cyan transition-colors">
                  Click to explore →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedCard}
        onClose={handleCloseModal}
        title={selectedCard?.title || ''}
      >
        {selectedCard && (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-electric-cyan">
                {selectedCard.icon}
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-display bg-electric-cyan/10 text-electric-cyan">
                {selectedCard.year}
              </span>
            </div>

            <p className="text-white/80 text-lg mb-6">
              {selectedCard.fullDescription}
            </p>

            <div className="border-t border-white/10 pt-6">
              <h4 className="font-display text-sm uppercase tracking-wider text-white/40 mb-4">
                Key Milestones
              </h4>
              <ul className="space-y-3">
                {selectedCard.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center space-x-3 text-white/70"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-electric-cyan" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default OriginSection;
