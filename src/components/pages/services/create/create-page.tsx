import ServicePageLayout from '../service-page-layout';

export default function CreatePage() {
  return (
    <ServicePageLayout
      eyebrow="Video Production"
      title="Content That"
      titleHighlight="Converts"
      heroImage="/images/production.jpg"
      subtitle="Cinematic production built around your sales process. Every frame earns its place."
      ctaLabel="Start a Project"
      problemTitle="Video that actually does something"
      problemText="Good-looking video is easy to make. Video that helps you close deals is harder. It has to say the right thing, to the right person, at the right time in their buying decision. That's what we make."
      solutionTitle="Scripted to sell, produced to impress"
      solutionText="We figure out where video fits in your sales process, write scripts around the objections your buyers actually have, and produce it at a level that commands attention. You know exactly what each piece is for."
      process={[
        { number: '01', title: 'Sales Process Mapping', description: 'We identify the exact moments in your pipeline where video will close gaps.' },
        { number: '02', title: 'Strategic Scripting', description: 'Scripts built on proven sales frameworks — hitting pain points and handling objections.' },
        { number: '03', title: 'Production', description: 'Professional filming, lighting, and direction. We handle every detail on set.' },
        { number: '04', title: 'Optimization', description: 'Editing, color grading, and delivery optimized for each platform and use case.' },
      ]}
      proofTitle="Videos That Drive"
      proofTitleHighlight="Revenue"
      proofSubtitle="Every piece maps to a stage in your pipeline so you know exactly what it's doing"
      proofItems={[
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', title: 'Full Production', stat: '4K+', statLabel: 'cinematic quality', description: 'Professional crew, equipment, lighting, and direction. We handle every detail on set so you can focus on your business.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: 'Fast Turnaround', stat: '2 weeks', statLabel: 'avg delivery', description: 'From script to final cut in days, not months. Fast turnarounds without compromising a frame of quality.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>', title: 'Multi-Platform Delivery', stat: '5+', statLabel: 'formats per project', description: 'Every video delivered in optimized formats for web, social, ads, email, and sales decks. Maximum reach from one shoot.' },
      ]}
      gallery={[
        { title: 'Tech Startup Launch', category: 'Brand Story', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop', color: '#3b82f6' },
        { title: 'E-commerce Growth', category: 'Product Showcase', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop', color: '#8b5cf6' },
        { title: 'Healthcare Innovation', category: 'Explainer Video', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', color: '#10b981' },
        { title: 'Financial Services', category: 'Client Testimonial', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop', color: '#f59e0b' },
        { title: 'SaaS Platform', category: 'Demo Video', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop', color: '#06b6d4' },
        { title: 'Manufacturing', category: 'Process Video', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop', color: '#ef4444' },
      ]}
    />
  );
}
