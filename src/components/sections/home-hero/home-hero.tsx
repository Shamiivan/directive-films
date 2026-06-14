import { useTranslation } from "react-i18next";
import MediaHero from "@/components/shared/media-hero/media-hero";

export default function HomeHeroSection() {
  const { t } = useTranslation("home");

  return (
    <MediaHero
      eyebrow={t("homeHero.eyebrow")}
      title={
        <>
          {t("homeHero.titleLine1")}
          <br />
          {t("homeHero.titleLine2")}
        </>
      }
      lede={t("homeHero.lede")}
      ctaHref="/audit"
      ctaLabel={t("ctaFreeAudit", { ns: "common" })}
    />
  );
}
