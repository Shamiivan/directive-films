// Seeds the Directive CMS with realistic content via the cliHelpers + cms mutations.
// Idempotent: re-run safely (mutations are upsert-style or replace-style).
//
// Usage:  pnpm seed   (or)   node scripts/seed-cms.mjs

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { readFileSync } from "node:fs";

const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
const url = envText.match(/^VITE_CONVEX_URL=(.+)$/m)?.[1]?.trim();
if (!url) throw new Error("VITE_CONVEX_URL not found in .env.local");

const client = new ConvexHttpClient(url);

let nextId = 0;
const id = (prefix) => `${prefix}_${(++nextId).toString(36).padStart(4, "0")}`;
const L = (en, fr) => ({ en, fr: fr ?? en });
const heading = (level, en, fr) => ({ id: id("blk"), type: "heading", level, text: L(en, fr) });
const paragraph = (en, fr) => ({ id: id("blk"), type: "paragraph", body: L(en, fr) });
const button = (label, href, frLabel) => ({ id: id("blk"), type: "button", label: L(label, frLabel), href });
const quote = (en, fr, attribEn, attribFr) => ({
  id: id("blk"),
  type: "quote",
  text: L(en, fr),
  attribution: L(attribEn, attribFr),
});
const cardGrid = (cards) => ({
  id: id("blk"),
  type: "cardGrid",
  cards: cards.map((c) => ({ id: id("card"), ...c })),
});
const embedCollection = (collection, mode = "all", itemIds = []) => ({
  id: id("blk"),
  type: "embedCollection",
  collection,
  mode,
  itemIds,
});

const section = (type, label, blocks, extras = {}) => ({
  id: id("sec"),
  type,
  label,
  enabled: true,
  blocks,
  ...extras,
});

// ───────────────────────────────────────────────
// HOME PAGE
// ───────────────────────────────────────────────
const homeSections = [
  section("hero", "Hero", [
    heading(
      1,
      "Driven by Purpose. Defined by Excellence.",
      "Animés par un but. Définis par l'excellence.",
    ),
    paragraph(
      "Growth partner that turns content into revenue. We help ambitious brands build the system that closes deals — not just looks good doing it.",
      "Partenaire de croissance qui transforme le contenu en revenus. Nous aidons les marques ambitieuses à construire le système qui conclut des ventes — pas seulement à bien paraître.",
    ),
    button("See how it works", "/services", "Voir comment ça marche"),
  ]),

  section("content", "What We Do", [
    heading(2, "What we actually do", "Ce que nous faisons vraiment"),
    paragraph(
      "Five things. They're designed to connect, but you don't need all of them.",
      "Cinq choses. Conçues pour se compléter, mais vous n'avez pas besoin de toutes.",
    ),
    cardGrid([
      {
        title: L("Audit", "Audit"),
        description: L(
          "We look at your online presence and tell you what's actually working. Honest assessment, clear next steps.",
          "Nous analysons votre présence en ligne et vous disons ce qui fonctionne vraiment. Évaluation honnête, prochaines étapes claires.",
        ),
        href: "/services#audit",
      },
      {
        title: L("Coach", "Coach"),
        description: L(
          "We set up your team to make their own content. Studio, playbook, training. Then they're on their own.",
          "Nous équipons votre équipe pour créer son propre contenu. Studio, manuel, formation. Ensuite, à vous de jouer.",
        ),
        href: "/services#coaching",
      },
      {
        title: L("Create", "Créer"),
        description: L(
          "We make the videos. Scripted around how you actually sell.",
          "Nous produisons les vidéos. Scénarisées autour de votre façon de vendre.",
        ),
        href: "/services#video",
      },
      {
        title: L("Optimize", "Optimiser"),
        description: L(
          "We set up your CRM so leads don't fall through the cracks. Sequences, follow-ups, dashboards.",
          "Nous configurons votre CRM pour qu'aucun lead ne tombe entre les mailles. Séquences, relances, tableaux de bord.",
        ),
        href: "/services#crm",
      },
      {
        title: L("Build", "Construire"),
        description: L(
          "Websites that say what you do, load fast, and capture leads.",
          "Sites qui disent ce que vous faites, chargent vite et capturent les leads.",
        ),
        href: "/services#web",
      },
    ]),
  ]),

  section("content", "Process", [
    heading(2, "How we do it", "Comment nous procédons"),
    paragraph(
      "Audit, build, scale. Every engagement follows the same proven framework — so you know what's next, and so do we.",
      "Auditer, construire, mettre à l'échelle. Chaque mission suit le même cadre éprouvé — vous savez ce qui arrive, et nous aussi.",
    ),
    cardGrid([
      {
        title: L("01 — Audit", "01 — Audit"),
        description: L(
          "We start by listening. What are you selling? What's your site saying? Where do leads go after they show up?",
          "Nous commençons par écouter. Que vendez-vous? Que dit votre site? Où vont les leads une fois arrivés?",
        ),
      },
      {
        title: L("02 — Build", "02 — Construire"),
        description: L(
          "We make the things you need. The site, the videos, the CRM setup. One team, not five vendors.",
          "Nous créons ce dont vous avez besoin. Le site, les vidéos, la configuration CRM. Une équipe, pas cinq prestataires.",
        ),
      },
      {
        title: L("03 — Scale", "03 — Mise à l'échelle"),
        description: L(
          "We make sure it keeps working. Your team learns the system. Results get tracked. Things get better over time.",
          "Nous nous assurons que ça continue de fonctionner. Votre équipe apprend le système. Les résultats sont suivis. Tout s'améliore.",
        ),
      },
    ]),
  ]),

  section("collection", "Featured Projects",
    [heading(2, "Selected work", "Travaux sélectionnés")],
    { source: "projects", mode: "featured", itemIds: [] },
  ),

  section("content", "Testimonials", [
    heading(2, "What clients say", "Ce que disent nos clients"),
  ]),

  section("cta", "CTA", [
    heading(2, "Ready to drive real results?", "Prêt à obtenir de vrais résultats?"),
    paragraph(
      "Let's talk about turning your content into revenue. One conversation. No pitch deck.",
      "Parlons de transformer votre contenu en revenus. Une conversation. Pas de pitch deck.",
    ),
    button("Get in touch", "/contact", "Contactez-nous"),
  ]),
];

