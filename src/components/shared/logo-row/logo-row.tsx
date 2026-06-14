import { useTranslation } from 'react-i18next';
import styles from './logo-row.module.css';

type Logo = {
  src?: string;
  label: string;
  className?: string;
  itemClassName?: string;
  tone?: string;
  detail?: string;
  caption?: string;
};

const logos: Logo[] = [
  { src: '/logos/benjy-clients/14-group-11.png', label: 'Red Bull' },
  { src: '/logos/telus.svg', label: 'Telus', className: styles.logoInvert },
  { src: '/logos/rogers.svg', label: 'Rogers', className: styles.logoInvert },
  { src: '/logos/shopify.svg', label: 'Shopify', className: styles.logoInvert },
  { src: '/logos/factory-direct.jpg', label: 'Factory Direct', className: styles.logoFactoryDirect },
  {
    src: '/logos/momentum-management.webp',
    label: 'Momentum Management',
    className: styles.logoMomentum,
    itemClassName: styles.logoWithCaption,
    caption: 'Momentum Management',
  },
  { label: 'Backhand Renovation' },
  { src: '/logos/budweiser.svg', label: 'Budweiser', className: styles.logoBudweiser },
  { src: '/logos/rode.svg', label: 'RODE Microphones', className: styles.logoRode, itemClassName: styles.logoPlate },
  { src: '/logos/mercedes-benz.svg', label: 'Mercedes-Benz', className: styles.logoInvert },
];

function LogoRow() {
  return (
    <div className={styles.row} aria-hidden="true">
      {logos.map((logo) => {
        const key = logo.src ?? logo.label;

        return (
          <div className={[styles.logoItem, logo.itemClassName].filter(Boolean).join(' ')} key={key}>
            {logo.src ? (
              <>
                <img
                  src={logo.src}
                  alt=""
                  className={[styles.logo, logo.className].filter(Boolean).join(' ')}
                />
                {logo.caption ? <span className={styles.logoCaption}>{logo.caption}</span> : null}
              </>
            ) : (
              <span className={[styles.logoWordmark, logo.tone].filter(Boolean).join(' ')}>
                <span>{logo.label}</span>
                {logo.detail ? <small>{logo.detail}</small> : null}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function LogoMarqueeSection() {
  const { t } = useTranslation('home');

  return (
    <section className={styles.section} aria-label={t('clientLogos.ariaLabel')}>
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
