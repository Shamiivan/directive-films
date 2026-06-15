import { useTranslation } from "react-i18next";
import Reveal from "@/components/shared/reveal/reveal";
import CtaButton from "@/components/shared/cta-button/cta-button";
import styles from "./home-faq.module.css";

type FaqItem = { q: string; a: string };

export default function HomeFaqSection({ id = "faq" }: { id?: string } = {}) {
  const { t } = useTranslation("home");
  const faqs = t("homeFaq.items", { returnObjects: true }) as FaqItem[];

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <div className={styles.aside}>
          <h2 className={styles.heading}>{t("homeFaq.heading")}</h2>
          <span className={styles.accent} aria-hidden="true" />
          <p className={styles.lead}>{t("homeFaq.lead")}</p>
          <CtaButton to="/audit">{t("ctaFreeAudit", { ns: "common" })}</CtaButton>
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
