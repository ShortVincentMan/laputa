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
          "I am a Computer Engineering student at Cal Poly San Luis Obispo who enjoys building hands-on systems that bridge hardware and software.\n",
          
          "\n Outside engineering, I love playing video games like Fallout, Terraria, Dark Souls, and Cyberpunk (if you couldn't tell), bodybuilding, wrestling, and listening to all sorts of music. This journal is where I can write about those experiences in a more personal way.",
        ],
      },
    ],
    category: "PERSONAL",
    tags: ["WELCOME", "PERSONAL", "LAPUTA"],
    relatedGalleryIds: ["operator-sunset"],
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
    tags: ["CAL POLY", "COLLEGE", "FIELD NOTES"],
    relatedGalleryIds: ["cal-poly-robotics-lab"],
    featured: true,
    status: "COMING SOON",
    coverAsset: "/assets/personal/exoskeleton.jpeg",
    coverAlt: "Cal Poly robotics laboratory",
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
    relatedGalleryIds: ["wrestling-record"],
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
    relatedGalleryIds: ["moe-portrait"],
    featured: false,
    status: "COMING SOON",
    coverAsset: "/assets/pets/moe-wallpaper.jpeg",
    coverAlt: "Portrait of Moe outdoors",
    editorialTodo:
      "TODO: Restore or write the personal caption copy before publishing.",
  },
  {
    id: "yosemite-trip",
    slug: "yosemite-trip",
    title: "OUTSIDE THE LAB",
    date: "01-02-2025",
    summary:
      "Personal photographs and field notes from life beyond coursework and technical work.",
    body: [],
    category: "LIFE",
    tags: ["PERSONAL", "FRIENDS", "FIELD NOTES"],
    relatedGalleryIds: ["friends-yosemite"],
    featured: false,
    status: "COMING SOON",
    coverAsset: "/assets/about/vincent-friends-yosemite.JPG",
    coverAlt: "Vincent Le with friends in Yosemite",
    editorialTodo:
      "TODO: Restore or write the personal post before publishing.",
  },
  {
    id: "kyoto-photo-journal",
    slug: "kyoto-photo-journal",
    title: "KYOTO // CELEBRITY CHEF",
    date: "07-18-2025",
    summary:
      "A small photo journal from a trip to Kyoto, Japan, collected outside the engineering archive.",
    body: [],
    category: "LIFE",
    tags: ["KYOTO", "PHOTOS", "LIFE"],
    relatedGalleryIds: ["kyoto-kichi-kichi"],
    featured: false,
    status: "PUBLISHED",
    coverAsset: "/assets/personal/kyoto-kichi-kichi.jpeg",
    coverAlt: "Kyoto, Japan restaurant Kichi Kichi",
  }
];

export function getJournalEntryById(id: string | null) {
  if (!id) return undefined;
  return journalEntries.find((entry) => entry.id === id);
}
