import { useState } from 'react';
import { MapPin, Globe, Mail, Zap } from 'lucide-react';
import styles from './section-contact-hero.module.css';

export default function ContactHeroSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>Contact</span>
          <h1 className={styles.heading}>
            Let's grow your<br />
            business <span className={styles.serifIt}>together.</span>
          </h1>
          <p className={styles.lead}>
            Tell us where you're at. The first call is free, and we'll give it to you straight — whether or not we're the ones to help.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.grid}>
            {/* Left — form */}
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Full name</label>
                <input type="text" placeholder="Jane Doe" required />
              </div>
              <div className={styles.field}>
                <label>Work email</label>
                <input type="email" placeholder="jane@company.com" required />
              </div>
              <div className={styles.field}>
                <label>Company & monthly revenue</label>
                <input type="text" placeholder="Acme Inc — $50k/mo" />
              </div>
              <div className={styles.field}>
                <label>What do you need most?</label>
                <select>
                  <option>Free growth audit</option>
                  <option>Offer validation & restructure</option>
                  <option>Scripting, filming & coaching</option>
                  <option>Editing</option>
                  <option>Ad campaigns & organic content</option>
                  <option>Posting on all platforms</option>
                  <option>CRM & sales systems</option>
                  <option>AI & automation</option>
                  <option>Commission sales team</option>
                  <option>Not sure — audit me</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Tell us about your goal</label>
                <textarea placeholder="We want to add $X in revenue over the next 6 months…" />
              </div>
              <button type="submit" className={styles.submitBtn}>
                {submitted ? "We'll be in touch soon!" : "Book my free call →"}
              </button>
            </form>

            {/* Right — info */}
            <div>
              <div className={styles.item}>
                <div className={styles.ico}><MapPin size={20} strokeWidth={1.5} /></div>
                <div>
                  <h3>Montreal · Toronto · Vancouver</h3>
                  <p>Canadian HQ & production studios</p>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.ico}><Globe size={20} strokeWidth={1.5} /></div>
                <div>
                  <h3>Miami · New York · London</h3>
                  <p>Serving B2B & B2C clients globally</p>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.ico}><Mail size={20} strokeWidth={1.5} /></div>
                <div>
                  <h3>info@directivefilms.com</h3>
                  <p>We get back to you within a business day</p>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.ico}><Zap size={20} strokeWidth={1.5} /></div>
                <div>
                  <h3>10 years in</h3>
                  <p>430+ businesses and counting</p>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricBig}>$100M+</div>
                <div className={styles.metricCap}>generated for the businesses we've worked with. Yours could be next.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