// ───────────────────────────────────────────────
// ABOUT PAGE
// ───────────────────────────────────────────────
const aboutSections = [
  section("hero", "Hero", [
    heading(1, "We came from sales. Not marketing school.", "Nous venons de la vente. Pas du marketing."),
    paragraph(
      "We know what it's like to lose a deal because your website didn't show how good you actually are. That's why we built this.",
      "Nous savons ce que c'est que de perdre une vente parce que votre site ne montrait pas à quel point vous êtes bons. C'est pourquoi nous avons créé ceci.",
    ),
    button("Let's talk", "/contact", "Parlons-en"),
  ]),

  section("content", "Principles", [
    heading(2, "Principles, not platitudes", "Des principes, pas des platitudes"),
    cardGrid([
      {
        title: L("Revenue is the metric.", "Le revenu est la mesure."),
        description: L(
          "If it doesn't help you close deals, we don't do it.",
          "Si ça n'aide pas à conclure des ventes, nous ne le faisons pas.",
        ),
      },
      {
        title: L("Audit before you build.", "Auditer avant de construire."),
        description: L(
          "We don't start building until we understand what's actually going on.",
          "Nous ne commençons pas à construire avant de comprendre ce qui se passe vraiment.",
        ),
      },
      {
        title: L("Systems beat one-offs.", "Les systèmes battent les coups uniques."),
        description: L(
          "A single video or landing page won't fix everything. We connect the pieces so they work together.",
          "Une seule vidéo ou page d'atterrissage ne réglera pas tout. Nous connectons les pièces pour qu'elles fonctionnent ensemble.",
        ),
      },
      {
        title: L(
          "Your team should get better, not more dependent.",
          "Votre équipe devrait s'améliorer, pas devenir plus dépendante.",
        ),
        description: L(
          "We set your team up to keep going without us.",
          "Nous équipons votre équipe pour continuer sans nous.",
        ),
      },
    ]),
  ]),

  section("collection", "Team",
    [heading(2, "The people behind the system", "Les personnes derrière le système")],
    { source: "teamMembers", mode: "all", itemIds: [] },
  ),
];

