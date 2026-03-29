import type { BakeryItem } from "@/types/bakery-item";

function createEditorialImage(
  title: string,
  toneA: string,
  toneB: string,
  accent: string,
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${toneA}" />
          <stop offset="100%" stop-color="${toneB}" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1200" rx="60" fill="url(#bg)" />
      <circle cx="1270" cy="220" r="170" fill="${accent}" opacity="0.28" />
      <circle cx="320" cy="980" r="220" fill="#fff8f2" opacity="0.34" />
      <ellipse cx="850" cy="690" rx="360" ry="220" fill="#f0cfab" />
      <ellipse cx="850" cy="660" rx="300" ry="170" fill="#fff4e6" />
      <ellipse cx="850" cy="635" rx="225" ry="120" fill="${accent}" opacity="0.48" />
      <path d="M625 575c92-122 392-124 484 6" fill="none" stroke="#fff8f2" stroke-width="28" stroke-linecap="round" opacity="0.74" />
      <text x="110" y="150" fill="#6b4f3a" font-family="Georgia, serif" font-size="60">${title}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createFeaturedItem(input: {
  id: string;
  slug: string;
  name: string;
  description: string;
  tones: [string, string, string];
}): BakeryItem {
  const [toneA, toneB, accent] = input.tones;

  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    description: input.description,
    ingredients: [],
    allergens: [],
    images: [
      {
        src: createEditorialImage(input.name, toneA, toneB, accent),
        alt: `${input.name} featured on a soft bakery backdrop`,
      },
    ],
  };
}

export const heroImage = createEditorialImage(
  "Morning pastries",
  "#f3e2d3",
  "#d3aa83",
  "#e8b4a0",
);

export const featuredHomeItems: BakeryItem[] = [
  createFeaturedItem({
    id: "home-1",
    slug: "brown-butter-croissant",
    name: "Brown Butter Croissant",
    description:
      "Delicate layers, caramel depth, and a clean buttery finish.",
    tones: ["#f3e1d0", "#d8b492", "#e6b49c"],
  }),
  createFeaturedItem({
    id: "home-2",
    slug: "pistachio-raspberry-danish",
    name: "Pistachio Raspberry Danish",
    description:
      "Flaky pastry balanced with pistachio cream and bright fruit.",
    tones: ["#efe0d4", "#d0a989", "#dba2a2"],
  }),
  createFeaturedItem({
    id: "home-3",
    slug: "almond-orange-morning-cake",
    name: "Almond Orange Morning Cake",
    description:
      "Soft crumb, citrus lift, and a quiet richness made for slow mornings.",
    tones: ["#f4e8db", "#dcb68d", "#efc39b"],
  }),
];
