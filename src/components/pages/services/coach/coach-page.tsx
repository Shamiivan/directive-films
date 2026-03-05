import ServicePageLayout from '../service-page-layout';

export default function CoachPage() {
  return (
    <ServicePageLayout
      eyebrow="Film & Content Setup Coaching"
      title="Build Your Content"
      titleHighlight="Engine"
      subtitle="Your team knows the business. We teach them to make the content."
      ctaLabel="Start Coaching"
      problemTitle="Your team can do this themselves"
      problemText="You have people who know your industry, your customers, and your product better than anyone. They just need the right setup, some training, and a repeatable process to start making professional content every week."
      solutionTitle="Studio. Skills. Playbook."
      solutionText="We set up your in-house studio, train your team hands-on, and give them a process they can repeat. The more they do it, the better and faster they get. That's the whole point."
      process={[
        { number: '01', title: 'Assess Current Setup', description: 'We evaluate your team, space, equipment, and content goals.' },
        { number: '02', title: 'Equipment & Space Setup', description: 'We spec and set up your studio — lighting, cameras, audio, backdrop.' },
        { number: '03', title: 'Hands-On Training', description: 'Your team learns filming, editing, and content frameworks in practice sessions.' },
        { number: '04', title: 'Ongoing Support', description: 'We stay available for review, feedback, and advanced coaching as you scale.' },
      ]}
      proofTitle="Your Team Becomes"
      proofTitleHighlight="Self-Sufficient"
      proofSubtitle="Everything you need to produce professional content in-house, every week"
      proofItems={[
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>', title: 'Full Studio Setup', stat: '1 week', statLabel: 'setup time', description: 'Custom studio spec, equipment procurement, and physical setup — lighting, cameras, audio, backdrop. Ready to shoot.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: 'Hands-On Training', stat: '4 sessions', statLabel: 'intensive coaching', description: 'Your team learns filming, editing, and content frameworks through real practice — not theory slides.' },
        { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>', title: 'Content Playbooks', stat: '12+', statLabel: 'templates included', description: 'Brand-specific video templates, content calendar framework, and editing workflows your team can repeat forever.' },
      ]}
      gallery={[
        { title: 'Studio Setup', category: 'Equipment', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', color: '#3b82f6' },
        { title: 'Team Training', category: 'Workshop', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop', color: '#8b5cf6' },
        { title: 'Content Creation', category: 'In-House', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop', color: '#10b981' },
        { title: 'Lighting Setup', category: 'Production', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop', color: '#f59e0b' },
        { title: 'Editing Workflow', category: 'Post-Production', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop', color: '#ef4444' },
      ]}
    />
  );
}
