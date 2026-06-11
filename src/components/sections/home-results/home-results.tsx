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
                Over a 3.5-year partnership, we acted as TELUS&apos;s external sales
                operation in Quebec — scaling the sales organization from 2 to 75
                agents across in-person, phone, and digital channels.
              </p>
              <p>
                The result: $57.3M in attributable revenue, generated through a
                performance-aligned model focused on customer acquisition and
                operational scale.
              </p>
              <p>
                Executed under a performance-based partnership with fully aligned
                incentives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
