import { useTranslation } from 'react-i18next';
import { useLocalePath } from '../../../hooks/useLocalePath';
import MediaHero from '@/components/shared/media-hero/media-hero';

export default function ServicesHeroSection() {
  const { t } = useTranslation('services');
  const l = useLocalePath();

  return (
    <MediaHero
      eyebrow={t('hero.label')}
      title={
        <>
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2')} <em>{t('hero.accent')}</em>
        </>
      }
      lede={t('hero.description')}
      ctaHref={l('/audit')}
      ctaLabel="Get your free growth audit"
    />
  );
}
