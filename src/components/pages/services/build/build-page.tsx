import ServicePageLayout from '../service-page-layout';

export default function BuildPage() {
  return (
    <ServicePageLayout
      eyebrow="Web Development"
      title="Your 24/7"
      titleHighlight="Salesperson"
      heroImage="/images/website_landing_bg.jpg"
      subtitle="Fast, conversion-focused websites that work while you sleep."
      ctaLabel="Build Your Site"
      problemTitle="Your website should be booking meetings"
      problemText="Most business websites look fine but don't do anything. No clear message, no way to capture a lead, no reason for someone to take action. Your site should be the first thing that convinces people to talk to you."
      solutionTitle="Built to convert, not just to look good"
      solutionText="We build fast sites with clear messaging, real lead capture, and a funnel that guides people to take action. When someone lands on your site, they know what you do and how to get in touch. Simple as that."
      process={[
        { number: '01', title: 'Messaging & Wireframe', description: 'We nail down your positioning and map out a conversion-focused page structure.' },
        { number: '02', title: 'Design', description: 'Clean, modern design that builds trust and guides visitors to action.' },
        { number: '03', title: 'Development', description: 'Fast, responsive, SEO-optimized code built on modern frameworks.' },
        { number: '04', title: 'Launch & Optimize', description: 'We launch, monitor analytics, and iterate to improve conversion rates.' },
      ]}
      proofTitle="Sites That Actually"
      proofTitleHighlight="Perform"
      proofSubtitle="Every site we build is engineered to convert visitors into customers"
      proofItems={[
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', title: 'Conversion-First Copy', stat: '3x', statLabel: 'avg lead increase', description: 'Messaging and copy engineered to guide visitors from curiosity to action. No filler — every word earns its place.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', title: 'Custom Responsive Design', stat: '<1s', statLabel: 'load time target', description: 'Pixel-perfect on every device. Fast, clean, modern — built to look premium and load instantly.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: 'Analytics & Optimization', stat: '30 days', statLabel: 'post-launch support', description: 'Full tracking setup from day one. We monitor, test, and iterate so your conversion rate keeps climbing.' },
      ]}
      gallery={[
        { title: 'SaaS Platform Redesign', category: 'Web App', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', color: '#3b82f6' },
        { title: 'E-commerce Store', category: 'Shopify Build', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', color: '#8b5cf6' },
        { title: 'Real Estate Portal', category: 'Custom Platform', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', color: '#10b981' },
        { title: 'Fintech Dashboard', category: 'Web Application', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', color: '#f59e0b' },
        { title: 'Healthcare Portal', category: 'Patient Platform', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', color: '#ef4444' },
        { title: 'Restaurant Chain', category: 'Brand Website', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', color: '#06b6d4' },
      ]}
    />
  );
}
