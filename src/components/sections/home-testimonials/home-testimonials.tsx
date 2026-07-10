import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/shared/section-header/section-header";
import ReviewsMarquee from "@/components/shared/reviews/reviews-marquee";
import styles from "./home-testimonials.module.css";

export default function HomeTestimonialsSection({ id = "testimonials" }: { id?: string } = {}) {
  const { t } = useTranslation("home");

  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow={t("homeTestimonials.eyebrow")}
          title={t("homeTestimonials.title")}
        />
      </div>
      <ReviewsMarquee />
    </section>
  );
}
