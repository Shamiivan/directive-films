import SectionHeader from "@/components/shared/section-header/section-header";
import VideoCard from "@/components/shared/video-card/video-card";
import styles from "./home-video-reel.module.css";

interface HomeVideoReelProps {
  id: string;
  eyebrow: string;
  title: string;
  videos: Array<{
    id: string;
    title: string;
    src?: string;
    vimeoId?: string;
  }>;
  cardTitle: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export default function HomeVideoReelSection({
  id,
  eyebrow,
  title,
  videos,
  cardTitle,
  align = "left",
  tone = "dark",
}: HomeVideoReelProps) {
  return (
    <section className={[styles.section, tone === "light" ? styles.light : styles.dark].join(" ")} id={id}>
      <div className={styles.container}>
        <SectionHeader eyebrow={eyebrow} title={title} align={align} tone={tone} />
        <div className={styles.rail}>
          {videos.map((video) => (
            <VideoCard
              id={video.vimeoId}
              src={video.src}
              title={`${cardTitle}: ${video.title}`}
              key={video.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