// ───────────────────────────────────────────────
// SERVICES PAGE
// ───────────────────────────────────────────────
const servicesSections = [
  section("hero", "Hero", [
    heading(1, "Five services. One system.", "Cinq services. Un système."),
    paragraph(
      "Each piece works alone. Together, they compound. Pick what you need — or get the full system.",
      "Chaque service fonctionne seul. Ensemble, ils se renforcent. Choisissez ce dont vous avez besoin — ou prenez le système complet.",
    ),
  ]),

  section("collection", "All Services",
    [],
    { source: "services", mode: "all", itemIds: [] },
  ),

  section("cta", "Talk to us", [
    heading(2, "Not sure where to start?", "Vous ne savez pas par où commencer?"),
    paragraph(
      "Book a call. We'll tell you what makes sense given where you are today.",
      "Réservez un appel. Nous vous dirons ce qui a du sens compte tenu de votre situation actuelle.",
    ),
    button("Book a call", "/contact", "Réserver un appel"),
  ]),
];

// ───────────────────────────────────────────────
// CONTACT PAGE
// ───────────────────────────────────────────────
const contactSections = [
  section("hero", "Hero", [
    heading(1, "Let's talk.", "Parlons."),
    paragraph(
      "Tell us what you're working on. We'll come back with what makes sense — or tell you we're not the right fit.",
      "Dites-nous ce sur quoi vous travaillez. Nous reviendrons avec ce qui a du sens — ou nous vous dirons que nous ne sommes pas le bon choix.",
    ),
  ]),

  section("content", "Reach Us", [
    heading(2, "Reach us directly", "Nous joindre directement"),
    paragraph(
      "Email hello@directivefilms.com or fill out the form. Either works — we read everything.",
      "Écrivez à hello@directivefilms.com ou remplissez le formulaire. L'un ou l'autre — nous lisons tout.",
    ),
  ]),
];

// ───────────────────────────────────────────────
// CAREERS PAGE
// ───────────────────────────────────────────────
const careersSections = [
  section("hero", "Hero", [
    heading(1, "Come build things that actually work.", "Venez construire des choses qui fonctionnent vraiment."),
    paragraph(
      "Small team. Real clients. Your work ships and you see the results.",
      "Petite équipe. Vrais clients. Votre travail est livré et vous voyez les résultats.",
    ),
    button("See open roles", "#positions", "Voir les postes"),
  ]),

  section("content", "Benefits", [
    heading(2, "What you'll get", "Ce que vous obtiendrez"),
    cardGrid([
      {
        title: L("Learn what actually works.", "Apprenez ce qui fonctionne vraiment."),
        description: L(
          "Sit in on client strategy sessions. Learn what converts and why. Understand how businesses actually grow.",
          "Participez aux sessions stratégiques avec les clients. Apprenez ce qui convertit et pourquoi. Comprenez comment les entreprises grandissent vraiment.",
        ),
      },
      {
        title: L("We move fast and pay well.", "Nous avançons vite et payons bien."),
        description: L(
          "Profitable company. Competitive pay. Respect for your time.",
          "Entreprise rentable. Salaire compétitif. Respect de votre temps.",
        ),
      },
      {
        title: L("Autonomy with accountability.", "Autonomie avec responsabilité."),
        description: L(
          "High performers earn flexibility. The standards don't change, only how you manage yourself does.",
          "Les meilleurs gagnent en flexibilité. Les standards ne changent pas, seule la façon dont vous vous gérez change.",
        ),
      },
      {
        title: L("Work directly with leadership.", "Travaillez directement avec la direction."),
        description: L(
          "Small team, flat structure. Alongside founders and senior creatives, not buried in a department.",
          "Petite équipe, structure horizontale. Aux côtés des fondateurs et des créatifs seniors, pas enterré dans un département.",
        ),
      },
    ]),
  ]),

  section("collection", "Open Positions",
    [heading(2, "Open positions", "Postes ouverts")],
    { source: "openPositions", mode: "all", itemIds: [] },
  ),
];

