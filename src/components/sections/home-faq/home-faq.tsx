import Reveal from "@/components/shared/reveal/reveal";
import styles from "./home-faq.module.css";

const faqs = [
  {
    q: "What does it cost?",
    a: "The growth audit is free. After that, most of our work runs on a performance-aligned model — we win when you win. We scope pricing once we know what you actually need.",
  },
  {
    q: "Do I have to commit to anything?",
    a: "No. The audit is no-commitment and you keep the plan either way. If it makes sense to work together we'll talk; if not, you still walk away with a clear read on where you're losing money.",
  },
  {
    q: "How fast do we see results?",
    a: "The audit comes back in days, not weeks. Once we're building, you see pipeline and revenue on real dashboards — not likes and impressions.",
  },
  {
    q: "What's actually in the audit?",
    a: "A straight read on your offer, content and funnel: where leads are leaking, what to fix first, and what it's worth. No fluff, no 40-slide deck.",
  },
  {
    q: "Can we start with just one piece?",
    a: "Yes. Take a single service or hand us the whole machine — audit, video, ads, CRM, AI, and a commission sales team that turns leads into signed deals.",
  },
];

export default function HomeFaqSection({ id = "faq" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <div className={styles.aside}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.heading}>Questions before you book?</h2>
          <span className={styles.accent} aria-hidden="true" />
          <p className={styles.lead}>
            The short answers. The audit covers the rest.
          </p>
          <a className={styles.cta} href="/audit">
            <span>Get your free growth audit</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className={styles.list}>
          {faqs.map((item, i) => (
            <Reveal as="li" className={styles.item} key={item.q} delay={i * 0.05} y={20}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span>{item.q}</span>
                  <span className={styles.marker} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
