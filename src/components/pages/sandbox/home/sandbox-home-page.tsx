import NavSection from "@/components/page-shared/section-nav/section-nav";
import FooterSection from "@/components/page-shared/section-footer/section-footer";
import HomeHowItWorksSection from "@/components/sections/home-how-it-works/home-how-it-works";
import HomeServicesSection from "@/components/sections/home-services/home-services";
import HomeTestimonialsSection from "@/components/sections/home-testimonials/home-testimonials";
import OfferSection from "@/components/sections/offer/offer";
import TeamSections from "@/components/sections/team-sections/team-sections";
import LogoMarqueeSection from "@/components/shared/logo-row/logo-row";
import styles from "./sandbox-home-page.module.css";

const adVideos = ["1171040145", "1145069446", "1144141000", "1142037166", "1141935607", "1141924603"];
const testimonialVideos = ["1199097531", "1196985086", "1196080273", "1194874494", "1192024292", "1186532088"];


function VimeoCard({ id, title }: { id: string; title: string }) {
  return (
    <article className={styles.videoCard}>
      <iframe
        src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </article>
  );
}

export default function SandboxHomePage() {
  return (
    <main className={styles.page}>
      <NavSection />

      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.32.15_PM_1-min.jpg"
          >
            <source type="video/mp4" src="https://benjyfilms.b-cdn.net/video website background.mp4" />
          </video>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.tags}>
            <span>10 years · 430+ businesses · $100M+ generated</span>
          </div>
          <h1>
            Driven By Purpose.
            <br />
            Defined By Excellence.
          </h1>
          <p>
            Video, ads, AI and closers — wired into one engine that brings you customers. 430+ businesses, $100M+ generated, 10 years.
          </p>
          <a className={styles.primaryButton} href="#contact">Book a call →</a>
        </div>
      </section>

      <LogoMarqueeSection />

      <OfferSection />

      <HomeHowItWorksSection />

      <HomeServicesSection />

      <section className={styles.lightSection} id="ads">
        <div className={styles.sectionHeader}>
          <h2>Some of the ads that we produced</h2>
        </div>
        <div className={styles.videoRail}>
          {adVideos.map((id) => (
            <VimeoCard id={id} title={`Produced ad ${id}`} key={id} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeaderCentered}>
          <h2>What they say about us</h2>
        </div>
        <div className={styles.videoRail}>
          {testimonialVideos.map((id) => (
            <VimeoCard id={id} title={`Client testimonial ${id}`} key={id} />
          ))}
        </div>
      </section>

      <HomeTestimonialsSection />

      <TeamSections />

      <section className={styles.finalCta} id="contact">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://c.animaapp.com/mq5pf53jFiTmD6/assets/Screenshot_2025-07-21_at_10.40.10_PM_1-min.jpg"
        >
          <source type="video/mp4" src="https://benjyfilms.b-cdn.net/wingsuit - end 30.mp4" />
        </video>
        <div>
          <h2>Grow your <em>business revenue</em> now</h2>
          <a className={styles.primaryButton} href="mailto:hello@directivefilms.com">Start your project</a>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