// ───────────────────────────────────────────────
// COLLECTIONS
// ───────────────────────────────────────────────
const projects = [
  {
    slug: "atlas",
    order: 1,
    isFeatured: true,
    year: "2026",
    title: L("Atlas — Made for builders", "Atlas — Conçu pour les bâtisseurs"),
    category: L("Brand film", "Film de marque"),
    client: L("Atlas Software, Inc.", "Atlas Software, Inc."),
    story: L(
      "A film about the builders shaping the next decade of infrastructure — quiet, deliberate, and built to last.",
      "Un film sur les bâtisseurs qui façonnent la prochaine décennie d'infrastructure — calme, délibéré et durable.",
    ),
    tags: ["Brand film", "B2B", "Technology"],
  },
  {
    slug: "ember",
    order: 2,
    isFeatured: true,
    year: "2025",
    title: L("Ember — A new standard", "Ember — Un nouveau standard"),
    category: L("Product launch", "Lancement produit"),
    client: L("Ember Labs", "Ember Labs"),
    story: L(
      "Launch film for a category-defining product. We turned engineering depth into a story buyers actually wanted to watch.",
      "Film de lancement pour un produit qui définit la catégorie. Nous avons transformé la profondeur technique en une histoire que les acheteurs voulaient vraiment regarder.",
    ),
    tags: ["Product launch", "Hardware", "Cinematic"],
  },
  {
    slug: "northwind",
    order: 3,
    isFeatured: true,
    year: "2025",
    title: L("Northwind — Built to last", "Northwind — Construit pour durer"),
    category: L("Case study", "Étude de cas"),
    client: L("Northwind Logistics", "Northwind Logistics"),
    story: L(
      "A multi-part case study series that compressed 12 years of customer wins into 90 seconds. Sales cycle dropped 32%.",
      "Une série d'études de cas multi-volets qui a condensé 12 ans de succès clients en 90 secondes. Cycle de vente réduit de 32%.",
    ),
    tags: ["Case study", "Series", "Logistics"],
  },
];

const services = [
  {
    slug: "audit",
    order: 1,
    isFeatured: true,
    name: L("Audit", "Audit"),
    summary: L(
      "We look at your online presence and tell you what's actually working.",
      "Nous analysons votre présence en ligne et vous disons ce qui fonctionne vraiment.",
    ),
    body: L(
      "Honest assessment of your website, content, and CRM. We tell you what to keep, what to kill, and what to build next. Delivered as a one-page action plan, not a 40-slide deck.",
      "Évaluation honnête de votre site, contenu et CRM. Nous vous disons ce qu'il faut garder, supprimer et construire. Livré sous forme de plan d'action d'une page.",
    ),
    ctaLabel: L("Book an audit", "Réserver un audit"),
    ctaHref: "/contact?service=audit",
  },
  {
    slug: "coach",
    order: 2,
    isFeatured: false,
    name: L("Coach", "Coach"),
    summary: L(
      "We set up your team to make their own content.",
      "Nous équipons votre équipe pour créer son propre contenu.",
    ),
    body: L(
      "Studio setup, playbook, monthly review. Your team owns the camera and the calendar. We make sure they don't waste either.",
      "Configuration studio, manuel, revue mensuelle. Votre équipe possède la caméra et le calendrier. Nous nous assurons qu'ils ne gaspillent ni l'un ni l'autre.",
    ),
    ctaLabel: L("Coach my team", "Former mon équipe"),
    ctaHref: "/contact?service=coach",
  },
  {
    slug: "create",
    order: 3,
    isFeatured: true,
    name: L("Create", "Créer"),
    summary: L(
      "We make the videos. Scripted around how you actually sell.",
      "Nous produisons les vidéos. Scénarisées autour de votre façon de vendre.",
    ),
    body: L(
      "Brand films, product launches, sales enablement. We script, shoot, edit, and version everything for the channels you actually use.",
      "Films de marque, lancements produits, soutien à la vente. Nous scénarisons, tournons, montons et versionnons tout pour les canaux que vous utilisez vraiment.",
    ),
    ctaLabel: L("See the work", "Voir les réalisations"),
    ctaHref: "/projects",
  },
  {
    slug: "optimize",
    order: 4,
    isFeatured: false,
    name: L("Optimize", "Optimiser"),
    summary: L(
      "We set up your CRM so leads don't fall through the cracks.",
      "Nous configurons votre CRM pour qu'aucun lead ne tombe entre les mailles.",
    ),
    body: L(
      "Sequences, follow-ups, dashboards. We connect your video, your site, and your sales team so the handoffs are clean and the numbers are visible.",
      "Séquences, relances, tableaux de bord. Nous connectons votre vidéo, votre site et votre équipe de vente pour des transmissions propres et des chiffres visibles.",
    ),
    ctaLabel: L("Audit my CRM", "Auditer mon CRM"),
    ctaHref: "/contact?service=optimize",
  },
  {
    slug: "build",
    order: 5,
    isFeatured: true,
    name: L("Build", "Construire"),
    summary: L(
      "Websites that say what you do, load fast, and capture leads.",
      "Sites qui disent ce que vous faites, chargent vite et capturent les leads.",
    ),
    body: L(
      "Marketing sites and landing pages designed around conversion. Built on a modern stack so editing copy doesn't require a developer.",
      "Sites marketing et pages d'atterrissage conçus pour la conversion. Construits sur une pile moderne — éditer du texte ne nécessite pas de développeur.",
    ),
    ctaLabel: L("Plan a build", "Planifier un projet"),
    ctaHref: "/contact?service=build",
  },
];

