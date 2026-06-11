import MediaHero from "@/components/shared/media-hero/media-hero";

export default function HomeHeroSection() {
  return (
    <MediaHero
      eyebrow="10 years · 430+ businesses · $100M+ generated"
      title={
        <>
          Driven By Purpose.
          <br />
          Defined By Excellence.
        </>
      }
      lede="Video, ads, AI and closers — wired into one engine that brings you customers. 430+ businesses, $100M+ generated, 10 years."
      ctaHref="/audit"
      ctaLabel="Get your free growth audit"
    />
  );
}
