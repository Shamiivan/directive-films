import styles from './section-team.module.css';

const members = [
  { ini: 'D', role: 'CEO',    name: 'The Founder',       title: 'Chief Executive' },
  { ini: 'O', role: 'VIDEO',  name: 'Head of Video',     title: 'Production Lead' },
  { ini: 'A', role: 'AI',     name: 'Head of AI',        title: 'Automation Director' },
  { ini: 'S', role: 'SALES',  name: 'Sales Director',    title: 'Revenue & Closing' },
  { ini: 'M', role: 'GROWTH', name: 'Marketing Director',title: 'Paid Growth' },
  { ini: 'C', role: 'CX',     name: 'Client Experience', title: 'Account Lead' },
  { ini: 'F', role: 'OPS',    name: 'Operations',        title: 'Coordinator' },
  { ini: '+', role: '63 MORE',name: '…and 63 more',      title: 'Across 6 cities' },
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.team}>
          {members.map((m) => (
            <div key={m.ini + m.role} className={styles.member}>
              <div className={styles.photo}>
                <span className={styles.ini}>{m.ini}</span>
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