const teamMembers = [
  {
    slug: "shami-ivan",
    order: 1,
    name: "Shami Ivan",
    roleEn: "Founder · Strategy & Sales",
    roleFr: "Fondateur · Stratégie & Ventes",
    bioEn: "Spent a decade selling B2B before crossing over to fix the content side. Believes every video should have a P&L attached.",
    bioFr: "A passé une décennie à vendre en B2B avant de passer au contenu. Croit que chaque vidéo devrait avoir un compte de résultat attaché.",
  },
  {
    slug: "alex-chen",
    order: 2,
    name: "Alex Chen",
    roleEn: "Web & CRM Lead",
    roleFr: "Responsable Web & CRM",
    bioEn: "Builds the systems that turn website visitors into pipeline. Cares deeply about page-load time and lead-routing logic.",
    bioFr: "Construit les systèmes qui transforment les visiteurs en pipeline. Très attentif au temps de chargement et à la logique de routage.",
  },
  {
    slug: "maya-rouseff",
    order: 3,
    name: "Maya Rouseff",
    roleEn: "Creative Director",
    roleFr: "Directrice créative",
    bioEn: "Award-winning director who came up in commercial work. Translates strategy briefs into films that don't look like commercials.",
    bioFr: "Réalisatrice primée venue du commercial. Traduit les briefs stratégiques en films qui ne ressemblent pas à des publicités.",
  },
  {
    slug: "jordan-kim",
    order: 4,
    name: "Jordan Kim",
    roleEn: "Content Coach",
    roleFr: "Coach de contenu",
    bioEn: "Trains in-house teams to ship video without bottlenecking on outside production. Believes the best content is the most consistent.",
    bioFr: "Forme les équipes internes à livrer de la vidéo sans dépendre de la production externe. Croit que le meilleur contenu est le plus régulier.",
  },
];

const testimonials = [
  {
    slug: "sarah-mendez",
    order: 1,
    isFeatured: true,
    name: "Sarah Mendez",
    quote: L(
      "Directive rebuilt our entire content engine in 90 days. Pipeline doubled. The team finally has a system, not a chaos pile.",
      "Directive a refait tout notre moteur de contenu en 90 jours. Pipeline doublé. L'équipe a enfin un système, pas un tas chaotique.",
    ),
    roleEn: "VP Marketing",
    roleFr: "VP Marketing",
    companyEn: "Northwind Logistics",
    companyFr: "Northwind Logistics",
  },
  {
    slug: "raj-patel",
    order: 2,
    isFeatured: true,
    name: "Raj Patel",
    quote: L(
      "We'd worked with three agencies before. Directive was the first that asked about our sales process before they pitched anything.",
      "Nous avions travaillé avec trois agences avant. Directive a été la première à poser des questions sur notre processus de vente avant de proposer quoi que ce soit.",
    ),
    roleEn: "Co-founder",
    roleFr: "Co-fondateur",
    companyEn: "Ember Labs",
    companyFr: "Ember Labs",
  },
  {
    slug: "lina-cortez",
    order: 3,
    isFeatured: true,
    name: "Lina Cortez",
    quote: L(
      "The audit alone changed how we think about our website. The build that followed was the easiest agency engagement I've ever had.",
      "L'audit à lui seul a changé notre façon de voir notre site. Le projet qui a suivi a été l'engagement le plus facile que j'aie jamais eu.",
    ),
    roleEn: "Head of Growth",
    roleFr: "Responsable Croissance",
    companyEn: "Atlas Software",
    companyFr: "Atlas Software",
  },
];

