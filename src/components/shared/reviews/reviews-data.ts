export type ReviewBase = {
  initials: string;
  name: string;
  company: string;
};

export type Review = ReviewBase & {
  quote: string;
  role: string;
};

// Real client quotes only. Placeholder strings and any quote naming another
// agency have been dropped. Shared by the home and services review sections.
// Quotes and roles live in the `reviews.items` block of common.json (en/fr),
// order-matched to this array by index.
export const reviewsBase: ReviewBase[] = [
  { initials: "JS", name: "Julio Sequeira", company: "D4Pack" },
  { initials: "ED", name: "Eric David", company: "Drive A Boat Canada" },
  { initials: "JL", name: "Julie Lavallée Ansay", company: "Hochelaga / SDC HM" },
  { initials: "K", name: "Kewin", company: "EV Charging Solutions" },
  { initials: "SS", name: "Samantha Superstein", company: "Mad Science Group" },
  { initials: "GD", name: "Guillaume Donat", company: "Clean Equipements" },
  { initials: "CF", name: "Charles Frazier", company: "Agriculture Company" },
  { initials: "RR", name: "Ray Ruga", company: "Fintech Americas" },
  { initials: "BB", name: "Bibi B", company: "Key Storage" },
];
