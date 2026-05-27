import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import frCommon from './locales/fr/common.json';
import homeEn from './locales/en/home.json';
import frHome from './locales/fr/home.json';
import aboutEn from './locales/en/about.json';
import frAbout from './locales/fr/about.json';
import servicesEn from './locales/en/services.json';
import frServices from './locales/fr/services.json';
import careersEn from './locales/en/careers.json';
import frCareers from './locales/fr/careers.json';
import contactEn from './locales/en/contact.json';
import frContact from './locales/fr/contact.json';

// Detect language synchronously from URL to prevent hydration flash
let initialLng = 'en';
if (typeof window !== 'undefined') {
    const pathParts = window.location.pathname.split('/');
    const langPart = pathParts[1];
    if (['en', 'fr'].includes(langPart)) {
        initialLng = langPart;
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: commonEn,
                home: homeEn,
                about: aboutEn,
                services: servicesEn,
                careers: careersEn,
                contact: contactEn
            },
            fr: {
                common: frCommon,
                home: frHome,
                about: frAbout,
                services: frServices,
                careers: frCareers
                ,
                contact: frContact
            },
        },
        lng: initialLng,
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'home', 'about', 'services', 'careers', 'contact'],
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        react: {
            useSuspense: false, // prevent hydration issues with nested async
            // `added` is fired on i18n.store (not i18n), so it needs bindI18nStore.
            // Without this, addResourceBundle calls from useCmsLocaleBundles
            // update the i18n store but don't trigger useTranslation re-renders.
            bindI18nStore: 'added removed',
        }
    });

export default i18n;
