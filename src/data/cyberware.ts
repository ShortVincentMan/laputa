export type CyberwareProject = {
  id: string;
  name: string;
  status: string;
  description: string;
  image: string;
  technologies: string[];
};

export const cyberwareProjects: CyberwareProject[] = [
  {
    id: "mantis-blades",
    name: "Mantis Blades",
    status: "Completed Prototype",
    description:
      "A wearable mechanical blade system inspired by Cyberpunk 2077.",
    image: "/assets/projects/mantis-blades/main.webp",
    technologies: [
      "Fusion 360",
      "Arduino",
      "3D Printing",
    ],
  },
];