import { Link } from 'react-router';
import { Search, Clapperboard, TrendingUp, Settings2, Bot, Handshake } from 'lucide-react';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-offer.module.css';

export default function OfferSection() {
  const l = useLocalePath();

  return (
    <section className={styles.section} id="services-preview">
      <div className={styles.wrap}>
        <span className={styles.eyebrow}>What we do</span>
        <h2 className={styles.heading}>The whole journey, one team.</h2>
        <p className={styles.lead}>From a free audit to the closed deal — take one piece or hand us the whole machine.</p>

        <div className={styles.svc}>
          <div className={`${styles.card} ${styles.cardFeature}`}>
            <span className={styles.tag}>Free to start</span>
            <div className={styles.ico}><Search size={22} strokeWidth={1.5} /></div>
            <h3>Audit · Offer · Strategy</h3>
            <p>A no-charge growth audit, then we validate and restructure your offer so it actually sells before a dollar goes out the door.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Clapperboard size={22} strokeWidth={1.5} /></div>
            <h3>Script · Film · Coach · Edit</h3>
            <p>We write it, shoot it on cinema cameras, coach you to shine on camera, and cut it for every platform.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><TrendingUp size={22} strokeWidth={1.5} /></div>
            <h3>Ads · Organic · Posting</h3>
            <p>Paid campaigns and organic content, posted across every platform on a schedule we run for you.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Settings2 size={22} strokeWidth={1.5} /></div>
            <h3>CRM & Sales Systems</h3>
            <p>A CRM built around your workflow so no lead ever slips away. Follow-ups, reminders, real dashboards.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>

          <div className={styles.card}>
            <span className={styles.tag}>AI</span>
            <div className={styles.ico}><Bot size={22} strokeWidth={1.5} /></div>
            <h3>AI & Automation</h3>
            <p>Custom AI that answers leads 24/7, writes the follow-ups and kills the busywork your team hates.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>

          <div className={styles.card}>
            <div className={styles.ico}><Handshake size={22} strokeWidth={1.5} /></div>
            <h3>Commission Sales Team</h3>
            <p>Trained closers who work your leads and earn when a deal closes — not before.</p>
            <Link to={l('/services')} className={styles.more}>Learn more →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
