import SectionHeader from "@/components/shared/section-header/section-header";
import VideoCard from "@/components/shared/video-card/video-card";
import styles from "./home-video-reel.module.css";

interface HomeVideoReelProps {
  id: string;
  eyebrow: string;
  title: string;
  videoIds: string[];
  cardTitle: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export default function HomeVideoReelSection({
  id,
  eyebrow,
  title,
  videoIds,
  cardTitle,
  align = "left",
  tone = "dark",
}: HomeVideoReelProps) {
  return (
    <section className={[styles.section, tone === "light" ? styles.light : styles.dark].join(" ")} id={id}>
      <div className={styles.container}>
        <SectionHeader eyebrow={eyebrow} title={title} align={align} tone={tone} />
        <div className={styles.rail}>
          {videoIds.map((vid) => (
            <VideoCard id={vid} title={`${cardTitle} ${vid}`} key={vid} />
          ))}
        </div>
      </div>
    </section>
  );
}
