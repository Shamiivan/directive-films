import { motion } from "framer-motion";
import SectionEyebrow from "../../SectionEyebrow";
import { scrollReveal } from "../../../utils/animations";
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
        <motion.div className={styles.header} {...scrollReveal}>
          <SectionEyebrow label="How it works" description="Three steps from leak to revenue" />
          <h2 className={styles.title}>Three steps. No jargon.</h2>
        </motion.div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
