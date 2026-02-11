'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, BarChart3, Award, Rocket, TrendingUp, CheckCircle } from 'lucide-react';
import MagneticButton from '../../MagneticButton';
import styles from './section-why-us.module.css';

export default function WhyUsSection() {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const reasons = [
    {
      icon: Heart,
      title: 'Partnership Mentality',
      description: 'We don\'t just deliver videos and disappear. We become an extension of your team, invested in your long-term success.',
      stat: '98%',
      label: 'retention rate',
      color: '#ef4444',
      delay: 0
    },
    {
      icon: BarChart3,
      title: 'Proven Track Record',
      description: 'Over 500 successful campaigns, generating $50M+ in revenue for our clients across industries.',
      stat: '$50M+',
      label: 'generated',
      color: '#10b981',
      delay: 0.15
    },
    {
      icon: Award,
      title: 'Creative Excellence',
      description: 'Award-winning creative that stands out in crowded markets. Quality that commands attention and respect.',
      stat: '12',
      label: 'industry awards',
      color: '#FDB714',
      delay: 0.3
    },
    {
      icon: Rocket,
      title: 'Speed to Market',
      description: 'Fast turnarounds without compromising quality. Get to market quickly and start seeing results sooner.',
      stat: '2 weeks',
      label: 'avg turnaround',
      color: '#8b5cf6',
      delay: 0.45
    },
    {
      icon: TrendingUp,
      title: 'Continuous Optimization',
      description: 'We track, test, and refine. Your videos get better over time as we optimize based on real performance data.',
      stat: '40%',
      label: 'avg improvement',
      color: '#3b82f6',
      delay: 0.6
    },
    {
      icon: CheckCircle,
      title: 'No-Nonsense Approach',
      description: 'Straight talk, transparent pricing, and realistic timelines. What we promise is what you get.',
      stat: '5.0',
      label: 'star rated',
      color: '#f59e0b',
      delay: 0.75
    },
  ];

  const testimonials = [
    {
      quote: 'DirectiveFilms transformed our sales process. Our close rate doubled in just 3 months.',
      author: 'Sarah Chen',
      role: 'VP of Sales, TechCorp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
    },
    {
      quote: 'The ROI was immediate. Best marketing investment we\'ve ever made.',
      author: 'Michael Rodriguez',
      role: 'CEO, GrowthLabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      quote: 'They didn\'t just make beautiful videos—they built us a complete growth system.',
      author: 'Emily Watson',
      role: 'CMO, Scale Ventures',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop'
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Split Layout - Sticky Left, Scrolling Right */}
        <div className={styles.splitLayout}>
          {/* Left Side - Sticky Content */}
          <div className={styles.leftSticky} ref={leftContentRef}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className={styles.badge}>Why Choose Us</span>
              <h2 className={styles.title}>
                Why Companies Keep <span className={styles.gold}>Coming Back</span>
              </h2>
              <p className={styles.subtitle}>
                We deliver results, build relationships, and become an indispensable part of your growth engine.
              </p>
              <div className={styles.ctaWrapper}>
                <MagneticButton className={styles.ctaButton}>
                  Start Your Growth Journey
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Scrolling Cards */}
          <div className={styles.rightScrolling}>
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.reasonCard}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-20%", amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: reason.delay,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.iconWrapper}
                        style={{ background: `${reason.color}15` }}
                      >
                        <IconComponent
                          size={32}
                          strokeWidth={1.5}
                          color={reason.color}
                        />
                      </div>
                      <div className={styles.statBox}>
                        <motion.div
                          className={styles.statValue}
                          style={{ color: reason.color }}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: reason.delay + 0.2 }}
                        >
                          {reason.stat}
                        </motion.div>
                        <div className={styles.statLabel}>{reason.label}</div>
                      </div>
                    </div>
                    <h3 className={styles.reasonTitle}>{reason.title}</h3>
                    <p className={styles.reasonDescription}>{reason.description}</p>
                  </div>
                  <motion.div
                    className={styles.cardIndicator}
                    style={{ background: reason.color }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: reason.delay + 0.3 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Testimonials - Grid */}
        <div className={styles.testimonialsSection}>
          <motion.h3
            className={styles.testimonialsTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            What Our Clients Say
          </motion.h3>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={styles.testimonialCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className={styles.authorImage}
                  />
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Stats */}
        <motion.div
          className={styles.finalStats}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {[
            { value: '500+', label: 'Projects Delivered', color: '#3b82f6' },
            { value: '98%', label: 'Client Retention', color: '#10b981' },
            { value: '$50M+', label: 'Revenue Generated', color: '#FDB714' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <div className={styles.statItemValue} style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className={styles.statItemLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
