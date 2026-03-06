import { motion } from 'framer-motion';
import { scrollReveal } from '@/utils/animations';
import { services } from '../services-data';
import styles from './section-service-map.module.css';

export default function ServiceMapSection() {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div className={styles.header} {...scrollReveal}>
          <span className={styles.label}>The System</span>
          <h2 className={styles.title}>
            Five services.{' '}
            <em className={styles.titleAccent}>One growth engine.</em>
          </h2>
        </motion.div>

        <div className={styles.strip}>
          <div className={styles.stripLine} />
          {services.map((service, i) => (
            <motion.button
              key={service.id}
              className={styles.card}
              onClick={() => handleClick(service.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className={styles.cardNumber}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.cardDot} />
              <h3 className={styles.cardTitle}>{service.eyebrow}</h3>
              <p className={styles.cardDesc}>{service.subtitle}</p>
              <span className={styles.cardArrow}>&darr;</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
