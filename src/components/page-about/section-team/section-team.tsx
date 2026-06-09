import { useTranslation } from 'react-i18next';
import styles from './section-team.module.css';

interface TeamMemberCopy {
  name: string;
  title: string;
}

const memberMeta = [
  { ini: 'D', role: 'CEO', image: '/team/ceo.jpg' },
  { ini: 'C', role: 'COO', image: '/team/coo.jpeg' },
  { ini: 'O', role: 'VIDEO' },
  { ini: 'A', role: 'AI' },
  { ini: 'S', role: 'SALES' },
  { ini: 'M', role: 'GROWTH' },
  { ini: 'F', role: 'OPS' },
  { ini: '+', role: '63 MORE' },
];

export default function TeamSection() {
  const { t } = useTranslation('about');
  const localizedMembers = t('team.members', { returnObjects: true }) as TeamMemberCopy[];
  const members = memberMeta.map((meta, index) => ({
    ...meta,
    ...localizedMembers[index],
  }));

  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.team}>
          {members.map((m) => (
            <div key={m.ini + m.role} className={styles.member}>
              <div className={styles.photo}>
                {'image' in m && m.image ? (
                  <img src={m.image} alt={m.name + ', ' + m.title} className={styles.portrait} loading="lazy" decoding="async" />
                ) : (
                  <span className={styles.ini}>{m.ini}</span>
                )}
                <span className={styles.mono}>{m.role}</span>
              </div>
              <div className={styles.info}>
                <h3>{m.name}</h3>
                <div className={styles.role}>{m.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
