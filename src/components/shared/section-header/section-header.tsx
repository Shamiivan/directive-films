import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { scrollReveal } from "@/utils/animations";
import styles from "./section-header.module.css";

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  eyebrowDescription?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export default function SectionHeader({
  title,
  intro,
  align = "left",
  tone = "dark",
}: SectionHeaderProps) {
  return (
    <motion.div className={[styles.header, styles[align], styles[tone]].join(" ")} {...scrollReveal}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.accent} aria-hidden="true" />
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </motion.div>
  );
}
