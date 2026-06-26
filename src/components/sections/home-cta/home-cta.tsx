import { useTranslation } from "react-i18next";
import CtaButton from "@/components/shared/cta-button/cta-button";
import { useBackgroundVideoAutoplay } from "@/components/shared/use-background-video-autoplay";
import styles from "./home-cta.module.css";

export default function HomeCtaSection({ id = "contact" }: { id?: string } = {}) {
  const { t } = useTranslation("home");
  const videoRef = useBackgroundVideoAutoplay();

  return (
    <section className={styles.cta} id={id}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/cta-broll-pexels-poster.jpg"
        {...{ "webkit-playsinline": "" }}
      >
        <source type="video/mp4" src="/videos/cta-broll-pexels.mp4" />
      </video>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          {t("homeCta.titlePrefix")}
          <em>{t("homeCta.titleEm")}</em>
          {t("homeCta.titleSuffix")}
        </h2>
        <CtaButton to="/audit">{t("ctaFreeAudit", { ns: "common" })}</CtaButton>
      </div>
    </section>
  );
}
