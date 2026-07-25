export type GalleryCategory =
  | "ALL"
  | "PROJECTS"
  | "RESEARCH"
  | "MAKERSPACE"
  | "PERSONAL";

export type GalleryRecord = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "ALL">;
  date: string;
  caption: string;
  image?: string;
};

export const galleryCategories: GalleryCategory[] = [
  "ALL",
  "PROJECTS",
  "RESEARCH",
  "MAKERSPACE",
  "PERSONAL",
];

export const galleryRecords: GalleryRecord[] = [
  {
    id: "mantis-blades",
    title: "MANTIS BLADES",
    category: "PROJECTS",
    date: "2025",
    caption: "Wearable robotic mechanism designed, printed, assembled, and documented from scratch.",
    image: "/assets/projects/mantis-blades/hero.jpeg",
  },
  {
    id: "spinal-battery",
    title: "SPINAL BATTERY",
    category: "PROJECTS",
    date: "2026",
    caption: "Modular wearable power and sensing backbone currently in development.",
  },
  {
    id: "tensegrity-research",
    title: "TENSEGRITY RESEARCH",
    category: "RESEARCH",
    date: "2026",
    caption: "Upper-limb exoskeleton research involving IMU, EMG, feedback control, and rehabilitation.",
  },
  {
    id: "makerspace",
    title: "MAKERSPACE ARCHIVE",
    category: "MAKERSPACE",
    date: "2024 — PRESENT",
    caption: "Fabrication, prototyping, mentoring, and hands-on engineering work.",
  },
  {
    id: "operator-record",
    title: "OPERATOR RECORD",
    category: "PERSONAL",
    date: "2026",
    caption: "Personal photographs and field records can be added here.",
  },
];
