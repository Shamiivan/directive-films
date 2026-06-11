import type { ReactNode } from "react";
import styles from "./scroll-over.module.css";

/**
 * Renders a key dark<->light section handoff with the "scroll-over" effect:
 * `under` pins to the top of the viewport while `over` (rounded top + shadow
 * lip) scrolls up and slides across it. Use ONLY at key tonal transitions, not
 * every section.
 *
 * Reduced-motion: pinning + overlap are disabled, falling back to plain
 * stacked sections.
 *
 * Caveat: `over` is an overflow-clip context, so a `position: sticky` element
 * inside it sticks within the section, not the viewport.
 */
export default function ScrollOver({
  under,
  over,
}: {
  under: ReactNode;
  over: ReactNode;
}) {
  return (
    <div className={styles.boundary}>
      <div className={styles.under}>{under}</div>
      <div className={styles.over}>{over}</div>
    </div>
  );
}
