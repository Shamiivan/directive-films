export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProofItem {
  icon: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
}

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  color: string;
}

export interface ServiceData {
  id: string;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaLabel: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  process: ProcessStep[];
  proofItems: ProofItem[];
  gallery: GalleryItem[];
}

export const services: ServiceData[] = [
  {
    id: 'diagnose',
    eyebrow: 'Online Presence Audit',
    title: "See What's Really",
    titleHighlight: 'Happening',
    subtitle: 'Your online presence is either opening doors or closing them. Find out which.',
    ctaLabel: 'Book Your Audit',
    problemTitle: "You can't improve what you can't see",
    problemText: "Your website, socials, and messaging are sending a signal to every potential customer — and you might not know what that signal is. We look at all of it and tell you exactly what's helping, what's hurting, and what to do about it.",
    solutionTitle: 'Full audit. Clear plan.',
    solutionText: "We go through your website, social profiles, messaging, and brand positioning. You get a report with everything ranked — what matters most, what to fix first, and how. Then we help you do it.",
    process: [
      { number: '01', title: 'Discovery Call', description: 'We learn your business, goals, and where you think the gaps are.' },
      { number: '02', title: 'Deep Audit', description: 'We analyze your website, social profiles, messaging, SEO, and competitive landscape.' },
      { number: '03', title: 'Findings & Roadmap', description: 'You get a clear report with priorities ranked by impact and effort.' },
      { number: '04', title: 'Implementation Support', description: 'We help you execute on the roadmap — or handle it ourselves.' },
    ],
    proofItems: [
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', title: 'Full Presence Scorecard', stat: '50+', statLabel: 'data points analyzed', description: 'A comprehensive audit covering your website, social profiles, messaging, SEO, and competitive landscape — nothing missed.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', title: 'Competitive Analysis', stat: '5-10', statLabel: 'competitors benchmarked', description: 'See exactly how you stack up against competitors — what they do better and where your biggest opportunities are.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', title: 'Prioritized Roadmap', stat: '90 days', statLabel: 'action plan', description: 'Every finding ranked by impact and effort. A clear 90-day roadmap so you know exactly what to fix first.' },
    ],
    gallery: [
      { title: 'Brand Audit Report', category: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#3b82f6' },
      { title: 'Competitor Analysis', category: 'Research', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#8b5cf6' },
      { title: 'SEO Performance', category: 'Technical Audit', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#10b981' },
      { title: 'Social Media Review', category: 'Presence Audit', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', color: '#f59e0b' },
      { title: 'Content Strategy', category: 'Roadmap', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop', color: '#ef4444' },
    ],
  },
  {
    id: 'coach',
    eyebrow: 'Film & Content Setup Coaching',
    title: 'Build Your Content',
    titleHighlight: 'Engine',
    subtitle: 'Your team knows the business. We teach them to make the content.',
    ctaLabel: 'Start Coaching',
    problemTitle: 'Your team can do this themselves',
    problemText: "You have people who know your industry, your customers, and your product better than anyone. They just need the right setup, some training, and a repeatable process to start making professional content every week.",
    solutionTitle: 'Studio. Skills. Playbook.',
    solutionText: "We set up your in-house studio, train your team hands-on, and give them a process they can repeat. The more they do it, the better and faster they get. That's the whole point.",
    process: [
      { number: '01', title: 'Assess Current Setup', description: 'We evaluate your team, space, equipment, and content goals.' },
      { number: '02', title: 'Equipment & Space Setup', description: 'We spec and set up your studio — lighting, cameras, audio, backdrop.' },
      { number: '03', title: 'Hands-On Training', description: 'Your team learns filming, editing, and content frameworks in practice sessions.' },
      { number: '04', title: 'Ongoing Support', description: 'We stay available for review, feedback, and advanced coaching as you scale.' },
    ],
    proofItems: [
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>', title: 'Full Studio Setup', stat: '1 week', statLabel: 'setup time', description: 'Custom studio spec, equipment procurement, and physical setup — lighting, cameras, audio, backdrop. Ready to shoot.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Hands-On Training', stat: '4 sessions', statLabel: 'intensive coaching', description: 'Your team learns filming, editing, and content frameworks through real practice — not theory slides.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>', title: 'Content Playbooks', stat: '12+', statLabel: 'templates included', description: 'Brand-specific video templates, content calendar framework, and editing workflows your team can repeat forever.' },
    ],
    gallery: [
      { title: 'Studio Setup', category: 'Equipment', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', color: '#3b82f6' },
      { title: 'Team Training', category: 'Workshop', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', color: '#8b5cf6' },
      { title: 'Content Creation', category: 'In-House', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop', color: '#10b981' },
      { title: 'Lighting Setup', category: 'Production', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop', color: '#f59e0b' },
      { title: 'Editing Workflow', category: 'Post-Production', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop', color: '#ef4444' },
    ],
  },
  {
    id: 'create',
    eyebrow: 'Video Production',
    title: 'Content That',
    titleHighlight: 'Converts',
    subtitle: 'Cinematic production built around your sales process. Every frame earns its place.',
    ctaLabel: 'Start a Project',
    problemTitle: 'Video that actually does something',
    problemText: "Good-looking video is easy to make. Video that helps you close deals is harder. It has to say the right thing, to the right person, at the right time in their buying decision. That's what we make.",
    solutionTitle: 'Scripted to sell, produced to impress',
    solutionText: "We figure out where video fits in your sales process, write scripts around the objections your buyers actually have, and produce it at a level that commands attention. You know exactly what each piece is for.",
    process: [
      { number: '01', title: 'Sales Process Mapping', description: 'We identify the exact moments in your pipeline where video will close gaps.' },
      { number: '02', title: 'Strategic Scripting', description: 'Scripts built on proven sales frameworks — hitting pain points and handling objections.' },
      { number: '03', title: 'Production', description: 'Professional filming, lighting, and direction. We handle every detail on set.' },
      { number: '04', title: 'Optimization', description: 'Editing, color grading, and delivery optimized for each platform and use case.' },
    ],
    proofItems: [
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', title: 'Full Production', stat: '4K+', statLabel: 'cinematic quality', description: 'Professional crew, equipment, lighting, and direction. We handle every detail on set so you can focus on your business.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: 'Fast Turnaround', stat: '2 weeks', statLabel: 'avg delivery', description: 'From script to final cut in days, not months. Fast turnarounds without compromising a frame of quality.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>', title: 'Multi-Platform Delivery', stat: '5+', statLabel: 'formats per project', description: 'Every video delivered in optimized formats for web, social, ads, email, and sales decks. Maximum reach from one shoot.' },
    ],
    gallery: [
      { title: 'Tech Startup Launch', category: 'Brand Story', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop', color: '#3b82f6' },
      { title: 'E-commerce Growth', category: 'Product Showcase', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop', color: '#8b5cf6' },
      { title: 'Healthcare Innovation', category: 'Explainer Video', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', color: '#10b981' },
      { title: 'Financial Services', category: 'Client Testimonial', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop', color: '#f59e0b' },
      { title: 'SaaS Platform', category: 'Demo Video', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#06b6d4' },
      { title: 'Manufacturing', category: 'Process Video', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop', color: '#ef4444' },
    ],
  },
  {
    id: 'build',
    eyebrow: 'Web Development',
    title: 'Your 24/7',
    titleHighlight: 'Salesperson',
    subtitle: 'Fast, conversion-focused websites that work while you sleep.',
    ctaLabel: 'Build Your Site',
    problemTitle: 'Your website should be booking meetings',
    problemText: "Most business websites look fine but don't do anything. No clear message, no way to capture a lead, no reason for someone to take action. Your site should be the first thing that convinces people to talk to you.",
    solutionTitle: 'Built to convert, not just to look good',
    solutionText: "We build fast sites with clear messaging, real lead capture, and a funnel that guides people to take action. When someone lands on your site, they know what you do and how to get in touch. Simple as that.",
    process: [
      { number: '01', title: 'Messaging & Wireframe', description: 'We nail down your positioning and map out a conversion-focused page structure.' },
      { number: '02', title: 'Design', description: 'Clean, modern design that builds trust and guides visitors to action.' },
      { number: '03', title: 'Development', description: 'Fast, responsive, SEO-optimized code built on modern frameworks.' },
      { number: '04', title: 'Launch & Optimize', description: 'We launch, monitor analytics, and iterate to improve conversion rates.' },
    ],
    proofItems: [
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', title: 'Conversion-First Copy', stat: '3x', statLabel: 'avg lead increase', description: 'Messaging and copy engineered to guide visitors from curiosity to action. No filler — every word earns its place.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', title: 'Custom Responsive Design', stat: '<1s', statLabel: 'load time target', description: 'Pixel-perfect on every device. Fast, clean, modern — built to look premium and load instantly.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: 'Analytics & Optimization', stat: '30 days', statLabel: 'post-launch support', description: 'Full tracking setup from day one. We monitor, test, and iterate so your conversion rate keeps climbing.' },
    ],
    gallery: [
      { title: 'SaaS Platform Redesign', category: 'Web App', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#3b82f6' },
      { title: 'E-commerce Store', category: 'Shopify Build', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', color: '#8b5cf6' },
      { title: 'Real Estate Portal', category: 'Custom Platform', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', color: '#10b981' },
      { title: 'Fintech Dashboard', category: 'Web Application', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#f59e0b' },
      { title: 'Healthcare Portal', category: 'Patient Platform', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', color: '#ef4444' },
      { title: 'Restaurant Chain', category: 'Brand Website', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', color: '#06b6d4' },
    ],
  },
  {
    id: 'optimize',
    eyebrow: 'CRM & Sales Systems',
    title: 'Turn Your Pipeline Into a',
    titleHighlight: 'Machine',
    subtitle: 'Your CRM should close deals, not just store contacts. We set it up so it actually does.',
    ctaLabel: 'Fix Your Pipeline',
    problemTitle: 'Leads come in. Then what?',
    problemText: "You're getting leads but the follow-up is inconsistent, manual, or just not happening. You can't see what's working. Deals that should close are slipping because nobody's keeping track properly.",
    solutionTitle: 'A CRM that your team will actually use',
    solutionText: "We set up your CRM, build sequences that get replies, automate the follow-ups, and give you dashboards so you can see what's happening. Then we train your team — because the best setup in the world is useless if nobody uses it.",
    process: [
      { number: '01', title: 'Sales Process Audit', description: 'We look at how you sell now, where deals stall, and what to fix first.' },
      { number: '02', title: 'CRM Setup / Optimization', description: 'We build or rebuild your CRM to match how your team actually sells.' },
      { number: '03', title: 'Sequences & Automation', description: 'Automated follow-ups, nurture sequences, and deal-stage triggers that work.' },
      { number: '04', title: 'Team Training', description: 'Hands-on training so your team adopts the system and uses it daily.' },
    ],
    proofItems: [
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>', title: 'CRM Built to Sell', stat: '2 weeks', statLabel: 'setup to launch', description: "Your CRM configured to match how your team actually sells — not a generic template. HubSpot, Salesforce, or whatever fits." },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: 'Automated Sequences', stat: '24/7', statLabel: 'follow-up coverage', description: 'Email and SMS sequences that nurture leads, handle follow-ups, and trigger at the right deal stage — automatically.' },
      { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: 'Pipeline Dashboards', stat: '98%', statLabel: 'team adoption rate', description: "Real-time visibility into what's working. Plus hands-on training so your team actually uses the system daily." },
    ],
    gallery: [
      { title: 'CRM Dashboard', category: 'Pipeline', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#3b82f6' },
      { title: 'Sales Automation', category: 'Sequences', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#8b5cf6' },
      { title: 'Team Onboarding', category: 'Training', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', color: '#10b981' },
      { title: 'Analytics Setup', category: 'Reporting', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#f59e0b' },
      { title: 'Lead Scoring', category: 'Qualification', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop', color: '#ef4444' },
    ],
  },
];
