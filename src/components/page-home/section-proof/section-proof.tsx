import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { isConvexConfigured } from '@/cms/convex';
import { useIsEditing } from '@/cms/EditModeProvider';
import { STATIC_COMPANY_LOGOS } from '@/cms/staticContent';
import styles from './section-proof.module.css';

type Logo = { src: string; alt: string };

export default function ProofSection() {
  const editMode = useIsEditing();
  const cmsLogos = !isConvexConfigured
    ? null
    : useQuery(editMode ? api.cms.listCompanyLogosDraft : api.cms.listPublishedCompanyLogos, {});

  const logos: Logo[] =
    cmsLogos && cmsLogos.length > 0
      ? cmsLogos
          .map((logo: any) => {
            const content = editMode ? logo.draft : logo.content;
            const image = content?.image ?? {};
            return { src: image.url || image.src || '', alt: image.alt?.en || content?.name || '' };
          })
          .filter((l: Logo) => Boolean(l.src))
      : STATIC_COMPANY_LOGOS.map((l) => ({ src: l.src, alt: l.name }));

  return (
    <div className={styles.trust}>
      <div className={styles.wrap}>
        <span className={styles.lbl}>A few of the 430+ we've worked with</span>
        {logos.map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt} className={styles.logo} />
        ))}
      </div>
    </div>
  );
}
