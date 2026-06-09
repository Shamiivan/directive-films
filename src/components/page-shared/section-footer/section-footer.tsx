import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import styles from './section-footer.module.css';

type FooterLink = {
  label: string;
  href: string;
};

export default function FooterSection() {
  const l = useLocalePath();
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();
  const services = t('footer.serviceLinks', { returnObjects: true }) as FooterLink[];
  const company = t('footer.companyLinks', { returnObjects: true }) as FooterLink[];
  const connect = t('footer.connectLinks', { returnObjects: true }) as string[];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.fgrid}>
          <div>
            <Link to={l('/')} className={styles.brand}>
              <img src="/logos/logo-icon.svg" alt="DirectiveFilms" className={styles.logoIcon} />
              <span>DirectiveFilms</span>
            </Link>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
            <div className={styles.loc}>{t('footer.locations')}</div>
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.services')}</h4>
            {services.map((item) => (
              <Link key={item.label} to={l(item.href)} className={styles.colLink}>{item.label}</Link>
            ))}
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.company')}</h4>
            {company.map((item) => (
              <Link key={item.label} to={l(item.href)} className={styles.colLink}>{item.label}</Link>
            ))}
          </div>

          <div>
            <h4 className={styles.colTitle}>{t('footer.connect')}</h4>
            {connect.map((item) => (
              <a key={item} href="#" className={styles.colLink}>{item}</a>
            ))}
          </div>
        </div>

        <div className={styles.fbar}>
          <span>{t('footer.copyright', { year })}</span>
          <div className={styles.legal}>
            <Link to={l('/privacy')}>{t('footer.privacy')}</Link>
            <span>.</span>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

