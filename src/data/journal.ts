export type JournalCategory =
  | "PERSONAL"
  | "FIELD NOTE"
  | "REFLECTION"
  | "LIFE";

export type JournalStatus =
  | "PUBLISHED"
  | "DRAFT"
  | "COMING SOON";

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
  editorialTodo?: string;
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
    id: "cal-poly-field-notes",
    slug: "cal-poly-field-notes",
    title: "CAL POLY // FIELD NOTES",
    date: "COMING SOON",
    summary:
      "Notes on studying Computer Engineering and finding a place in Cal Poly's engineering community.",
    body: [],
    category: "FIELD NOTE",
    tags: ["CAL POLY", "COLLEGE", "RESEARCH", "FIELD NOTES"],
    relatedGalleryIds: [
      "tensegrity-exoskeleton",
      "tensegrity-exoskeleton-fit-test",
      "tensegrity-exoskeleton-arm-assembly",
    ],
    featured: true,
    status: "COMING SOON",
    coverAsset: "/assets/personal/exoskeleton.jpeg",
    coverAlt: "Vincent wearing an upper-limb tensegrity exoskeleton prototype",
    editorialTodo:
      "TODO: Write the personal post before changing this record to PUBLISHED.",
  },
  {
    id: "wrestling-lessons",
    slug: "wrestling-lessons",
    title: "LESSONS FROM WRESTLING",
    date: "COMING SOON",
    summary:
      "A future reflection on discipline, competition, and carrying lessons from wrestling forward.",
    body: [],
    category: "REFLECTION",
    tags: ["WRESTLING", "DISCIPLINE", "REFLECTION"],
    relatedGalleryIds: ["wrestling-record", "wrestling-takedown", "track-sprint-finish"],
    featured: false,
    status: "COMING SOON",
    coverAsset: "/assets/about/vincent-wrestling.jpeg",
    coverAlt: "Vincent Le competing in wrestling",
    editorialTodo:
      "TODO: Write the personal post before changing this record to PUBLISHED.",
  },
  {
    id: "moe-photo-journal",
    slug: "moe-photo-journal",
    title: "MOE // PHOTO JOURNAL",
    date: "COMING SOON",
    summary:
      "A small photo journal for Moe, collected outside the engineering archive.",
    body: [],
    category: "LIFE",
    tags: ["MOE", "PHOTOS", "LIFE"],
    relatedGalleryIds: [
      "moe-portrait",
      "moe-outdoors",
      "moe-closeup",
      "moe-in-box",
      "moe-sleeping",
      "performative-jit-programming",
    ],
    featured: false,
    status: "COMING SOON",
    coverAsset: "/assets/pets/moe-wallpaper.jpeg",
    coverAlt: "Portrait of Moe outdoors",
    editorialTodo:
      "TODO: Restore or write the personal caption copy before publishing.",
  },
  {
    id: "outside-the-lab",
    slug: "outside-the-lab",
    title: "OUTSIDE THE LAB",
    date: "COMING SOON",
    summary:
      "Personal photographs and field notes from life beyond coursework and technical work.",
    body: [],
    category: "LIFE",
    tags: ["PERSONAL", "FRIENDS", "TRAVEL", "FIELD NOTES"],
    relatedGalleryIds: [
      "friends-yosemite",
      "vietnam-field-record",
      "lion-dance-record",
      "fishing-field-record",
      "eren-jaeger-record",
      "in-n-out-record",
      "cheese-pull-record",
      "project-showcase-stage",
    ],
    featured: false,
    status: "COMING SOON",
    coverAsset: "/assets/about/vincent-friends-yosemite.JPG",
    coverAlt: "Vincent Le with friends in Yosemite",
    editorialTodo:
      "TODO: Restore or write the personal post before publishing.",
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
];

export function getJournalEntryById(id: string | null) {
  if (!id) return undefined;
  return journalEntries.find((entry) => entry.id === id);
}