export type Project = {
  slug: string;
  title: string;
  category: "cyberware" | "quickhack" | "research";
  status: "complete" | "active" | "planned";
  summary: string;
  description: string;
  technologies: string[];
  images: string[];
  github?: string;
  demo?: string;
};