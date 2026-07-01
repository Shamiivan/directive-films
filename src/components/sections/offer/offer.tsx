import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/section-header/section-header";
import { gridStagger, scrollRevealDepth } from "@/utils/animations";
import styles from "./offer.module.css";

const featured = {
  value: "$100M+",
  label: "Revenue generated for clients",
  detail: "Tracked, not guessed",
};

const metrics = [
  {
    value: "430+",
    label: "Businesses served",
    detail: "B2B and B2C, every industry",
  },
  {
    value: "10 yrs",
    label: "Doing only this",
    detail: "A decade, compounded",
  },
  {
    value: "4.2×",
    label: "Average return on ad spend",
    detail: "Across active campaigns",
  },
];

export default function OfferSection({ id = "offer" }: { id?: string } = {}) {
  return (
    <section className={styles.offerSection} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow="The numbers"
          title={
            <>
              We don&apos;t get paid for footage.
              <br />
              We get paid for results.
            </>
          }
          intro="Pretty videos are easy. Ten years in, what we're actually measured on is the money that lands in your account. That's what we build for."
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
