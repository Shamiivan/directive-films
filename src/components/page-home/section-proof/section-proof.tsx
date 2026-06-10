import { useTranslation } from 'react-i18next';
import { STATIC_COMPANY_LOGOS } from '@/cms/staticContent';
import styles from './section-proof.module.css';

type Logo = { src: string; alt: string };

export default function ProofSection() {
  const { t } = useTranslation('home');
  const logos: Logo[] = STATIC_COMPANY_LOGOS.map((l) => ({ src: l.src, alt: l.name }));

  return (
    <div className={styles.trust}>
      <div className={styles.wrap}>
        <span className={styles.lbl}>{t('proof.label')}</span>
        {logos.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt} className={styles.logo} />
        ))}
      </div>
    </div>
  );
}
