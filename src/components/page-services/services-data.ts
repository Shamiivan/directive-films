export interface ServiceCard {
  id: string;
  name: string;
  outcome: string;
  description: string;
  image: string;
  ctaLabel: string;
}

export interface ServicePhase {
  phase: string;
  label: string;
  services: ServiceCard[];
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface ProofResult {
  clientType: string;
  problem: string;
  change: string;
  metric: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const servicePhases: ServicePhase[] = [
  {
    phase: 'Audit',
    label: 'See what\'s working and what isn\'t',
    services: [
      {
        id: 'audit',
        name: 'Online Presence Audit',
        outcome: 'A clear picture of what your online presence is telling potential customers.',
        description: 'We look at your site, content, and competitors across 50+ data points. You get a prioritized roadmap of what to fix first.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'competitor',
        name: 'Competitor Intelligence',
        outcome: 'Know what your competitors are doing and where they\'re vulnerable.',
        description: 'Analysis of 5-10 competitors covering SEO, content, ads, and conversion. You get the gaps they don\'t know they have.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'conversion',
        name: 'Conversion Mapping',
        outcome: 'Find where visitors drop off and why they don\'t convert.',
        description: 'Heatmaps, session recordings, and funnel analysis. We map every leak and prioritize what to fix first.',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
    ],
  },
  {
    phase: 'Build',
    label: 'Fix what needs fixing',
    services: [
      {
        id: 'video',
        name: 'Video Production',
        outcome: 'Videos that move deals forward, not just look good.',
        description: 'Scripts mapped to your sales process, 4K production, multi-platform delivery. Every frame earns its place.',
        image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'web',
        name: 'Web Development',
        outcome: 'A fast site that says what you do and captures leads.',
        description: 'Conversion-first copy, custom responsive build, fast load times, and 30 days of post-launch analytics.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'coaching',
        name: 'Content Coaching',
        outcome: 'Your team makes professional content every week, without hiring an agency.',
        description: 'In-house studio setup, hands-on training sessions, and repeatable templates. We give your team a playbook, then they\'re on their own.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
    ],
  },
  {
    phase: 'Grow',
    label: 'Scale what works',
    services: [
      {
        id: 'crm',
        name: 'CRM & Sales Systems',
        outcome: 'Your CRM closes deals instead of just storing contacts.',
        description: 'Setup matched to your sales process with automated follow-up sequences and pipeline dashboards.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'automation',
        name: 'Marketing Automation',
        outcome: 'Sequences that nurture leads based on real buyer behavior.',
        description: 'Email and SMS sequences triggered by what people actually do. Drip campaigns, re-engagement flows, and lead scoring.',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=500&fit=crop',
        ctaLabel: 'Learn More',
      },
      {
        id: 'analytics',
        name: 'Performance Dashboards',
        outcome: 'See what\'s working, what\'s not, and where to focus.',
        description: 'Custom dashboards connecting your site, CRM, ads, and content into one view. Metrics your team will actually use.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
        ctaLabel: 'Learn More',
      },
    ],
  },
];

export const methodSteps: MethodStep[] = [
  {
    number: '01',
    title: 'Assess',
    description: 'We look at what you have and what\'s not working.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We build the plan around your specific numbers.',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'We build, produce, and set up. You review and approve.',
  },
  {
    number: '04',
    title: 'Support',
    description: 'We train your team, monitor results, and iterate.',
  },
];

export const proofResults: ProofResult[] = [
  {
    clientType: 'B2B SaaS company',
    problem: 'Close rate stuck at 18%',
    change: 'Sales videos mapped to objections + CRM sequences',
    metric: 'Close rate: 18% to 34% in 3 months',
  },
  {
    clientType: 'Professional services firm',
    problem: 'Site traffic but zero leads',
    change: 'Full audit, new site, CRM rebuild',
    metric: 'Qualified leads tripled in 4 months',
  },
  {
    clientType: 'Growth-stage startup',
    problem: 'Disconnected tools, long sales cycle',
    change: 'New CRM + site + video outreach training',
    metric: 'Sales cycle reduced by 40%',
  },
];

// TODO: Replace with real client testimonials when available
export const testimonials: { quote: string; author: string; role: string }[] = [];

// TODO: Replace with verified stats when available
export const aggregateStats: { value: string; label: string }[] = [];

export const faqItems: FaqItem[] = [
  {
    question: 'Where should we start?',
    answer: "A quick call. We'll look at where you are, find the gaps, and tell you where to start. Most clients begin with an Audit. You need to know what's not working before you fix it.",
  },
  {
    question: 'Do we need all the services?',
    answer: "No. Most clients start with one or two and add as they grow. The services are designed to work together, but each one stands alone. We'll recommend what actually moves the needle.",
  },
  {
    question: 'What does pricing look like?',
    answer: "It depends on scope. An audit starts in the low four figures. Full production or CRM buildouts are higher. We'll give you a clear quote after our strategy call. No surprises, no hidden fees.",
  },
  {
    question: 'How fast will I see results?',
    answer: 'Sprint clients get a finished deliverable in two weeks. Monthly clients usually see real movement in 30-60 days.',
  },
  {
    question: 'Can you work with the tools I already have?',
    answer: "Yes. We plug into whatever CRM, platform, or setup you're already running. If you have a team that could be making content, our coaching gets them producing on their own.",
  },
  {
    question: 'How do we get started?',
    answer: "A 30-minute call. We listen to what you're working on and tell you what we'd focus on first. No deck, no pitch.",
  },
];
