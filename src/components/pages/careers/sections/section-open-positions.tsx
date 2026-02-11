'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { scrollReveal } from '../../../../utils/animations';
import styles from './section-open-positions.module.css';

export default function OpenPositionsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const positions = [
    {
      title: 'Video Editor',
      type: 'Full-time',
      description: 'Transform raw footage into compelling sales-driven video content that converts viewers into customers.',
      responsibilities: [
        'Edit video content for multiple platforms and use cases',
        'Work with creative team to maintain brand consistency',
        'Optimize videos for conversion and engagement metrics',
        'Collaborate with strategists to align edits with sales objectives',
        'Manage multiple projects with tight deadlines',
      ],
      requirements: [
        '3+ years of professional video editing experience',
        'Expert in Adobe Premiere Pro, After Effects, or DaVinci Resolve',
        'Strong understanding of pacing, storytelling, and visual composition',
        'Portfolio demonstrating commercial/marketing video work',
        'Ability to work independently and take creative direction',
      ],
    },
    {
      title: 'Videographer/Camera Operator',
      type: 'Full-time',
      description: 'Capture high-quality footage that tells our clients\' stories and drives their business growth.',
      responsibilities: [
        'Plan and execute video shoots for various clients and industries',
        'Operate professional camera equipment, lighting, and audio gear',
        'Work with directors and producers to achieve creative vision',
        'Scout locations and plan shot lists',
        'Ensure technical quality and visual consistency across projects',
      ],
      requirements: [
        '3+ years of professional videography experience',
        'Proficient with cinema cameras (RED, ARRI, Sony FX, etc.)',
        'Strong knowledge of lighting, composition, and cinematography',
        'Experience shooting interviews, B-roll, and commercial content',
        'Reliable, punctual, and professional on set',
      ],
    },
    {
      title: 'Creative Director',
      type: 'Full-time',
      description: 'Lead creative vision and strategy, ensuring every video aligns with client goals and drives measurable results.',
      responsibilities: [
        'Oversee creative direction for all video projects',
        'Collaborate with strategy team to translate business goals into creative concepts',
        'Lead brainstorming sessions and pitch creative ideas to clients',
        'Mentor and guide creative team members',
        'Ensure brand consistency and quality across all deliverables',
      ],
      requirements: [
        '5+ years in creative leadership role',
        'Proven track record of creating conversion-driven video content',
        'Strong understanding of sales psychology and marketing fundamentals',
        'Excellent presentation and client communication skills',
        'Portfolio showcasing strategic creative work',
      ],
    },
    {
      title: 'Content Strategist',
      type: 'Full-time',
      description: 'Map out video strategies that plug revenue leaks and turn prospects into paying customers.',
      responsibilities: [
        'Analyze client sales processes to identify content opportunities',
        'Develop strategic video roadmaps aligned with business objectives',
        'Create content briefs and messaging frameworks',
        'Track video performance and optimize based on conversion data',
        'Collaborate with creative and production teams on execution',
      ],
      requirements: [
        '3+ years in content strategy, marketing, or sales enablement',
        'Deep understanding of sales funnels and customer journeys',
        'Experience with video marketing and content performance analytics',
        'Strong strategic thinking and problem-solving skills',
        'Excellent written and verbal communication',
      ],
    },
    {
      title: 'Account Manager',
      type: 'Full-time',
      description: 'Be the trusted partner for our clients, ensuring smooth project execution and exceptional results.',
      responsibilities: [
        'Serve as primary point of contact for assigned client accounts',
        'Manage project timelines, budgets, and deliverables',
        'Coordinate between clients and internal production teams',
        'Identify opportunities for account growth and upsells',
        'Ensure client satisfaction and retention',
      ],
      requirements: [
        '2+ years in account management or client services',
        'Experience in creative/video production industry preferred',
        'Excellent organizational and project management skills',
        'Strong relationship-building and communication abilities',
        'Comfortable managing multiple clients and projects simultaneously',
      ],
    },
  ];

  const togglePosition = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const formSection = document.querySelector('form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className={styles.openPositionsSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...scrollReveal}>
          <h2 className={styles.title}>Positions</h2>
        </motion.div>

        {/* Positions Accordion */}
        <motion.div
          className={styles.positionsList}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
        >
          {positions.map((position, index) => (
            <motion.div
              key={index}
              className={styles.positionItem}
              variants={scrollReveal}
            >
              <button
                className={styles.positionHeader}
                onClick={() => togglePosition(index)}
                aria-expanded={expandedIndex === index}
              >
                <span className={styles.positionTitle}>{position.title}</span>
                <motion.div
                  className={styles.toggleIcon}
                  animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus size={20} strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    className={styles.positionContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className={styles.contentInner}>
                      <div className={styles.positionMeta}>
                        <span className={styles.positionType}>{position.type}</span>
                      </div>

                      <p className={styles.positionDescription}>{position.description}</p>

                      <div className={styles.positionDetails}>
                        <div className={styles.detailSection}>
                          <h4 className={styles.detailTitle}>Key Responsibilities</h4>
                          <ul className={styles.detailList}>
                            {position.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.detailSection}>
                          <h4 className={styles.detailTitle}>Requirements</h4>
                          <ul className={styles.detailList}>
                            {position.requirements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <motion.button
                        className={styles.applyButton}
                        onClick={scrollToForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
