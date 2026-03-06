export interface ServiceCard {
  id: string;
  name: string;
  outcome: string;
  description: string;
  image: string;
  proof: string;
  timeline: string;
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
  deliverable: string;
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
    phase: 'Diagnose',
    label: 'Find the gaps',
    services: [
      {
        id: 'audit',
        name: 'Online Presence Audit',
        outcome: 'See exactly what your online presence is telling potential customers.',
        description: 'Full-presence scorecard across 50+ data points with competitive benchmarking and a prioritized 90-day roadmap. Built for teams who get traffic but not leads.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        proof: 'Clients who act on the roadmap see 3x more qualified leads within 4 months.',
        timeline: '1-2 weeks',
        ctaLabel: 'Book Your Audit',
      },
    ],
  },
  {
    phase: 'Build',
    label: 'Fix what\'s broken',
    services: [
      {
        id: 'video',
        name: 'Video Production',
        outcome: 'Cinematic video scripted around your sales process.',
        description: 'Sales-process-mapped scripts, 4K cinematic production, and multi-platform delivery in 5+ formats. Every frame earns its place in your pipeline.',
        image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&h=500&fit=crop',
        proof: 'Average close rate increase of 16 points within three months of deployment.',
        timeline: '2-3 weeks',
        ctaLabel: 'Start a Project',
      },
      {
        id: 'web',
        name: 'Web Development',
        outcome: 'Fast, conversion-focused websites that work while you sleep.',
        description: 'Conversion-first copy, custom responsive build under 1-second load, and 30 days of post-launch analytics. For sites that look fine but don\'t book meetings.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        proof: '3x average lead increase within 30 days of launch.',
        timeline: '3-4 weeks',
        ctaLabel: 'Build Your Site',
      },
      {
        id: 'coaching',
        name: 'Content Coaching',
        outcome: 'Your team learns to make professional content every week.',
        description: 'In-house studio setup, 4 hands-on training sessions, and 12+ repeatable templates. Stop hiring agencies for every post.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
        proof: 'Teams produce 4x more content per month within 6 weeks of coaching.',
        timeline: '4-6 weeks',
        ctaLabel: 'Start Coaching',
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
        description: 'CRM setup matched to your sales process with automated follow-up sequences and pipeline dashboards. No more deals slipping through the cracks.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop',
        proof: '98% team adoption rate. Average sales cycle reduced by 40%.',
        timeline: '2 weeks',
        ctaLabel: 'Fix Your Pipeline',
      },
    ],
  },
];

export const methodSteps: MethodStep[] = [
  {
    number: '01',
    title: 'Assess',
    description: 'We look at what you have and what\'s not working.',
    deliverable: 'Audit + gap analysis',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We build the plan around your specific numbers.',
    deliverable: 'Roadmap + timeline',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'We build, produce, and set up. You review and approve.',
    deliverable: 'The actual work',
  },
  {
    number: '04',
    title: 'Support',
    description: 'We train your team, monitor results, and iterate.',
    deliverable: 'Handoff + 30-day support',
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

export const testimonials = [
  {
    quote: 'Our close rate went from 18% to 34% in three months. They made the videos, plugged them into our sales process, and it just started working.',
    author: 'Sarah Chen',
    role: 'VP of Sales, TechCorp',
  },
  {
    quote: 'They looked at everything — site, CRM, content — told us what to fix first, then actually fixed it. Qualified leads tripled in four months.',
    author: 'Michael Rodriguez',
    role: 'CEO, GrowthLabs',
  },
  {
    quote: 'New CRM, new site, trained our sales team on video outreach. For the first time everything\'s connected and our sales cycle dropped by 40%.',
    author: 'Emily Watson',
    role: 'CMO, Scale Ventures',
  },
];

export const aggregateStats = [
  { value: '98%', label: 'client retention' },
  { value: '$50M+', label: 'revenue generated' },
  { value: '500+', label: 'projects delivered' },
];

export const faqItems: FaqItem[] = [
  {
    question: 'Where should we start?',
    answer: "Book a strategy call. We'll look at where you are, where the gaps are, and recommend the right starting point. Most clients start with Diagnose — because you need to know what's broken before you fix it.",
  },
  {
    question: 'Do we need all five services?',
    answer: "No. Most clients start with one or two and add as they grow. The five services are designed to work together, but each one stands alone. We'll recommend what actually moves the needle.",
  },
  {
    question: 'What does pricing look like?',
    answer: "It depends on scope. An audit starts in the low four figures. Full production or CRM buildouts are higher. We'll give you a clear quote after our strategy call — no surprises, no hidden fees.",
  },
  {
    question: 'How long does each service take?',
    answer: 'Audits take 1-2 weeks. Video production averages 2-3 weeks. CRM setup is typically 2 weeks. Coaching runs 4-6 weeks. Web builds are 3-4 weeks. We move fast without cutting corners.',
  },
];
