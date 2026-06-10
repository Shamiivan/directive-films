import { motion } from "framer-motion";
import SectionEyebrow from "../../SectionEyebrow";
import { scrollReveal } from "../../../utils/animations";
import styles from "./offer.module.css";

const metrics = [
  {
    value: "430+",
    label: "Businesses served",
    detail: "B2B and B2C, every industry",
  },
  {
    value: "$100M+",
    label: "Revenue generated for clients",
    detail: "Tracked, not guessed",
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
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="The numbers" />
          <h2 className={styles.title}>
            We don't get paid for footage.
            <br />
            We get paid for results.
          </h2>
          <p className={styles.subtitle}>
            Pretty videos are easy. Ten years in, what we're actually measured on is the money that
            lands in your account — so that's what we build for.
          </p>
        </motion.div>

        <div className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <article className={styles.metricCard} key={metric.label}>
              <strong className={styles.metricValue}>{metric.value}</strong>
              <h3 className={styles.metricLabel}>{metric.label}</h3>
              <p className={styles.metricDetail}>{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
