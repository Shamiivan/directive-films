import NavSection from "@/components/page-shared/section-nav/section-nav";
import FooterSection from "@/components/page-shared/section-footer/section-footer";
import HomeHeroSection from "@/components/sections/home-hero/home-hero";
import LogoMarqueeSection from "@/components/shared/logo-row/logo-row";
import OfferSection from "@/components/sections/offer/offer";
import HomeHowItWorksSection from "@/components/sections/home-how-it-works/home-how-it-works";
import HomeServicesSection from "@/components/sections/home-services/home-services";
import HomeVideoReelSection from "@/components/sections/home-video-reel/home-video-reel";
import HomeTestimonialsSection from "@/components/sections/home-testimonials/home-testimonials";
import HomeResultsSection from "@/components/sections/home-results/home-results";
import TeamSections from "@/components/sections/team-sections/team-sections";
import PricingSection from "@/components/page-home/section-pricing/section-pricing";
import HomeFaqSection from "@/components/sections/home-faq/home-faq";
import HomeGuaranteeSection from "@/components/sections/home-guarantee/home-guarantee";
import HomeCtaSection from "@/components/sections/home-cta/home-cta";
import ScrollOver from "@/components/shared/scroll-over/scroll-over";
import styles from "./home-page.module.css";

// Flip this on when the proof reel is ready to show.
const showWorkReel = true;
const proofVideos = [
  {
    id: "ad2-sale-before-pitch",
    title: "The sale is done before you even pitch",
    src: "/proof/videos/ad2-sale-before-pitch-720.mp4",
  },
  {
    id: "boosting-posts-makes-you-poor",
    title: "Why boosting posts makes you poor",
    src: "/proof/videos/boosting-posts-makes-you-poor-720.mp4",
  },
  {
    id: "ton-entreprise-perd-du-cash",
    title: "Ton entreprise perd du cash",
    src: "/proof/videos/ton-entreprise-perd-du-cash-720.mp4",
  },
  {
    id: "hooks",
    title: "Hooks that stop the scroll",
    src: "/proof/videos/hooks.mp4",
  },
  {
    id: "organic-and-paid",
    title: "Organic and paid, pulling in the same direction",
    src: "/proof/videos/organic_and_paid.mp4",
  },
  {
    id: "website-video-car-without-wheels",
    title: "A website video is like a car without wheels",
    src: "/proof/videos/07-a website video is like a car without wheels.mp4",
  },
  {
    id: "ads-fabrique-au-quebec",
    title: "Ads fabriquées au Québec",
    src: "/proof/videos/ads_fabrique_au_quebec.mp4",
  },
  {
    id: "fabric-cta",
    title: "Fabric CTA",
    src: "/proof/videos/fabric_cta.mp4",
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <NavSection />
      <HomeHeroSection />
      <LogoMarqueeSection />
      <OfferSection />
      <HomeHowItWorksSection />
      <HomeServicesSection />
      {showWorkReel ? (
        <ScrollOver
          under={
            <HomeVideoReelSection
              id="work"
              eyebrow="Our work"
              title="Some of the ads that we produced"
              videos={proofVideos}
              cardTitle="Produced video"
              tone="dark"
            />
          }
          over={<HomeTestimonialsSection />}
        />
      ) : (
        <HomeTestimonialsSection />
      )}
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
