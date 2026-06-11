import SectionHeader from "@/components/shared/section-header/section-header";
import ReviewsMarquee from "@/components/shared/reviews/reviews-marquee";
import styles from "./home-testimonials.module.css";

export default function HomeTestimonialsSection({ id = "testimonials" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader
          tone="light"
          eyebrow="What clients say"
          title="Don't take our word for it."
        />
      </div>
      <ReviewsMarquee />
    </section>
  );
}
