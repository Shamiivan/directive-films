import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, ListChecks, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CtaButton from '@/components/shared/cta-button/cta-button';
import styles from './section-audit-hero.module.css';

type PanelItem = {
  title: string;
  text: string;
};

export default function AuditHeroSection() {
  const [submitted, setSubmitted] = useState(false);
  // Audit-specific copy.
  const { t } = useTranslation('audit');
  // Reuse the existing contact intake form fields (name/email/revenue/needs/goal).
  const { t: tc } = useTranslation('contact');

  const needs = tc('hero.form.needs.options', { returnObjects: true }) as string[];
  const panelItems = t('hero.panel.items', { returnObjects: true }) as PanelItem[];
  const thanksSteps = t('hero.thanks.steps', { returnObjects: true }) as string[];
  const panelIcons = [TrendingDown, ListChecks, ShieldCheck];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(delivery): POST to a Vercel serverless fn using Resend (needs RESEND_API_KEY)
    // Collect the form fields and send the lead to hello@directivefilms.com.
    // The site is static (ssr:false/prerender) so this must be an external API route,
    // not a loader/action. No real email is wired yet.
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
            {submitted ? (
              <div className={styles.thanks} role="status" aria-live="polite">
                <div className={styles.thanksIco}>
                  <CheckCircle2 size={28} strokeWidth={1.5} />
                </div>
                <h2 className={styles.thanksTitle}>{t('hero.thanks.title')}</h2>
                <p className={styles.thanksBody}>{t('hero.thanks.body')}</p>
                <p className={styles.thanksNext}>{t('hero.thanks.next')}</p>
                <ol className={styles.thanksSteps}>
                  {thanksSteps.map((step, i) => (
                    <li key={step}>
                      <span className={styles.stepNum}>{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="audit-name">{tc('hero.form.fields.name.label')}</label>
                  <input
                    id="audit-name"
                    name="name"
                    type="text"
                    placeholder={tc('hero.form.fields.name.placeholder')}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="audit-email">{tc('hero.form.fields.email.label')}</label>
                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    placeholder={tc('hero.form.fields.email.placeholder')}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="audit-revenue">{tc('hero.form.fields.companyRevenue.label')}</label>
                  <input
                    id="audit-revenue"
                    name="companyRevenue"
                    type="text"
                    placeholder={tc('hero.form.fields.companyRevenue.placeholder')}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="audit-needs">{tc('hero.form.needs.label')}</label>
                  <select id="audit-needs" name="needs" defaultValue={needs[0]}>
                    {needs.map((need) => <option key={need}>{need}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="audit-goal">{tc('hero.form.fields.goal.label')}</label>
                  <textarea
                    id="audit-goal"
                    name="goal"
                    placeholder={tc('hero.form.fields.goal.placeholder')}
                  />
                </div>
                <CtaButton type="submit" fullWidth arrow={false}>
                  {t('hero.form.submit')}
                </CtaButton>
                <p className={styles.privacy}>{t('hero.form.privacy')}</p>
              </form>
            )}

            <aside className={styles.panel}>
              <h2 className={styles.panelHeading}>{t('hero.panel.heading')}</h2>
              {panelItems.map((item, index) => {
                const Icon = panelIcons[index] ?? ShieldCheck;
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
                <div className={styles.metricBig}>{t('hero.panel.metricBig')}</div>
                <div className={styles.metricCap}>{t('hero.panel.metricCap')}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
