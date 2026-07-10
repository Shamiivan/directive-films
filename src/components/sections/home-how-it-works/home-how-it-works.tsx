import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/section-header/section-header";
import Reveal from "@/components/shared/reveal/reveal";
import styles from "./home-how-it-works.module.css";

interface Step {
  title: string;
  description: string;
}

export default function HomeHowItWorksSection({ id = "how-it-works" }: { id?: string } = {}) {
  const { t } = useTranslation("home");
  const steps = t("homeHowItWorks.steps", { returnObjects: true }) as Step[];

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="dark"
          eyebrow={t("homeHowItWorks.eyebrow")}
          eyebrowDescription={t("homeHowItWorks.eyebrowDescription")}
          title={t("homeHowItWorks.title")}
        />

        <ol className={styles.steps}>
          {steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <Reveal as="li" className={styles.step} key={number} delay={index * 0.1} y={40}>
                <span className={styles.number} aria-hidden="true">
                  {number}
                </span>
                <div className={styles.body}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
