import styles from './section-why-we-create.module.css';

const values = [
  {
    title: "Money over likes",
    body: "If something doesn’t move your pipeline, we don’t ship it. Every project ties back to a real number.",
  },
  {
    title: "Everything connects",
    body: "Video feeds the ads, the ads feed the CRM, the AI feeds the closers. No piece works alone.",
  },
  {
    title: "Skin in the game",
    body: "Our closers earn base or commission, whichever’s higher — so they’re motivated to actually close, and we win when you win.",
  },
];

export default function WhyWeCreateSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>How we operate</span>
        <h2 className={styles.heading}>What "excellence" means around here.</h2>

        <div className={styles.vals}>
          {values.map((v) => (
            <div key={v.title} className={styles.val}>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
