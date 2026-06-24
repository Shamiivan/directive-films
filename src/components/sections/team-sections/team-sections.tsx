import SectionHeader from '@/components/shared/section-header/section-header';
import Reveal from '@/components/shared/reveal/reveal';
import styles from './team-sections.module.css';

type Member = {
  name: string;
  role: string;
  image: string;
};

const team: Member[] = [
  { name: 'Damon', role: 'CEO / Founder', image: '/team/ceo.jpg' },
  { name: 'Karine', role: 'COO', image: '/team/coo.jpeg' },
  { name: 'Gabriel', role: 'CMO', image: '/team/Gabriel_CMO.png' },
  { name: 'Odelin', role: 'Head of Editing', image: '/team/odelin_chef_monteur.webp' },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <Reveal className={styles.card} y={28} delay={index * 0.08}>
      <div className={styles.imageWrap}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
    </Reveal>
  );
}

export default function TeamSections({ showHeader = true }: { showHeader?: boolean } = {}) {
  return (
    <section className={styles.section} id="team">
      {showHeader && (
        <div className={styles.intro}>
          <SectionHeader
            eyebrow="The Team"
            title="The people behind the results"
            intro="The operators leading the strategy, production, and creative that move each project from idea to measurable growth."
            tone="dark"
          />
        </div>
      )}

      <div className={styles.grid}>
        {team.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
