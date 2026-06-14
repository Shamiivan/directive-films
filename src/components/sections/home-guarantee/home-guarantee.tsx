import { Check } from "lucide-react";
import Reveal from "@/components/shared/reveal/reveal";
import styles from "./home-guarantee.module.css";

const points = [
  { label: "Free audit", detail: "No charge to find the leaks." },
  { label: "No commitment", detail: "Nothing to sign to get the read." },
  { label: "Keep the plan", detail: "It's yours either way." },
];

export default function HomeGuaranteeSection({ id = "guarantee" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <ul className={styles.points}>
          {points.map((point, i) => (
            <Reveal as="li" className={styles.point} key={point.label} delay={i * 0.08} y={20}>
              <span className={styles.icon} aria-hidden="true">
                <Check size={16} strokeWidth={3} />
              </span>
              <span className={styles.text}>
                <strong>{point.label}</strong>
                <span>{point.detail}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
