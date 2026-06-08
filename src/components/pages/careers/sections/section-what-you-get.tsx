import { Banknote, Target, Rocket } from 'lucide-react';
import styles from './section-what-you-get.module.css';

const perks = [
  {
    ico: <Banknote size={22} strokeWidth={1.5} />,
    title: "Floor and ceiling, sorted",
    body: "Base when months are slow, commission when they're hot — you always take the bigger number home.",
  },
  {
    ico: <Target size={22} strokeWidth={1.5} />,
    title: "Leads come to you",
    body: "Marketing and AI fill your calendar. You just do what you're best at — closing.",
  },
  {
    ico: <Rocket size={22} strokeWidth={1.5} />,
    title: "Room to climb",
    body: "Closer today, team lead next year, sales director after that.",
  },
];

export default function WhatYouGetSection() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        {/* Commission highlight box */}
        <div className={styles.commbox}>
          <span className={styles.eyebrow}>Sales pay</span>
          <h2>Base or commission — whichever's higher.</h2>
          <p className={styles.lead}>
            You're never choosing between a safety net and upside. We pay your base or your commission, whichever comes out bigger — so a slow month still pays the bills and a great month has no ceiling.
          </p>
          <div className={styles.commrow}>
            <div className={styles.commstat}>
              <div className={styles.n}>Base</div>
              <div className={styles.l}>Guaranteed floor every month</div>
            </div>
            <div className={styles.commstat}>
              <div className={styles.n}>OR</div>
              <div className={styles.l}>Commission, whichever is higher</div>
            </div>
            <div className={styles.commstat}>
              <div className={styles.n}>Warm</div>
              <div className={styles.l}>Pre-qualified leads, handed to you</div>
            </div>
          </div>
        </div>

        {/* Perks */}
        <span className={styles.perksEyebrow}>Why join us</span>
        <div className={styles.perks}>
          {perks.map((p) => (
            <div key={p.title} className={styles.perk}>
              <div className={styles.ico}>{p.ico}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
