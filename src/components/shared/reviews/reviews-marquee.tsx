import { useTranslation } from "react-i18next";
import { reviewsBase, type Review } from "./reviews-data";
import styles from "./reviews-marquee.module.css";

function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation("common");
  return (
    <article className={styles.card}>
      <div className={styles.stars} aria-label={t("a11y.ratedFiveOfFive")}>
        <span aria-hidden="true">★★★★★</span>
      </div>
      <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
      <div className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {review.initials}
        </span>
        <span className={styles.meta}>
          <strong>{review.name}</strong>
          <span>{review.role}</span>
          <span>{review.company}</span>
        </span>
      </div>
    </article>
  );
}

function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  // Duplicate the items so the translateX(-50%) loop is seamless.
  return (
    <div className={styles.row}>
      <div className={[styles.track, reverse ? styles.reverse : ""].join(" ")}>
        {items.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
        {items.map((review, i) => (
          <ReviewCard key={`dup-${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  const { t } = useTranslation("common");
  const items = t("reviews.items", { returnObjects: true }) as {
    quote: string;
    role: string;
  }[];
  const reviews: Review[] = reviewsBase.map((base, i) => ({
    ...base,
    quote: items[i]?.quote ?? "",
    role: items[i]?.role ?? "",
  }));
  const half = Math.ceil(reviews.length / 2);
  const rowA = reviews.slice(0, half);
  const rowB = reviews.slice(half);

  return (
    <div className={styles.marquee}>
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </div>
  );
}
