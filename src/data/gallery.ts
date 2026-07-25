import type { ProjectId } from "@/data/projects";

export type GalleryCategory =
  | "ALL"
  | "PROJECTS"
  | "RESEARCH"
  | "MAKERSPACE"
  | "PERSONAL";

export type GalleryOrientation =
  | "landscape"
  | "portrait"
  | "square";

export type GalleryRecord = {
  id: string;
  title: string;
  asset?: string;
  alt: string;
  date?: string;
  category: Exclude<GalleryCategory, "ALL">;
  caption?: string;
  relatedProjectId?: ProjectId;
  relatedJournalIds?: string[];
  dimensions?: {
    width: number;
    height: number;
  };
  orientation?: GalleryOrientation;
  featured: boolean;
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
    id: "mantis-hero",
    title: "MANTIS BLADES // FINAL ASSEMBLY",
    asset: "/assets/projects/mantis-blades/hero.jpeg",
    alt: "Completed wearable Mantis Blades prototype",
    date: "2025",
    category: "PROJECTS",
    caption: "Completed wearable mechanical blade assembly.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 4032, height: 3024 },
    orientation: "landscape",
    featured: true,
  },
  {
    id: "mantis-cad",
    title: "MANTIS BLADES // CAD",
    asset: "/assets/projects/mantis-blades/cad.png",
    alt: "CAD model of the Mantis Blades mechanism",
    date: "2024 — 2025",
    category: "PROJECTS",
    caption: "Mechanical design developed in Fusion 360 before fabrication.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 1151, height: 637 },
    orientation: "landscape",
    featured: true,
  },
  {
    id: "mantis-fabrication",
    title: "MANTIS BLADES // FABRICATION",
    asset: "/assets/projects/mantis-blades/fabrication.png",
    alt: "Fabricated Mantis Blades components and assembly",
    date: "2024 — 2025",
    category: "MAKERSPACE",
    caption: "Iterative 3D printing, fitting, assembly, and mechanical testing.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 1300, height: 653 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "mantis-electronics",
    title: "MANTIS BLADES // ELECTRONICS",
    asset: "/assets/projects/mantis-blades/electronics.png",
    alt: "Arduino and electronics prototype for the Mantis Blades",
    date: "2024 — 2025",
    category: "PROJECTS",
    caption: "Motion sensing, servo control, and prototype power electronics.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 634, height: 661 },
    orientation: "square",
    featured: false,
  },
  {
    id: "mantis-firmware",
    title: "MANTIS BLADES // FIRMWARE",
    asset: "/assets/projects/mantis-blades/firmware.png",
    alt: "Embedded firmware used by the Mantis Blades prototype",
    date: "2024 — 2025",
    category: "PROJECTS",
    caption: "Embedded C++ processed sensor input and controlled deployment.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 2950, height: 1844 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "mantis-demo",
    title: "MANTIS BLADES // DEMONSTRATION",
    asset: "/assets/projects/mantis-blades/demo.png",
    alt: "Wearable Mantis Blades demonstration",
    date: "2025",
    category: "PROJECTS",
    caption: "Final wearable prototype demonstration.",
    relatedProjectId: "mantis-blades",
    dimensions: { width: 1372, height: 1202 },
    orientation: "landscape",
    featured: true,
  },
  {
    id: "trimtab-environment",
    title: "TRIMTAB // ENVIRONMENT",
    asset: "/assets/projects/trimtab/final-environment-render.png",
    alt: "Trimtab architectural concept in its coastal environment",
    date: "2024",
    category: "PROJECTS",
    caption: "Final environment render of the coastal structure.",
    relatedProjectId: "trimtab",
    dimensions: { width: 1920, height: 1080 },
    orientation: "landscape",
    featured: true,
  },
  {
    id: "trimtab-final-form",
    title: "TRIMTAB // FINAL FORM",
    asset: "/assets/projects/trimtab/final-form-render.png",
    alt: "Final isolated render of the Trimtab structure",
    date: "2024",
    category: "PROJECTS",
    caption: "Final isolated form render.",
    relatedProjectId: "trimtab",
    dimensions: { width: 1919, height: 1026 },
    orientation: "landscape",
    featured: true,
  },
  {
    id: "trimtab-blueprint",
    title: "TRIMTAB // BLUEPRINT SETUP",
    asset: "/assets/projects/trimtab/blueprint-reference-setup.png",
    alt: "Blueprint references aligned for the Trimtab model",
    date: "2024",
    category: "MAKERSPACE",
    caption: "Reference setup used to establish scale and primary geometry.",
    relatedProjectId: "trimtab",
    dimensions: { width: 1914, height: 970 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "trimtab-form-development",
    title: "TRIMTAB // FORM DEVELOPMENT",
    asset: "/assets/projects/trimtab/form-development-03.png",
    alt: "Intermediate Trimtab form development model",
    date: "2024",
    category: "MAKERSPACE",
    caption: "Layered surface modeling and organic-form refinement.",
    relatedProjectId: "trimtab",
    dimensions: { width: 1919, height: 1030 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "trimtab-wireframe",
    title: "TRIMTAB // MULTI-VIEW",
    asset: "/assets/projects/trimtab/multi-view-wireframe.png",
    alt: "Multi-view wireframe of the Trimtab model",
    date: "2024",
    category: "MAKERSPACE",
    caption: "Orthographic and perspective evaluation of the model.",
    relatedProjectId: "trimtab",
    dimensions: { width: 1919, height: 1079 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "operator-sunset",
    title: "OPERATOR // SUNSET PORTRAIT",
    asset: "/assets/about/vincent-portrait-sunset.png",
    alt: "Portrait of Vincent Le at sunset",
    category: "PERSONAL",
    caption: "Personal portrait at sunset.",
    relatedJournalIds: ["welcome-to-the-journal"],
    dimensions: { width: 2212, height: 2204 },
    orientation: "square",
    featured: true,
  },
  {
    id: "cal-poly-robotics-lab",
    title: "CAL POLY // ROBOTICS LAB",
    asset: "/assets/personal/cal-poly-robotics-lab.jpg",
    alt: "Cal Poly robotics laboratory",
    category: "PERSONAL",
    caption: "Field record from the Cal Poly robotics laboratory.",
    relatedJournalIds: ["cal-poly-field-notes"],
    dimensions: { width: 1250, height: 833 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "wrestling-record",
    title: "WRESTLING // COMPETITION RECORD",
    asset: "/assets/about/vincent-wrestling.jpeg",
    alt: "Vincent Le competing in wrestling",
    category: "PERSONAL",
    caption: "Personal wrestling archive.",
    relatedJournalIds: ["wrestling-lessons"],
    dimensions: { width: 1920, height: 1080 },
    orientation: "landscape",
    featured: false,
  },
  {
    id: "moe-portrait",
    title: "MOE // OUTDOOR PORTRAIT",
    asset: "/assets/pets/moe-portrait.jpeg",
    alt: "Portrait of Moe outdoors",
    category: "PERSONAL",
    caption: "Moe outdoors.",
    relatedJournalIds: ["moe-photo-journal"],
    dimensions: { width: 360, height: 480 },
    orientation: "portrait",
    featured: false,
  },
  {
    id: "friends-yosemite",
    title: "FIELD RECORD // YOSEMITE",
    asset: "/assets/about/vincent-friends-yosemite.JPG",
    alt: "Vincent Le with friends in Yosemite",
    category: "PERSONAL",
    caption: "Personal field record from Yosemite.",
    relatedJournalIds: ["outside-the-lab"],
    dimensions: { width: 1536, height: 1212 },
    orientation: "landscape",
    featured: false,
  },
];

export function getGalleryRecordById(id: string | null) {
  if (!id) return undefined;
  return galleryRecords.find((record) => record.id === id);
}
