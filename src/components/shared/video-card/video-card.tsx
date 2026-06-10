import styles from "./video-card.module.css";

interface VideoCardProps {
  id: string;
  title: string;
}

export default function VideoCard({ id, title }: VideoCardProps) {
  return (
    <article className={styles.card}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </article>
  );
}
