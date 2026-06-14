import NavSection from "@/components/page-shared/section-nav/section-nav";
import FooterSection from "@/components/page-shared/section-footer/section-footer";
import HomeHeroSection from "@/components/sections/home-hero/home-hero";
import LogoMarqueeSection from "@/components/shared/logo-row/logo-row";
import OfferSection from "@/components/sections/offer/offer";
import HomeHowItWorksSection from "@/components/sections/home-how-it-works/home-how-it-works";
import HomeServicesSection from "@/components/sections/home-services/home-services";
// import HomeVideoReelSection from "@/components/sections/home-video-reel/home-video-reel"; // hidden: "Our work" reel not ready
import HomeTestimonialsSection from "@/components/sections/home-testimonials/home-testimonials";
import HomeResultsSection from "@/components/sections/home-results/home-results";
import TeamSections from "@/components/sections/team-sections/team-sections";
import PricingSection from "@/components/page-home/section-pricing/section-pricing";
import HomeFaqSection from "@/components/sections/home-faq/home-faq";
import HomeGuaranteeSection from "@/components/sections/home-guarantee/home-guarantee";
import HomeCtaSection from "@/components/sections/home-cta/home-cta";
// import ScrollOver from "@/components/shared/scroll-over/scroll-over"; // hidden: "Our work" reel not ready
import styles from "./home-page.module.css";

// Restore alongside the "Our work" reel when it's ready to show.
// const adVideos = ["1171040145", "1145069446", "1144141000", "1142037166", "1141935607", "1141924603"];
// const testimonialVideos = ["1199097531", "1196985086", "1196080273", "1194874494", "1192024292", "1186532088"];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <NavSection />
      <HomeHeroSection />
      <LogoMarqueeSection />
      <OfferSection />
      <HomeHowItWorksSection />
      <HomeServicesSection />
      {/* "Our work" video reel hidden for now - not ready to show.
          Restore by wrapping HomeTestimonialsSection back in <ScrollOver>
          with this as the `under` layer. */}
      {/* <ScrollOver
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
      /> */}
      <HomeTestimonialsSection />
      <HomeResultsSection />
      <TeamSections />
      <PricingSection />
      <HomeFaqSection />
      <HomeGuaranteeSection />
      <HomeCtaSection />
      <FooterSection />
    </main>
  );
}
