import SectionHeader from "@/components/shared/section-header/section-header";
import styles from "./home-testimonials.module.css";

const testimonials = [
  {
    quote: "They were just perfect.",
    initials: "JS",
    name: "Julio Sequeira",
    role: "VP of Marketing",
    company: "D4Pack",
    sourceAgency: "My Little Big Web",
  },
  {
    quote: "They all take the time to provide well-thought-out answers.",
    initials: "ED",
    name: "Eric David",
    role: "VP",
    company: "Drive A Boat Canada",
    sourceAgency: "My Little Big Web",
  },
  {
    quote: "They were super friendly and professional.",
    initials: "JL",
    name: "Julie Lavallée Ansay",
    role: "Communications & Development Coordinator",
    company: "Hochelaga / SDC HM",
    sourceAgency: "My Little Big Web",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "GE",
    name: "George El-Hage",
    role: "Founder & CEO",
    company: "Wave Connect",
    sourceAgency: "Let's Get Optimized",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "JT",
    name: "Jamie Trachtenberg",
    role: "Director of Operations",
    company: "Mancini Leather Goods",
    sourceAgency: "BlueHat Marketing",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "JC",
    name: "Jean-Philippe Côté",
    role: "CEO",
    company: "Brilliant Lighting Solutions",
    sourceAgency: "Atoll Digital",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "MT",
    name: "Marie-Eve Thiffault",
    role: "Owner",
    company: "Eve Laser",
    sourceAgency: "Atoll Digital",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "AS",
    name: "Antoine S",
    role: "CEO",
    company: "Realty Company",
    sourceAgency: "Atoll Digital",
  },
  {
    quote: "They were responsive and efficient in communicating ideas or guiding us to ensure the best result.",
    initials: "K",
    name: "Kewin",
    role: "Owner",
    company: "EV Charging Solutions Company",
    sourceAgency: "Atoll Digital",
  },
  {
    quote: "I received excellent advice from the team regarding the promotion of my Festival.",
    initials: "SS",
    name: "Samantha Superstein",
    role: "Marketing Director",
    company: "Mad Science Group",
    sourceAgency: "Webtmize",
  },
  {
    quote: "We've had slick growth over the past 10 months, and we're very happy.",
    initials: "GD",
    name: "Guillaume Donat",
    role: "CEO",
    company: "Clean Equipements",
    sourceAgency: "Digitad",
  },
  {
    quote: "Their proactive approach, excellent reporting, and constant availability make them a pleasure to work with.",
    initials: "CF",
    name: "Charles Frazier",
    role: "CEO & Founder",
    company: "Agriculture Company",
    sourceAgency: "Courimo",
  },
  {
    quote: "They were a strategic partner who deeply understood our industry and consistently went the extra mile to help us grow.",
    initials: "RR",
    name: "Ray Ruga",
    role: "Co-Founder & CEO",
    company: "Fintech Americas",
    sourceAgency: "Courimo",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "JM",
    name: "Jason Mayoral",
    role: "CEO",
    company: "Valiant Payments",
    sourceAgency: "Courimo",
  },
  {
    quote: "Courimo's adaptability and understanding of our goals stood out.",
    initials: "DB",
    name: "Daniel Banu",
    role: "Founder & CEO",
    company: "Dexvers",
    sourceAgency: "Courimo",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "MF",
    name: "Melissa Frakman",
    role: "CEO & Founding Partner",
    company: "EMVC",
    sourceAgency: "Courimo",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "JC",
    name: "Jim Collas",
    role: "CEO & President",
    company: "Stealth Fintech Venture",
    sourceAgency: "Courimo",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "MG",
    name: "Munu Hicken Gaberria",
    role: "Founder",
    company: "LFT Group",
    sourceAgency: "Let's Get Optimized",
  },
  {
    quote: "A public review placeholder from a Montreal agency profile. Replace with a Directive Films client quote.",
    initials: "JP",
    name: "Jody Patfield",
    role: "President",
    company: "Kempenfelt Imaging Systems",
    sourceAgency: "Let's Get Optimized",
  },
  {
    quote: "They are very knowledgeable and always make suggestions which always seem to work.",
    initials: "BB",
    name: "Bibi B",
    role: "Administrative Manager",
    company: "Key Storage",
    sourceAgency: "Let's Get Optimized",
  },
];

export default function HomeTestimonialsSection({ id = "testimonials" }: { id?: string } = {}) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        <SectionHeader eyebrow="What clients say" title="Don't take our word for it." />

        <div className={styles.quotes} aria-label="Public review placeholders">
          {testimonials.map((testimonial) => (
            <article className={styles.quote} key={testimonial.name + "-" + testimonial.company}>
              <p className={styles.quoteText}>&ldquo;{testimonial.quote}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar} aria-hidden="true">
                  {testimonial.initials}
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                  <span>{testimonial.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
