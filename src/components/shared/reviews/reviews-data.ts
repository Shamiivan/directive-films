export type Review = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  company: string;
};

// Real client quotes only. Placeholder strings and any quote naming another
// agency have been dropped. Shared by the home and services review sections.
export const reviews: Review[] = [
  {
    quote: "They were just perfect.",
    initials: "JS",
    name: "Julio Sequeira",
    role: "VP of Marketing",
    company: "D4Pack",
  },
  {
    quote: "They all take the time to provide well-thought-out answers.",
    initials: "ED",
    name: "Eric David",
    role: "VP",
    company: "Drive A Boat Canada",
  },
  {
    quote: "They were super friendly and professional.",
    initials: "JL",
    name: "Julie Lavallée Ansay",
    role: "Communications & Development Coordinator",
    company: "Hochelaga / SDC HM",
  },
  {
    quote:
      "They were responsive and efficient in communicating ideas or guiding us to ensure the best result.",
    initials: "K",
    name: "Kewin",
    role: "Owner",
    company: "EV Charging Solutions",
  },
  {
    quote:
      "I received excellent advice from the team regarding the promotion of my Festival.",
    initials: "SS",
    name: "Samantha Superstein",
    role: "Marketing Director",
    company: "Mad Science Group",
  },
  {
    quote: "We've had slick growth over the past 10 months, and we're very happy.",
    initials: "GD",
    name: "Guillaume Donat",
    role: "CEO",
    company: "Clean Equipements",
  },
  {
    quote:
      "Their proactive approach, excellent reporting, and constant availability make them a pleasure to work with.",
    initials: "CF",
    name: "Charles Frazier",
    role: "CEO & Founder",
    company: "Agriculture Company",
  },
  {
    quote:
      "They were a strategic partner who deeply understood our industry and consistently went the extra mile to help us grow.",
    initials: "RR",
    name: "Ray Ruga",
    role: "Co-Founder & CEO",
    company: "Fintech Americas",
  },
  {
    quote:
      "They are very knowledgeable and always make suggestions which always seem to work.",
    initials: "BB",
    name: "Bibi B",
    role: "Administrative Manager",
    company: "Key Storage",
  },
];
