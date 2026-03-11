import { useTranslation } from 'react-i18next';
import NavSection from '../../page-shared/section-nav/section-nav';
import FooterSection from '../../page-shared/section-footer/section-footer';
import styles from './privacy-page.module.css';

const content = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last Updated: January 2026',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'DirectiveFilms ("the Company", "we", "our", or "us") is committed to protecting the privacy and security of the personal information provided by visitors, applicants, and users of our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
        ],
      },
      {
        title: '2. Information We Collect',
        paragraphs: [
          'We may collect personal information including but not limited to:',
        ],
        list: [
          'Full name',
          'Phone number',
          'Email address',
          'Employment or job application details',
          'Information submitted through contact forms, job applications, or inquiries',
        ],
        afterList: [
          'We may also automatically collect certain technical information such as IP address, browser type, device information, and general website usage analytics.',
        ],
      },
      {
        title: '3. How We Use Your Information',
        paragraphs: ['The information we collect may be used to:'],
        list: [
          'Communicate with job applicants and candidates',
          'Schedule interviews and provide reminders',
          'Provide updates regarding employment opportunities',
          'Respond to inquiries and provide support',
          'Improve our services, website functionality, and user experience',
        ],
      },
      {
        title: '4. SMS Communications',
        paragraphs: [
          'If you voluntarily provide your phone number to DirectiveFilms, you may receive SMS messages related to interview scheduling, interview reminders, and hiring process updates.',
          'Message frequency may vary. Standard message and data rates may apply.',
          'You may opt out of SMS communications at any time by replying STOP to any message. For assistance, reply HELP.',
          'Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.',
        ],
      },
      {
        title: '5. Information Sharing',
        paragraphs: [
          'DirectiveFilms does not sell, rent, or trade personal information to third parties. We may share information with trusted service providers that assist in operating our business, such as communication platforms, recruiting tools, or website hosting services. These providers are required to maintain the confidentiality and security of personal information.',
        ],
      },
      {
        title: '6. Data Security',
        paragraphs: [
          'We implement reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, disclosure, alteration, or destruction.',
        ],
      },
      {
        title: '7. Policy Updates',
        paragraphs: [
          'DirectiveFilms may update this Privacy Policy periodically. Any updates will be posted on our website with a revised effective date.',
        ],
      },
      {
        title: '8. Contact Information',
        paragraphs: [
          'If you have questions regarding this Privacy Policy or our data practices, please contact DirectiveFilms through the contact methods provided on our website.',
        ],
      },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour\u00a0: janvier 2026',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'DirectiveFilms (« la Société », « nous », « notre » ou « nos ») s\'engage à protéger la confidentialité et la sécurité des informations personnelles fournies par les visiteurs, les candidats et les utilisateurs de notre site Web et de nos services. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations.',
        ],
      },
      {
        title: '2. Informations que nous collectons',
        paragraphs: [
          'Nous pouvons collecter des informations personnelles, notamment\u00a0:',
        ],
        list: [
          'Nom complet',
          'Numéro de téléphone',
          'Adresse courriel',
          'Détails relatifs à l\'emploi ou à la candidature',
          'Informations soumises via des formulaires de contact, des candidatures ou des demandes de renseignements',
        ],
        afterList: [
          'Nous pouvons également collecter automatiquement certaines informations techniques telles que l\'adresse IP, le type de navigateur, les informations sur l\'appareil et les analyses générales d\'utilisation du site Web.',
        ],
      },
      {
        title: '3. Comment nous utilisons vos informations',
        paragraphs: [
          'Les informations que nous collectons peuvent être utilisées pour\u00a0:',
        ],
        list: [
          'Communiquer avec les candidats',
          'Planifier des entrevues et envoyer des rappels',
          'Fournir des mises à jour concernant les opportunités d\'emploi',
          'Répondre aux demandes et fournir de l\'assistance',
          'Améliorer nos services, les fonctionnalités du site Web et l\'expérience utilisateur',
        ],
      },
      {
        title: '4. Communications par SMS',
        paragraphs: [
          'Si vous fournissez volontairement votre numéro de téléphone à DirectiveFilms, vous pourriez recevoir des messages SMS relatifs à la planification d\'entrevues, aux rappels d\'entrevues et aux mises à jour du processus d\'embauche.',
          'La fréquence des messages peut varier. Des frais standard de messagerie et de données peuvent s\'appliquer.',
          'Vous pouvez vous désinscrire des communications par SMS à tout moment en répondant STOP à n\'importe quel message. Pour obtenir de l\'aide, répondez HELP.',
          'Les informations mobiles ne seront pas partagées avec des tiers ou des affiliés à des fins de marketing ou de promotion.',
        ],
      },
      {
        title: '5. Partage des informations',
        paragraphs: [
          'DirectiveFilms ne vend, ne loue et n\'échange pas les informations personnelles à des tiers. Nous pouvons partager des informations avec des fournisseurs de services de confiance qui nous aident à exploiter notre entreprise, tels que des plateformes de communication, des outils de recrutement ou des services d\'hébergement Web. Ces fournisseurs sont tenus de maintenir la confidentialité et la sécurité des informations personnelles.',
        ],
      },
      {
        title: '6. Sécurité des données',
        paragraphs: [
          'Nous mettons en œuvre des mesures de protection administratives, techniques et physiques raisonnables conçues pour protéger les informations personnelles contre tout accès, divulgation, altération ou destruction non autorisés.',
        ],
      },
      {
        title: '7. Mises à jour de la politique',
        paragraphs: [
          'DirectiveFilms peut mettre à jour cette politique de confidentialité périodiquement. Toute mise à jour sera publiée sur notre site Web avec une date d\'entrée en vigueur révisée.',
        ],
      },
      {
        title: '8. Coordonnées',
        paragraphs: [
          'Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez contacter DirectiveFilms via les méthodes de contact fournies sur notre site Web.',
        ],
      },
    ],
  },
};

type Section = {
  title: string;
  paragraphs: string[];
  list?: string[];
  afterList?: string[];
};

export default function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'fr' ? 'fr' : 'en') as keyof typeof content;
  const data = content[lang];

  return (
    <div className={styles.page}>
      <NavSection />
      <main className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.lastUpdated}>{data.lastUpdated}</p>
        </header>
        {data.sections.map((section: Section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.paragraphs.map((p: string, i: number) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
            {section.list && (
              <ul className={styles.list}>
                {section.list.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {section.afterList?.map((p: string, i: number) => (
              <p key={`after-${i}`} className={styles.paragraph}>{p}</p>
            ))}
          </section>
        ))}
      </main>
      <FooterSection />
    </div>
  );
}