const openPositions = [
  {
    slug: "video-editor",
    order: 1,
    isOpen: true,
    title: L("Video Editor", "Monteur vidéo"),
    location: L("Remote · Americas", "À distance · Amériques"),
    employmentType: L("Full-time", "Temps plein"),
    summary: L(
      "Transform raw footage into compelling sales-driven video content that converts viewers into customers.",
      "Transformez les rushes en contenu vidéo convaincant axé sur les ventes, qui convertit les spectateurs en clients.",
    ),
    responsibilities: [
      L("Edit video content for multiple platforms and use cases.", "Monter du contenu vidéo pour plusieurs plateformes."),
      L("Work with creative team to maintain brand consistency.", "Travailler avec l'équipe créative pour maintenir la cohérence de marque."),
      L("Optimize videos for conversion and engagement metrics.", "Optimiser les vidéos pour la conversion et l'engagement."),
    ],
    requirements: [
      L("3+ years of professional video editing experience.", "Plus de 3 ans d'expérience professionnelle en montage vidéo."),
      L("Expert in Premiere Pro, After Effects, or DaVinci Resolve.", "Expert en Premiere Pro, After Effects ou DaVinci Resolve."),
      L("Portfolio demonstrating commercial/marketing video work.", "Portfolio démontrant du travail commercial/marketing."),
    ],
  },
  {
    slug: "videographer",
    order: 2,
    isOpen: true,
    title: L("Videographer / Camera Operator", "Vidéaste / Cadreur"),
    location: L("Hybrid · NYC", "Hybride · NYC"),
    employmentType: L("Full-time", "Temps plein"),
    summary: L(
      "Capture high-quality footage that tells our clients' stories and drives their business growth.",
      "Capturez des images de haute qualité qui racontent les histoires de nos clients et stimulent leur croissance.",
    ),
    responsibilities: [
      L("Plan and execute video shoots for various clients and industries.", "Planifier et exécuter des tournages pour divers clients et industries."),
      L("Operate professional camera equipment, lighting, and audio gear.", "Opérer l'équipement professionnel : caméra, éclairage, son."),
    ],
    requirements: [
      L("3+ years of professional videography experience.", "Plus de 3 ans d'expérience en vidéographie."),
      L("Proficient with cinema cameras (RED, ARRI, Sony FX).", "Maîtrise des caméras cinéma (RED, ARRI, Sony FX)."),
    ],
  },
  {
    slug: "content-strategist",
    order: 3,
    isOpen: true,
    title: L("Content Strategist", "Stratège de contenu"),
    location: L("Remote · Worldwide", "À distance · Monde"),
    employmentType: L("Full-time", "Temps plein"),
    summary: L(
      "Map out video strategies that plug revenue leaks and turn prospects into paying customers.",
      "Cartographiez les stratégies vidéo qui colmatent les fuites de revenus.",
    ),
    responsibilities: [
      L("Analyze client sales processes to identify content opportunities.", "Analyser les processus de vente client pour identifier les opportunités."),
      L("Develop strategic video roadmaps aligned with business objectives.", "Développer des feuilles de route vidéo alignées sur les objectifs."),
    ],
    requirements: [
      L("3+ years in content strategy, marketing, or sales enablement.", "Plus de 3 ans en stratégie de contenu, marketing, ou soutien à la vente."),
      L("Deep understanding of sales funnels and customer journeys.", "Compréhension approfondie des entonnoirs de vente."),
    ],
  },
];

// ───────────────────────────────────────────────
// RUN
// ───────────────────────────────────────────────

