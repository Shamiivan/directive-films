import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/section-header/section-header";
import { gridStagger, scrollRevealDepth } from "@/utils/animations";
import styles from "./home-how-it-works.module.css";

const steps = [
  {
    number: "01",
    title: "We find the leak",
    description:
      "We go through your content, funnel and sales process and show you exactly where you're losing money. No fluff, no 40-slide deck.",
  },
  {
    number: "02",
    title: "We plug it",
    description:
      "Video, website, CRM, AI and ads — built and wired together so each one feeds the next instead of sitting in its own silo.",
  },
  {
    number: "03",
    title: "You watch it pay off",
    description:
      "Dashboards that show pipeline and revenue, not likes. And a sales team that turns the leads into signed deals.",
  },
];

export default function HomeHowItWorksSection({ id = "how-it-works" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="dark"
          eyebrow="How it works"
          eyebrowDescription="Three steps from leak to revenue"
          title="Three steps. No jargon."
        />

        <motion.ol className={styles.steps} {...gridStagger}>
          {steps.map((step, index) => (
            <motion.li className={styles.step} key={step.number} {...scrollRevealDepth(index)}>
              <span className={styles.number} aria-hidden="true">
                {step.number}
              </span>
              <div className={styles.body}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
