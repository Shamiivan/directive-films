import { useTranslation } from "react-i18next";
import CtaButton from "@/components/shared/cta-button/cta-button";
import styles from "./home-cta.module.css";

export default function HomeCtaSection({ id = "contact" }: { id?: string } = {}) {
  const { t } = useTranslation("home");

  return (
    <section className={styles.cta} id={id}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/cta-broll-pexels-poster.jpg"
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
