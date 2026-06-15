import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Globe, Mail, Zap } from 'lucide-react';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-contact-hero.module.css';

type ContactInfo = {
  title: string;
  text: string;
};

export default function ContactHeroSection() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation('contact');
  const needs = t('hero.form.needs.options', { returnObjects: true }) as string[];
  const info = t('hero.infoCards', { returnObjects: true }) as ContactInfo[];
  const icons = [MapPin, Globe, Mail, Zap];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className={styles.banner}>
        <div className={styles.wrap}>
          <h1 className={styles.heading}>
            {t('hero.titleLine1')}<br />
            {t('hero.titleLine2')} <span className={styles.serifIt}>{t('hero.accent')}</span>
          </h1>
          <p className={styles.lead}>{t('hero.description')}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.grid}>
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>{t('hero.form.fields.name.label')}</label>
                <input type="text" placeholder={t('hero.form.fields.name.placeholder')} required />
              </div>
              <div className={styles.field}>
                <label>{t('hero.form.fields.email.label')}</label>
                <input type="email" placeholder={t('hero.form.fields.email.placeholder')} required />
              </div>
              <div className={styles.field}>
                <label>{t('hero.form.fields.companyRevenue.label')}</label>
                <input type="text" placeholder={t('hero.form.fields.companyRevenue.placeholder')} />
              </div>
              <div className={styles.field}>
                <label>{t('hero.form.needs.label')}</label>
                <select>
                  {needs.map((need) => <option key={need}>{need}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>{t('hero.form.fields.goal.label')}</label>
                <textarea placeholder={t('hero.form.fields.goal.placeholder')} />
              </div>
              <CtaButton type="submit" fullWidth arrow={false}>
                {submitted ? t('hero.form.submitted') : t('hero.form.submit')}
              </CtaButton>
            </form>

            <div>
              {info.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div className={styles.item} key={item.title}>
                    <div className={styles.ico}><Icon size={20} strokeWidth={1.5} /></div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}

              <div className={styles.metricCard}>
                <div className={styles.metricBig}>$100M+</div>
                <div className={styles.metricCap}>{t('hero.metric')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
