import styles from './section-open-positions.module.css';

const jobs = [
  { title: "Sales Closer",             meta: "Remote / Montreal · Base or commission, whichever's higher", tag: "Sales" },
  { title: "AI Automation Engineer",   meta: "Hybrid · Full-time",                                          tag: "Engineering" },
  { title: "Videographer / Editor",    meta: "On-site · Full-time",                                         tag: "Production" },
  { title: "Paid Media Strategist",    meta: "Remote · Full-time",                                          tag: "Growth" },
];

export default function OpenPositionsSection() {
  return (
    <section className={styles.section} id="apply">
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>Open roles</span>
        <div className={styles.jobs}>
          {jobs.map((j) => (
            <div key={j.title} className={styles.job}>
              <div>
                <h3>{j.title}</h3>
                <div className={styles.meta}>{j.meta}</div>
              </div>
              <div className={styles.jobRight}>
                <span className={styles.pill}>{j.tag}</span>
                <a href="mailto:info@directivefilms.com" className={styles.btn}>Apply</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
