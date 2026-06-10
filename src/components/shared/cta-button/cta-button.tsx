import type { ReactNode } from "react";
import styles from "./cta-button.module.css";

interface CtaButtonProps {
  href: string;
  children: ReactNode;
  arrow?: boolean;
  variant?: "gold" | "outline";
  className?: string;
}

export default function CtaButton({
  href,
  children,
  arrow = true,
  variant = "gold",
  className,
}: CtaButtonProps) {
  return (
    <a href={href} className={[styles.button, styles[variant], className].filter(Boolean).join(" ")}>
      <span>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </a>
  );
}
