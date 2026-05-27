import aboutEn from "../locales/en/about.json";
import careersEn from "../locales/en/careers.json";
import contactEn from "../locales/en/contact.json";
import homeEn from "../locales/en/home.json";
import servicesEn from "../locales/en/services.json";
import aboutFr from "../locales/fr/about.json";
import careersFr from "../locales/fr/careers.json";
import contactFr from "../locales/fr/contact.json";
import homeFr from "../locales/fr/home.json";
import servicesFr from "../locales/fr/services.json";

export const STATIC_LOCALE_BUNDLES = {
  en: {
    home: homeEn,
    about: aboutEn,
    services: servicesEn,
    contact: contactEn,
    careers: careersEn,
  },
  fr: {
    home: homeFr,
    about: aboutFr,
    services: servicesFr,
    contact: contactFr,
    careers: careersFr,
  },
} as const;

export const STATIC_COMPANY_LOGOS = [
  { slug: "momentum", name: "Momentum", src: "/logos/momentum.svg" },
  { slug: "amazon", name: "Amazon", src: "/logos/amazon.svg" },
  { slug: "rogers", name: "Rogers", src: "/logos/rogers.svg" },
  { slug: "shopify", name: "Shopify", src: "/logos/shopify.svg" },
  { slug: "telus", name: "Telus", src: "/logos/telus.svg" },
  { slug: "altitude", name: "Altitude", src: "/logos/altitude.png" },
] as const;

export const STATIC_HOME_STRIP_IMAGES = [
  { src: "/images/strip/1-camera-setup.jpg", alt: "Professional cinema camera setup" },
  { src: "/images/strip/2-outdoor-crew.jpg", alt: "Film crew on outdoor set" },
  { src: "/images/strip/3-silhouette.jpg", alt: "Cinematographer silhouette" },
  { src: "/images/strip/4-adjusting-camera.jpg", alt: "Adjusting video camera" },
  { src: "/images/strip/5-filming-band.jpg", alt: "Filming live performance" },
  { src: "/images/strip/6-red-camera-street.jpg", alt: "RED camera street shoot" },
  { src: "/images/strip/7-woman-camera.jpg", alt: "Camera operator at work" },
  { src: "/images/strip/8-night-filming.jpg", alt: "Night event filming" },
] as const;
