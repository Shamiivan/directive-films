import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";
import { scrollReveal } from "@/utils/animations";
import styles from "./section-header.module.css";

interface SectionHeaderProps {
  eyebrow: ReactNode;
  eyebrowDescription?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export default function SectionHeader({
  eyebrow,
  eyebrowDescription,
  title,
  intro,
  align = "left",
  tone = "dark",
}: SectionHeaderProps) {
  return (
    <motion.div className={[styles.header, styles[align], styles[tone]].join(" ")} {...scrollReveal}>
      <SectionEyebrow label={eyebrow} description={eyebrowDescription} />
      <h2 className={styles.title}>{title}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </motion.div>
  );
}
