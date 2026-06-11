import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/section-header/section-header";
import { scrollReveal, scrollRevealRight } from "@/utils/animations";
import styles from "./home-results.module.css";

// TODO(asset): TELUS case-study image is served from Convex storage; consider
// hosting it locally for resilience.
const CASE_IMAGE =
  "https://festive-hornet-903.convex.cloud/api/storage/5a31066f-664f-4d36-86f7-815cedb26c42";

export default function HomeResultsSection({ id = "results" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow="Case study"
          title="What this looks like in practice."
        />

        <div className={styles.case}>
          <motion.div className={styles.visual} {...scrollReveal}>
            <img
              className={styles.image}
              src={CASE_IMAGE}
              alt="TELUS sales growth over the partnership"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div className={styles.content} {...scrollRevealRight}>
            <span className={styles.tag}>TELUS</span>
            <h3 className={styles.title}>$57.3M Generated for TELUS in 3.5 Years</h3>
            <div className={styles.body}>
              <p>
                For TELUS Quebec, the mandate was not activity. It was results.
              </p>
              <p>
                Over 3.5 years, we helped scale a 2-person operation into a 75-agent
                acquisition engine across in-person, phone, and digital channels.
              </p>
              <p>
                That system generated $57.3M in attributable revenue, delivered
                through a performance-based partnership where incentives were tied
                directly to outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
