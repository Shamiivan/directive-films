import SectionHeader from '@/components/shared/section-header/section-header';
import styles from './team-sections.module.css';

const teamMembers = [
  {
    role: 'CEO / Founder',
    focus: 'Strategy, creative direction, and client outcomes.',
    image: '/team/ceo.jpg',
  },
  {
    role: 'COO',
    focus: 'Operations, delivery rhythm, and production excellence.',
    image: '/team/coo.jpeg',
  },
];

export default function TeamSections() {
  return (
    <section className={styles.section} id="team">
      <div className={styles.container}>
        <SectionHeader
          eyebrow="Leadership"
          title="The people behind the results"
          intro="Two operators leading the strategy, production, and systems that move each project from idea to measurable growth."
        />

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <article className={styles.card} key={member.role}>
              <div className={styles.photo}>
                <img src={member.image} alt={member.role} loading="lazy" decoding="async" />
                <span>{member.role}</span>
              </div>
              <div className={styles.content}>
                <h3>{member.role}</h3>
                <p>{member.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
