import styles from './section-testimonials.module.css';

const testimonials = [
  {
    quote: '"They brought our business to the next level. The system pays for itself every month."',
    name: 'Mehdi A.',
    role: 'Founder, Services Co.',
    initials: 'MA',
  },
  {
    quote: '"Best content we\'ve ever had — and the sales team actually closes the leads it brings in."',
    name: 'Shawn S.',
    role: 'CEO, Retail Brand',
    initials: 'SS',
  },
  {
    quote: '"Clear, professional, and the AI automations saved us 20+ hours a week instantly."',
    name: 'Marie-Eve T.',
    role: 'Director, B2B SaaS',
    initials: 'MT',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>What clients say</span>
        <h2 className={styles.heading}>Don't take our word for it.</h2>

        <div className={styles.quotes}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.quote}>
              <div className={styles.stars}>★★★★★</div>
              <p>{t.quote}</p>
              <div className={styles.who}>
                <div className={styles.av}>{t.initials}</div>
                <div>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
