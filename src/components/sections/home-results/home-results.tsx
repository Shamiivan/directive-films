import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/section-header/section-header";
import { scrollReveal, scrollRevealRight } from "@/utils/animations";
import styles from "./home-results.module.css";

// TODO(asset): TELUS case-study image is served from Convex storage; consider
// hosting it locally for resilience.
const CASE_IMAGE =
  "https://festive-hornet-903.convex.cloud/api/storage/5a31066f-664f-4d36-86f7-815cedb26c42";

export default function HomeResultsSection({ id = "results" }: { id?: string } = {}) {
  const { t } = useTranslation("home");
  const paragraphs = t("homeResults.paragraphs", { returnObjects: true }) as string[];

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow={t("homeResults.eyebrow")}
          title={t("homeResults.title")}
        />

        <div className={styles.case}>
          <motion.div className={styles.visual} {...scrollReveal}>
            <img
              className={styles.image}
              src={CASE_IMAGE}
              alt={t("homeResults.imageAlt")}
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div className={styles.content} {...scrollRevealRight}>
            <span className={styles.tag}>{t("homeResults.tag")}</span>
            <h3 className={styles.title}>{t("homeResults.caseTitle")}</h3>
            <div className={styles.body}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
