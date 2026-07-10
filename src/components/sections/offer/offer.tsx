import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/section-header/section-header";
import { gridStagger, scrollRevealDepth } from "@/utils/animations";
import styles from "./offer.module.css";

interface Metric {
  value: string;
  label: string;
  detail: string;
}

export default function OfferSection({ id = "offer" }: { id?: string } = {}) {
  const { t } = useTranslation("home");
  const featured = t("homeOffer.featured", { returnObjects: true }) as Metric;
  const metrics = t("homeOffer.metrics", { returnObjects: true }) as Metric[];

  return (
    <section className={styles.offerSection} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow={t("homeOffer.eyebrow")}
          title={
            <>
              {t("homeOffer.titleLine1")}
              <br />
              {t("homeOffer.titleLine2")}
            </>
          }
          intro={t("homeOffer.intro")}
        />

        <motion.div className={styles.proof} {...gridStagger}>
          <motion.article
            className={styles.featured}
            {...scrollRevealDepth(0)}
          >
            <strong className={styles.featuredValue}>{featured.value}</strong>
            <h3 className={styles.featuredLabel}>{featured.label}</h3>
            <p className={styles.featuredDetail}>{featured.detail}</p>
          </motion.article>

          <div className={styles.supporting}>
            {metrics.map((metric, index) => (
              <motion.article
                className={styles.metricCard}
                key={metric.label}
                {...scrollRevealDepth(index + 1)}
              >
                <strong className={styles.metricValue}>{metric.value}</strong>
                <div className={styles.metricText}>
                  <h3 className={styles.metricLabel}>{metric.label}</h3>
                  <p className={styles.metricDetail}>{metric.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
