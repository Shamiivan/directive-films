import NavSection from "@/components/page-shared/section-nav/section-nav";
import FooterSection from "@/components/page-shared/section-footer/section-footer";
import HomeHeroSection from "@/components/sections/home-hero/home-hero";
import LogoMarqueeSection from "@/components/shared/logo-row/logo-row";
import OfferSection from "@/components/sections/offer/offer";
import HomeHowItWorksSection from "@/components/sections/home-how-it-works/home-how-it-works";
import HomeServicesSection from "@/components/sections/home-services/home-services";
import HomeVideoReelSection from "@/components/sections/home-video-reel/home-video-reel";
import HomeTestimonialsSection from "@/components/sections/home-testimonials/home-testimonials";
import TeamSections from "@/components/sections/team-sections/team-sections";
import HomeCtaSection from "@/components/sections/home-cta/home-cta";
import ScrollOver from "@/components/shared/scroll-over/scroll-over";
import styles from "./sandbox-home-page.module.css";

const adVideos = ["1171040145", "1145069446", "1144141000", "1142037166", "1141935607", "1141924603"];
const testimonialVideos = ["1199097531", "1196985086", "1196080273", "1194874494", "1192024292", "1186532088"];

export default function SandboxHomePage() {
  return (
    <main className={styles.page}>
      <NavSection />
      <HomeHeroSection />
      <LogoMarqueeSection />
      <OfferSection />
      <HomeHowItWorksSection />
      <HomeServicesSection />
      <ScrollOver
        under={
          <HomeVideoReelSection
            id="work"
            eyebrow="Our work"
            title="Some of the ads that we produced"
            videoIds={[...adVideos, ...testimonialVideos]}
            cardTitle="Produced video"
            tone="dark"
          />
        }
        over={<HomeTestimonialsSection />}
      />
      <TeamSections />
      <HomeCtaSection />
      <FooterSection />
    </main>
  );
}
