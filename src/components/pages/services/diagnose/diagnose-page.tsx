import ServicePageLayout from '../service-page-layout';

export default function DiagnosePage() {
  return (
    <ServicePageLayout
      eyebrow="Online Presence Audit"
      title="See What's Really"
      titleHighlight="Happening"
      heroImage="/images/audit_landing_seciont_bg.png"
      subtitle="Your online presence is either opening doors or closing them. Find out which."
      ctaLabel="Book Your Audit"
      problemTitle="You can't improve what you can't see"
      problemText="Your website, socials, and messaging are sending a signal to every potential customer — and you might not know what that signal is. We look at all of it and tell you exactly what's helping, what's hurting, and what to do about it."
      solutionTitle="Full audit. Clear plan."
      solutionText="We go through your website, social profiles, messaging, and brand positioning. You get a report with everything ranked — what matters most, what to fix first, and how. Then we help you do it."
      process={[
        { number: '01', title: 'Discovery Call', description: 'We learn your business, goals, and where you think the gaps are.' },
        { number: '02', title: 'Deep Audit', description: 'We analyze your website, social profiles, messaging, SEO, and competitive landscape.' },
        { number: '03', title: 'Findings & Roadmap', description: 'You get a clear report with priorities ranked by impact and effort.' },
        { number: '04', title: 'Implementation Support', description: 'We help you execute on the roadmap — or handle it ourselves.' },
      ]}
      proofTitle="Clarity That Drives"
      proofTitleHighlight="Action"
      proofSubtitle="You'll know exactly where you stand and what to do next"
      proofItems={[
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>', title: 'Full Presence Scorecard', stat: '50+', statLabel: 'data points analyzed', description: 'A comprehensive audit covering your website, social profiles, messaging, SEO, and competitive landscape — nothing missed.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', title: 'Competitive Analysis', stat: '5-10', statLabel: 'competitors benchmarked', description: 'See exactly how you stack up against competitors — what they do better and where your biggest opportunities are.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', title: 'Prioritized Roadmap', stat: '90 days', statLabel: 'action plan', description: 'Every finding ranked by impact and effort. A clear 90-day roadmap so you know exactly what to fix first.' },
      ]}
      gallery={[
        { title: 'Brand Audit Report', category: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#3b82f6' },
        { title: 'Competitor Analysis', category: 'Research', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#8b5cf6' },
        { title: 'SEO Performance', category: 'Technical Audit', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#10b981' },
        { title: 'Social Media Review', category: 'Presence Audit', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', color: '#f59e0b' },
        { title: 'Content Strategy', category: 'Roadmap', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop', color: '#ef4444' },
      ]}
    />
  );
}
