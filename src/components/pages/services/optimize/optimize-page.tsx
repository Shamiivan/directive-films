import ServicePageLayout from '../service-page-layout';

export default function OptimizePage() {
  return (
    <ServicePageLayout
      eyebrow="CRM & Sales Systems"
      title="Turn Your Pipeline Into a"
      titleHighlight="Machine"
      subtitle="Your CRM should close deals, not just store contacts. We set it up so it actually does."
      ctaLabel="Fix Your Pipeline"
      problemTitle="Leads come in. Then what?"
      problemText="You're getting leads but the follow-up is inconsistent, manual, or just not happening. You can't see what's working. Deals that should close are slipping because nobody's keeping track properly."
      solutionTitle="A CRM that your team will actually use"
      solutionText="We set up your CRM, build sequences that get replies, automate the follow-ups, and give you dashboards so you can see what's happening. Then we train your team — because the best setup in the world is useless if nobody uses it."
      process={[
        { number: '01', title: 'Sales Process Audit', description: 'We look at how you sell now, where deals stall, and what to fix first.' },
        { number: '02', title: 'CRM Setup / Optimization', description: 'We build or rebuild your CRM to match how your team actually sells.' },
        { number: '03', title: 'Sequences & Automation', description: 'Automated follow-ups, nurture sequences, and deal-stage triggers that work.' },
        { number: '04', title: 'Team Training', description: 'Hands-on training so your team adopts the system and uses it daily.' },
      ]}
      proofTitle="A Pipeline That"
      proofTitleHighlight="Closes"
      proofSubtitle="Your sales team gets the systems, sequences, and visibility to convert consistently"
      proofItems={[
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>', title: 'CRM Built to Sell', stat: '2 weeks', statLabel: 'setup to launch', description: 'Your CRM configured to match how your team actually sells — not a generic template. HubSpot, Salesforce, or whatever fits.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: 'Automated Sequences', stat: '24/7', statLabel: 'follow-up coverage', description: 'Email and SMS sequences that nurture leads, handle follow-ups, and trigger at the right deal stage — automatically.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', title: 'Pipeline Dashboards', stat: '98%', statLabel: 'team adoption rate', description: 'Real-time visibility into what\'s working. Plus hands-on training so your team actually uses the system daily.' },
      ]}
      gallery={[
        { title: 'CRM Dashboard', category: 'Pipeline', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#3b82f6' },
        { title: 'Sales Automation', category: 'Sequences', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#8b5cf6' },
        { title: 'Team Onboarding', category: 'Training', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', color: '#10b981' },
        { title: 'Analytics Setup', category: 'Reporting', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#f59e0b' },
        { title: 'Lead Scoring', category: 'Qualification', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop', color: '#ef4444' },
      ]}
    />
  );
}
