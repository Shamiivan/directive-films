import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Globe, Mail, Phone, Zap } from 'lucide-react';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-contact-hero.module.css';

type ContactInfo = {
  title: string;
  text: string;
  href?: string;
};

export default function ContactHeroSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation('contact');
  const needs = t('hero.form.needs.options', { returnObjects: true }) as string[];
  const info = t('hero.infoCards', { returnObjects: true }) as ContactInfo[];
  const icons = [MapPin, Globe, Mail, Phone, Zap];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Contact",
          name: formData.get("name"),
          email: formData.get("email"),
          companyRevenue: formData.get("companyRevenue"),
          needs: formData.get("needs"),
          goal: formData.get("goal"),
          page: window.location.href,
        }),
      });

      if (!response.ok) {
        setError(t('hero.form.error'));
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t('hero.form.error'));
    } finally {
      setSubmitting(false);
    }
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
                <label htmlFor="contact-name">{t('hero.form.fields.name.label')}</label>
                <input id="contact-name" name="name" type="text" placeholder={t('hero.form.fields.name.placeholder')} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">{t('hero.form.fields.email.label')}</label>
                <input id="contact-email" name="email" type="email" placeholder={t('hero.form.fields.email.placeholder')} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-revenue">{t('hero.form.fields.companyRevenue.label')}</label>
                <input id="contact-revenue" name="companyRevenue" type="text" placeholder={t('hero.form.fields.companyRevenue.placeholder')} />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-needs">{t('hero.form.needs.label')}</label>
                <select id="contact-needs" name="needs" defaultValue={needs[0]}>
                  {needs.map((need) => <option key={need}>{need}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-goal">{t('hero.form.fields.goal.label')}</label>
                <textarea id="contact-goal" name="goal" placeholder={t('hero.form.fields.goal.placeholder')} />
              </div>
              <CtaButton type="submit" fullWidth arrow={false} disabled={submitting || submitted}>
                {submitted ? t('hero.form.submitted') : submitting ? t('hero.form.submitting') : t('hero.form.submit')}
              </CtaButton>
              {error ? <p className={styles.error} role="alert">{error}</p> : null}
            </form>

            <div>
              {info.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div className={styles.item} key={item.title}>
                    <div className={styles.ico}><Icon size={20} strokeWidth={1.5} /></div>
                    <div>
                      <h3>
                        {item.href ? <a href={item.href}>{item.title}</a> : item.title}
                      </h3>
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
