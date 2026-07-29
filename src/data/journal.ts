export type JournalCategory =
  | "PERSONAL"
  | "FIELD NOTE"
  | "REFLECTION"
  | "LIFE";

export type JournalStatus = "PUBLISHED";

export type JournalBodySection = {
  heading?: string;
  paragraphs: string[];
};

export type JournalEntry = {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: JournalBodySection[];
  category: JournalCategory;
  tags: string[];
  relatedGalleryIds?: string[];
  featured: boolean;
  status: JournalStatus;
  coverAsset?: string;
  coverAlt?: string;
};

export const journalEntries: JournalEntry[] = [
  {
    id: "welcome-to-the-journal",
    slug: "welcome-to-the-journal",
    title: "WELCOME TO MY JOURNAL",
    date: "2026-07-25",
    summary:
      "A personal space for reflections, field notes, and the parts of my life that happen beyond the workbench.",
    body: [
      {
        heading: "About Me",
        paragraphs: [
          "I am a Computer Engineering student at Cal Poly San Luis Obispo who enjoys building hands-on systems that bridge hardware and software.",
          "Outside engineering, I enjoy games such as Fallout, Terraria, Dark Souls, and Cyberpunk, along with bodybuilding, wrestling, and listening to music. This journal is where I can write about those experiences in a more personal way.",
        ],
      },
    ],
    category: "PERSONAL",
    tags: ["WELCOME", "PERSONAL", "LAPUTA"],
    relatedGalleryIds: [
      "operator-sunset",
      "operator-portrait",
      "operator-candid-sunset",
    ],
    featured: true,
    status: "PUBLISHED",
    coverAsset: "/assets/about/vincent-portrait-sunset.png",
    coverAlt: "Portrait of Vincent Le at sunset",
  },
  {
    id: "japan-photo-journal",
    slug: "japan-photo-journal",
    title: "JAPAN // PHOTO JOURNAL",
    date: "2025-07-18",
    summary:
      "A photo journal from Kyoto, Osaka, and the Osaka Expo, collected outside the engineering archive.",
    body: [
      {
        heading: "Kyoto and Osaka",
        paragraphs: [
          "A collection of travel records from Kyoto and Osaka, including Kichi Kichi Omurice, the Osaka cityscape, and the Osaka Expo.",
        ],
      },
    ],
    category: "LIFE",
    tags: ["JAPAN", "KYOTO", "OSAKA", "TRAVEL", "PHOTOS"],
    relatedGalleryIds: [
      "kyoto-kichi-kichi",
      "osaka-night-record",
      "osaka-expo-record",
    ],
    featured: false,
    status: "PUBLISHED",
    coverAsset: "/assets/personal/japan.jpeg",
    coverAlt: "Nighttime city scene photographed in Yokohama",
  },

  {
    id: "moe-chief-morale-officer",
    slug: "moe-chief-morale-officer",
    title: "MOE // CHIEF MORALE OFFICER",
    date: "2026-07-28",
    summary:
      "Meet Moe, the unofficial engineering assistant responsible for morale, mandatory breaks, and keyboard quality assurance.",
    body: [
      {
        heading: "Engineering's Most Important Contributor",
        paragraphs: [
          "Every engineering project has an unofficial contributor. Mine happens to have four legs, a pink nose, and a habit of sitting directly on the keyboard whenever deadlines approach.",
          "Moe has been present through late-night CAD sessions, debugging marathons, research papers, and the development of Laputa OS. While he has never written a line of code, he has an uncanny ability to appear exactly when I need to step away from the screen.",
          "His daily responsibilities include quality assurance by walking across the keyboard, enforcing mandatory stretch breaks through persistent head-butts, and supervising every workspace he decides belongs to him. Sometimes the best solution to an engineering problem is simply taking a break, petting the cat, and returning with a fresh perspective.",
        ],
      },
    ],
    category: "PERSONAL",
    tags: ["MOE", "CAT", "PERSONAL", "LIFE"],
    relatedGalleryIds: [
      "moe-in-box",
      "moe-closeup",
      "moe-portrait",
      "moe-sleeping",
      "moe-outdoors",
      "moe-wallpaper",
      "performative-jit-programming",
    ],
    featured: false,
    status: "PUBLISHED",
    coverAsset: "/assets/pets/moe-landscape.jpeg",
    coverAlt: "Moe relaxing outdoors",
  },
];

export function getJournalEntryById(id: string | null) {
  if (!id) return undefined;
  return journalEntries.find((entry) => entry.id === id);
}
