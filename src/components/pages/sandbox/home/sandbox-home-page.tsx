import NavSection from "@/components/page-shared/section-nav/section-nav";
import HomeServicesSection from "@/components/sections/home-services/home-services";
import LogoMarqueeSection from "@/components/shared/logo-row/logo-row";
import styles from "./sandbox-home-page.module.css";

const adVideos = ["1171040145", "1145069446", "1144141000", "1142037166", "1141935607", "1141924603"];
const testimonialVideos = ["1199097531", "1196985086", "1196080273", "1194874494", "1192024292", "1186532088"];

const testimonials = [
  {
    quote: "Working with Marc-Antoine and Alexandra was super easy and I would love to work with them again!",
    author: "Montreal Improv",
  },
  {
    quote: "Emmanuelle took charge of our file. Funny, dynamic, full of great ideas. Would highly recommend her and Benjy for all your marketing needs.",
    author: "Mehdi Alaoui Sossey",
  },
  {
    quote: "Simply the best there is. Thank you for bringing our business to the next level.",
    author: "Shawn Sckoropad",
  },
  {
    quote: "Benjy and his team are true professionals when it comes to creating content for your brand and managing your social media accounts.",
    author: "Alexandre Buisson",
  },
  {
    quote: "A local production company with great talent. Benjy understood our vision and brought it to another level.",
    author: "Marie-Eve Tardif",
  },
  {
    quote: "The approach, topic suggestions, and explanations are clear and very professional. We are looking forward to the rest of the project.",
    author: "Canino Garderie",
  },
];

const team = [
  {
    name: "Benjy",
    role: "CEO",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/6867f109305b1200c7a9672f_Benjy_(CEO)_1_(1)-min.png",
  },
  {
    name: "Olivier",
    role: "Head of video operations",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/6867f14d37a1963a706363b7_Olivier_(Directeurs_des_vidéastes)_1_(1)-min.png",
  },
  {
    name: "Claudy",
    role: "Marketing Director",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/69d40e4d5ae011343e1d8c03_Gemini_Generated_Image_ewyau8ewyau8ewya_(1).png",
  },
  {
    name: "Andrada",
    role: "Head of Client Experience",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/68c302f0bebe5c11d8a20004_Photo_Siteweb_1.jpeg",
  },
  {
    name: "Fabie-Anne",
    role: "Management Coordinator",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/68debd3cf7fee24ce523099a_professionelle.PNG",
  },
  {
    name: "Alex",
    role: "Sales Director",
    image: "https://c.animaapp.com/mq5pf53jFiTmD6/assets/69e9e5f4efbf4c5e6a0e8b3c_Gemini_Generated_Image_1mhlvs1mhlvs1mhl_(1).png",
  },
];

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

      <section className={styles.statement}>
        <div className={styles.statementLine}>
          <span>We</span>
          <span>make</span>
          <span>businesses</span>
          <span className={styles.pillStatement}>
            <img
              src="https://c.animaapp.com/mq5pf53jFiTmD6/assets/6877a1ae5e1a3d6a39a7ccc5_A04I8546-2_3-min.jpg"
              alt=""
            />
            grow fast
          </span>
          <span>with</span>
          <span>content,</span>
          <span>paid ads</span>
          <span>and</span>
          <span>sales systems.</span>
        </div>
        <a className={styles.darkButton} href="#services">See our process</a>
      </section>

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

      <section className={styles.testimonials}>
        {testimonials.map((testimonial) => (
          <article className={styles.testimonialCard} key={testimonial.author}>
            <p>{testimonial.quote}</p>
            <strong>{testimonial.author}</strong>
          </article>
        ))}
      </section>

      <section className={styles.section} id="team">
        <div className={styles.sectionHeaderCentered}>
          <h2>The people behind the results</h2>
          <p>A team of 70 dedicated to your success</p>
        </div>
        <div className={styles.teamRail}>
          {team.map((member) => (
            <article className={styles.teamCard} key={member.name}>
              <img src={member.image} alt={member.name} loading="lazy" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

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

      <footer className={styles.footer}>
        <img
          src="https://c.animaapp.com/mq5pf53jFiTmD6/assets/68f666a978c6a663468ace53_BNJY_HORIZONAL_PNG_WHITE_3_(2).png"
          alt="Benjy Films"
        />
        <div>
          <a href="#services">Growth</a>
          <a href="#ads">Films</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
        <p>Sandbox port for DirectiveFilms.</p>
      </footer>
    </main>
  );
}
