import styles from './logo-row.module.css';

const logos = [
  { src: '/logos/amazon.svg', className: styles.logoInvert },
  { src: '/logos/telus.svg', className: styles.logoInvert },
  { src: '/logos/rogers.svg', className: styles.logoInvert },
  { src: '/logos/shopify.svg', className: styles.logoInvert },
  { src: '/logos/corona.svg' },
  { src: '/logos/momentum_white.png', className: styles.logoIcon },
  { src: '/logos/altitude.png', className: styles.logoInvert },
  { src: '/logos/mercedes-benz.svg', className: styles.logoInvert },
  { src: '/logos/benjy-clients/10-group-17.png' },
  { src: '/logos/benjy-clients/14-group-11.png' },
];

function LogoRow() {
  return (
    <div className={styles.row} aria-hidden="true">
      {logos.map((logo) => (
        <div className={styles.logoItem} key={logo.src}>
          <img
            src={logo.src}
            alt=""
            className={[styles.logo, logo.className].filter(Boolean).join(' ')}
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarqueeSection() {
  return (
    <section className={styles.section} aria-label="Client logos">
      <div className={styles.container}>
        <div className={styles.overlay}>
          <div className={styles.track}>
            <LogoRow />
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  );
}
