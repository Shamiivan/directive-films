import { Search, Target, PenLine, Clapperboard, Scissors, TrendingUp, Smartphone, Settings2, Bot, Handshake } from 'lucide-react';
import styles from './section-services.module.css';

export default function SectionServices() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.svc}>

          <div className={styles.card}>
            <span className={styles.tag}>Free</span>
            <div className={styles.ico}><Search size={22} strokeWidth={1.5} /></div>
            <h3>Growth Audit</h3>
            <p>Straight talk on what's holding you back — at no charge.</p>
            <ul>
              <li>We pull apart your funnel</li>
              <li>Show where rivals beat you</li>
              <li>Ranked, do-this-first plan</li>
              <li>Costs you nothing</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Target size={22} strokeWidth={1.5} /></div>
            <h3>Offer Validation & Restructure</h3>
            <p>We make sure the offer sells before we spend a dollar on it.</p>
            <ul>
              <li>Test it against the market</li>
              <li>Reshape pricing & promise</li>
              <li>Kill what doesn't land</li>
              <li>Lock in what converts</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><PenLine size={22} strokeWidth={1.5} /></div>
            <h3>Scripting</h3>
            <p>Words written to sell, not to sound clever.</p>
            <ul>
              <li>Hooks that stop the scroll</li>
              <li>Built around how you close</li>
              <li>For ads and organic alike</li>
              <li>You approve before we roll</li>
            </ul>
          </div>

          <div className={`${styles.card} ${styles.cardFeature}`}>
            <span className={styles.tag}>Flagship</span>
            <div className={styles.ico}><Clapperboard size={22} strokeWidth={1.5} /></div>
            <h3>Filming & On-Camera Coaching</h3>
            <p>We shoot it on cinema cameras — and coach you so you actually look good and sound natural on camera.</p>
            <ul>
              <li>Cinema-camera crews</li>
              <li>On-camera coaching for you & your team</li>
              <li>On set in days, not months</li>
              <li>Confident, natural delivery</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Scissors size={22} strokeWidth={1.5} /></div>
            <h3>Editing</h3>
            <p>Cut for attention and for the platform it lives on.</p>
            <ul>
              <li>Ad-ready & short-form cuts</li>
              <li>Captions, motion, sound</li>
              <li>Multiple variants to test</li>
              <li>Fast turnarounds</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><TrendingUp size={22} strokeWidth={1.5} /></div>
            <h3>Ad Campaigns & Organic Content</h3>
            <p>Paid and organic, pulling in the same direction.</p>
            <ul>
              <li>Meta & Google, managed daily</li>
              <li>Organic content that compounds</li>
              <li>Creative tested fast</li>
              <li>Reporting in dollars</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Smartphone size={22} strokeWidth={1.5} /></div>
            <h3>Posting On All Platforms</h3>
            <p>We handle the calendar and hit publish everywhere.</p>
            <ul>
              <li>Instagram, TikTok, YouTube, LinkedIn & more</li>
              <li>Consistent posting schedule</li>
              <li>Platform-native formatting</li>
              <li>Hands off your plate</li>
            </ul>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Settings2 size={22} strokeWidth={1.5} /></div>
            <h3>CRM & Sales Systems</h3>
            <p>So no lead ever slips through the cracks again.</p>
            <ul>
              <li>Built around your workflow</li>
              <li>Auto follow-ups & reminders</li>
              <li>Revenue you can actually see</li>
              <li>We train your team to run it</li>
            </ul>
          </div>

          <div className={styles.card}>
            <span className={styles.tag}>AI</span>
            <div className={styles.ico}><Bot size={22} strokeWidth={1.5} /></div>
            <h3>AI & Automation</h3>
            <p>The work your team dreads, handled around the clock.</p>
            <ul>
              <li>Leads answered 24/7</li>
              <li>Follow-ups written for you</li>
              <li>Pipeline scored automatically</li>
              <li>Hours of admin, gone</li>
            </ul>
          </div>

          <div className={styles.card}>
            <span className={styles.tag}>Performance-based</span>
            <div className={styles.ico}><Handshake size={22} strokeWidth={1.5} /></div>
            <h3>Commission Sales Team</h3>
            <p>Closers who only earn when you do.</p>
            <ul>
              <li>Trained, vetted, ready</li>
              <li>They work your inbound leads</li>
              <li>Performance-based — no retainer risk</li>
              <li>Wired straight into your CRM</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