async function main() {
  console.log(`→ Convex URL: ${url}`);

  console.log("→ bootstrapCms");
  await client.mutation(api.cms.bootstrapCms, {});

  console.log("→ rebuildHomePageDraft");
  await client.mutation(api.cliHelpers.rebuildHomePageDraft, {
    sections: homeSections,
    updatedBy: "seed",
  });

  console.log("→ replacePageSections (about)");
  await client.mutation(api.cliHelpers.replacePageSections, {
    slug: "about",
    sections: aboutSections,
    updatedBy: "seed",
  });

  console.log("→ replacePageSections (services)");
  await client.mutation(api.cliHelpers.replacePageSections, {
    slug: "services",
    sections: servicesSections,
    updatedBy: "seed",
  });

  console.log("→ replacePageSections (contact)");
  await client.mutation(api.cliHelpers.replacePageSections, {
    slug: "contact",
    sections: contactSections,
    updatedBy: "seed",
  });

  console.log("→ replacePageSections (careers)");
  await client.mutation(api.cliHelpers.replacePageSections, {
    slug: "careers",
    sections: careersSections,
    updatedBy: "seed",
  });

  console.log(`→ creating ${projects.length} projects`);
  for (const p of projects) {
    await client.mutation(api.cms.createProjectDraft, {
      slug: p.slug,
      order: p.order,
      draft: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        client: p.client,
        year: p.year,
        story: p.story,
        tags: p.tags,
        galleryImages: [],
        isFeatured: p.isFeatured,
      },
      updatedBy: "seed",
    });
  }

  console.log(`→ creating ${services.length} services`);
  for (const s of services) {
    await client.mutation(api.cms.createServiceDraft, {
      slug: s.slug,
      order: s.order,
      draft: {
        slug: s.slug,
        name: s.name,
        summary: s.summary,
        body: s.body,
        ctaLabel: s.ctaLabel,
        ctaHref: s.ctaHref,
        isFeatured: s.isFeatured,
      },
      updatedBy: "seed",
    });
  }

  console.log(`→ creating ${teamMembers.length} team members`);
  for (const t of teamMembers) {
    await client.mutation(api.cms.createTeamMemberDraft, {
      slug: t.slug,
      order: t.order,
      draft: {
        slug: t.slug,
        name: t.name,
        role: { en: t.roleEn, fr: t.roleFr },
        bio: { en: t.bioEn, fr: t.bioFr },
        order: t.order,
      },
      updatedBy: "seed",
    });
  }

  console.log(`→ creating ${testimonials.length} testimonials`);
  for (const t of testimonials) {
    await client.mutation(api.cms.createTestimonialDraft, {
      slug: t.slug,
      order: t.order,
      draft: {
        slug: t.slug,
        quote: t.quote,
        name: t.name,
        role: { en: t.roleEn, fr: t.roleFr },
        company: { en: t.companyEn, fr: t.companyFr },
        isFeatured: t.isFeatured,
        order: t.order,
      },
      updatedBy: "seed",
    });
  }

  console.log(`→ creating ${openPositions.length} open positions`);
  for (const p of openPositions) {
    await client.mutation(api.cms.createOpenPositionDraft, {
      slug: p.slug,
      order: p.order,
      draft: {
        slug: p.slug,
        title: p.title,
        location: p.location,
        employmentType: p.employmentType,
        summary: p.summary,
        responsibilities: p.responsibilities,
        requirements: p.requirements,
        isOpen: p.isOpen,
        order: p.order,
      },
      updatedBy: "seed",
    });
  }

  console.log("→ updateSiteSettingsContact");
  await client.mutation(api.cliHelpers.updateSiteSettingsContact, {
    brandName: "DirectiveFilms",
    contactEmail: "hello@directivefilms.com",
    contactPhone: "+1 (555) 010-2026",
    addressEn: "Brooklyn, NY · Remote-first across the Americas",
    addressFr: "Brooklyn, NY · Distant à travers les Amériques",
    instagram: "https://instagram.com/directivefilms",
    linkedin: "https://linkedin.com/company/directivefilms",
    youtube: "https://youtube.com/@directivefilms",
    vimeo: "https://vimeo.com/directivefilms",
    updatedBy: "seed",
  });

  const summary = await client.query(api.cliHelpers.listCliTargets, {});
  console.log("\n✓ Seed complete.");
  console.log("Pages:", summary.pages);
  console.log("Collections:", Object.fromEntries(
    Object.entries(summary.collections).map(([k, v]) => [k, v.length]),
  ));
}

main().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
