import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { useLocalePath } from "@/hooks/useLocalePath";
import styles from "./cta-button.module.css";

type CtaButtonVariant = "gold" | "outline" | "dark";

type CtaButtonProps = {
  children: ReactNode;
  arrow?: boolean;
  variant?: CtaButtonVariant;
  className?: string;
  fullWidth?: boolean;
  href?: string;
  to?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "download">;

export default function CtaButton({
  href,
  to,
  children,
  arrow = true,
  variant = "gold",
  className,
  fullWidth = false,
  type = "button",
  onClick,
  target,
  rel,
  download,
}: CtaButtonProps) {
  const l = useLocalePath();
  const buttonClassName = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className,
  ].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={l(to)} className={buttonClassName}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonClassName}
        target={target}
        rel={target === "_blank" && !rel ? "noreferrer" : rel}
        download={download}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {content}
    </button>
  );
}
