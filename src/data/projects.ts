export type ProjectCategory =
  | "featured"
  | "hardware"
  | "software"
  | "research"
  | "archive";

export type ProjectId =
  | "mantis-blades"
  | "tensegrity-exoskeleton"
  | "spinal-battery-system"
  | "kfi-stem-platform"
  | "laputa-os"
  | "ar-sand-table"
  | "trimtab"
  | "hollow-purple-board"
  | "file-cleaner";

export type StoredProjectCategory = Exclude<
  ProjectCategory,
  "featured"
>;

export type ProjectStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "IN DEVELOPMENT"
  | "PLANNED";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type CyberwareSlot =
  | "head"
  | "ocular"
  | "arms"
  | "hands"
  | "spine"
  | "torso"
  | "legs";

export type CyberwareProfile = {
  slot: CyberwareSlot;
  label: string;
  systemType: string;
  description: string;
};

export type ProjectRecord = {
  id: ProjectId;
  category: StoredProjectCategory;
  title: string;
  subtitle: string;
  period: string;
  status: ProjectStatus;

  summary: string;
  objective: string;
  technologies: string[];

  assetLabel: string;
  image?: string;
  imageAlt?: string;

  detailLabel?: string;
  sections?: ProjectSection[];
  gallery?: ProjectGalleryItem[];
  links?: ProjectLink[];
  cyberware?: CyberwareProfile;

  featured?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  featured: "Featured",
  hardware: "Hardware",
  software: "Software",
  research: "Research",
  archive: "Archive",
};

export const categoryOrder: ProjectCategory[] = [
  "featured",
  "hardware",
  "software",
  "research",
  "archive",
];

export const projects: ProjectRecord[] = [
  {
    id: "mantis-blades",
    category: "hardware",
    title: "Mantis Blades",
    subtitle: "Wearable robotic mechanism",
    period: "2024 — 2025",
    status: "COMPLETED",

    summary:
      "A wearable mechanical blade system inspired by the Mantis Blades from Cyberpunk 2077.",

    objective:
      "Translate a fictional cyberware concept into a functional mechanical and embedded prototype.",

    technologies: [
      "Arduino Nano",
      "C++",
      "MPU-6050",
      "Servo Motors",
      "Fusion 360",
      "3D Printing",
    ],

    assetLabel: "MANTIS BLADES PROJECT IMAGE",
    image: "/assets/projects/mantis-blades/hero.jpeg",
    imageAlt: "Completed wearable Mantis Blades prototype",

    detailLabel: "ARMS // MANTIS BLADES",
    cyberware: {
      slot: "arms",
      label: "MANTIS BLADES",
      systemType: "ARM-MOUNTED DEPLOYMENT SYSTEM",
      description:
        "Wearable mechanical cyberware prototype with motion sensing, servo actuation, and a deployable blade mechanism.",
    },

    sections: [
      {
        id: "inspiration",
        title: "Inspiration",
        description:
          "The project began as an attempt to translate the fictional Mantis Blades cyberware into a wearable physical mechanism.",
        image:
          "/assets/projects/mantis-blades/inspiration.jpg",
        imageAlt:
          "Cyberpunk 2077 Mantis Blades design reference",
      },
      {
        id: "mechanical-design",
        title: "Mechanical Design",
        description:
          "The blade housing, wearable structure, and deployment mechanism were modeled in Fusion 360 before fabrication.",
        image: "/assets/projects/mantis-blades/cad.png",
        imageAlt: "Mantis Blades CAD model",
      },
      {
        id: "fabrication",
        title: "Fabrication",
        description:
          "The custom components were produced through iterative 3D printing, fitting, assembly, and mechanical testing.",
        image:
          "/assets/projects/mantis-blades/fabrication.png",
        imageAlt:
          "Fabricated Mantis Blades components and assembly",
      },
      {
        id: "electronics",
        title: "Electronics",
        description:
          "An Arduino-based control system connected the motion sensor, servo motors, and power system.",
        image:
          "/assets/projects/mantis-blades/electronics.png",
        imageAlt:
          "Mantis Blades Arduino and electronics prototype",
      },
      {
        id: "firmware",
        title: "Firmware",
        description:
          "Embedded C++ processed sensor input and controlled the blade deployment behavior.",
        image: "/assets/projects/mantis-blades/firmware.png",
        imageAlt:
          "Embedded firmware used by the Mantis Blades prototype",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/mantis-blades/demo.png",
        alt: "Mantis Blades wearable demonstration",
        caption: "Final wearable demonstration",
      },
      {
        src: "/assets/projects/mantis-blades/final-side.jpeg",
        alt: "Side view of the completed Mantis Blades",
        caption: "Completed mechanical assembly",
      },
      {
        src: "/assets/projects/mantis-blades/image0.jpg",
        alt: "Vincent Le demonstrating the wearable Mantis Blades prototype",
        caption: "Classroom project demonstration",
      },
      {
        src: "/assets/projects/mantis-blades/mantisblades2.png",
        alt: "Additional view of the Mantis Blades prototype",
        caption: "Prototype detail view",
      },
      {
        src: "/assets/personal/greatsword-mantis-blades.jpeg",
        alt:
          "Vincent wearing the Mantis Blades prototype while holding a large prop greatsword",
        caption: "Completed wearable system and prop showcase",
      },
    ],

    featured: true,
  },

  {
    id: "tensegrity-exoskeleton",
    category: "research",
    title: "Upper-Limb Tensegrity Exoskeleton",
    subtitle: "Feedback control research",
    period: "2026 — PRESENT",
    status: "ACTIVE",

    summary:
      "Researching feedback control for an upper-limb tensegrity exoskeleton using IMU motion tracking and EMG-based muscle evaluation.",

    objective:
      "Develop a low-cost, flexible rehabilitation exoskeleton capable of tracking user motion and evaluating muscle effort.",

    technologies: [
      "IMU",
      "EMG",
      "Feedback Control",
      "Embedded Systems",
      "Wearable Robotics",
    ],

    assetLabel: "EXOSKELETON RESEARCH VISUAL",
    image: "/assets/personal/exoskeleton2.jpeg",
    imageAlt:
      "Vincent wearing the upper-limb tensegrity exoskeleton prototype during a fit test",
    detailLabel: "RESEARCH // TENSEGRITY EXOSKELETON",

    sections: [
      {
        id: "prototype",
        title: "Prototype",
        description:
          "The current research platform uses a lightweight tensegrity-inspired arm structure intended for wearable motion assistance and rehabilitation research.",
        image: "/assets/personal/exoskeleton.jpeg",
        imageAlt:
          "Upper-limb tensegrity exoskeleton prototype being worn during early testing",
      },
      {
        id: "fit-testing",
        title: "Fit Testing",
        description:
          "Wearable fit tests are used to evaluate alignment, comfort, range of motion, and how the structure follows the user during movement.",
        image: "/assets/personal/exoskeleton2.jpeg",
        imageAlt:
          "Wearable fit test of the upper-limb tensegrity exoskeleton",
      },
      {
        id: "arm-assembly",
        title: "Arm Assembly",
        description:
          "The arm assemblies use tensioned members and cable-driven geometry that can be adjusted as the control and sensing architecture develops.",
        image: "/assets/personal/exoskeletonarms.jpeg",
        imageAlt:
          "Close view of the tensegrity exoskeleton arm assemblies",
      },
    ],

    gallery: [
      {
        src: "/assets/personal/exoskeleton.jpeg",
        alt: "Upper-limb tensegrity exoskeleton prototype being tested",
        caption: "Early wearable prototype test",
      },
      {
        src: "/assets/personal/exoskeleton2.jpeg",
        alt: "Vincent wearing the upper-limb tensegrity exoskeleton",
        caption: "Fit and range-of-motion test",
      },
      {
        src: "/assets/personal/exoskeletonarms.jpeg",
        alt: "Close view of the exoskeleton arm structures",
        caption: "Arm assembly detail",
      },
    ],
    cyberware: {
      slot: "arms",
      label: "TENSEGRITY EXOSKELETON",
      systemType: "UPPER-LIMB ASSIST SYSTEM",
      description:
        "Sensor-driven upper-limb exoskeleton research platform using IMU and EMG feedback for rehabilitation control.",
    },
    featured: true,
  },

  {
    id: "spinal-battery-system",
    category: "hardware",
    title: "Spinal Battery System",
    subtitle: "Wearable modular power platform",
    period: "2026 — PRESENT",
    status: "IN DEVELOPMENT",

    summary:
      "A wearable modular spinal platform combining structural support, distributed batteries, sensing, and future actuator interfaces.",

    objective:
      "Create a scalable wearable robotic backbone inspired by human anatomy and Cyberpunk spinal augmentation systems.",

    technologies: [
      "CAD",
      "Battery Systems",
      "Embedded Electronics",
      "3D Printing",
      "Wearable Robotics",
    ],

    assetLabel: "SPINAL SYSTEM RENDER",
    image: "/assets/projects/spinal-battery.png",
    imageAlt:
      "CAD assembly showing articulated vertebral modules for the Spinal Battery System",
    detailLabel: "CYBERWARE // SPINAL PLATFORM",

    sections: [
      {
        id: "vertebral-architecture",
        title: "Vertebral Architecture",
        description:
          "The platform is organized as a chain of modular vertebrae that provide structure, articulation, and protected space for future power and sensing hardware.",
        image: "/assets/projects/spinal-battery.png",
        imageAlt:
          "CAD model of the modular vertebral architecture and articulated joints",
      },
      {
        id: "range-of-motion",
        title: "Range of Motion",
        description:
          "Joint geometry and mechanical stops are being evaluated to approximate useful spinal motion while preventing unrealistic articulation between modules.",
        image: "/assets/projects/spinal-battery.png",
        imageAlt:
          "Spinal Battery CAD model annotated with joint angles and range-of-motion measurements",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/spinal-battery.png",
        alt:
          "Articulated Spinal Battery System CAD assembly with measured joint angles",
        caption: "Early vertebral architecture and range-of-motion study",
      },
    ],
    cyberware: {
      slot: "spine",
      label: "SPINAL BATTERY SYSTEM",
      systemType: "MODULAR POWER BACKBONE",
      description:
        "Wearable spinal platform combining structural support, distributed power, sensing, and future actuator interfaces.",
    },
    featured: true,
  },

    {
    id: "kfi-stem-platform",
    category: "software",
    title: "Kids First Initiative STEM Platform",
    subtitle: "Educational game and cloud platform",
    period: "2025 — PRESENT",
    status: "ACTIVE",

    summary:
      "A STEM learning platform developed with Hack4Impact for Kids First Initiative.",

    objective:
      "Expand access to interactive STEM education for students from underserved communities.",

    technologies: [
      "Unity",
      "C#",
      "Next.js",
      "MongoDB",
      "Cloud Save",
    ],

    assetLabel: "KIDS FIRST PLATFORM PREVIEW",
    image: "/assets/projects/kfi/hero.jpeg",
    imageAlt:
      "Kids First Initiative STEM platform activity selection screen",
    detailLabel: "SOFTWARE // STEM PLATFORM",

    sections: [
      {
        id: "learning-platform",
        title: "Learning Platform",
        description:
          "The platform gives students access to interactive STEM activities while facilitators manage access, classrooms, and progress through a separate interface.",
        image: "/assets/projects/kfi/landing.png",
        imageAlt:
          "Kids First Initiative platform landing screen with student and facilitator options",
      },
      {
        id: "activity-selection",
        title: "Activity Selection",
        description:
          "Students choose from guided activities covering matter, fluid systems, and energy concepts.",
        image: "/assets/projects/kfi/hero.jpeg",
        imageAlt:
          "Kids First Initiative activity selection screen",
      },
      {
        id: "fluid-systems",
        title: "Fluid Systems",
        description:
          "The pipe activity uses interactive route-building and phase-change mechanics to teach how matter behaves in a system.",
        image: "/assets/projects/kfi/fluids.png",
        imageAlt:
          "Kids First Initiative pipe activity showing a frozen-water route puzzle",
      },
      {
        id: "energy-systems",
        title: "Energy Systems",
        description:
          "The energy activity asks students to connect a circuit and transfer power through an interactive visual system.",
        image: "/assets/projects/kfi/gas.png",
        imageAlt:
          "Kids First Initiative energy activity showing connected wires and a power control",
      },
      {
        id: "team",
        title: "Team Recognition",
        description:
          "The project was developed collaboratively through Hack4Impact for Kids First Initiative.",
        image: "/assets/projects/kfi/team.jpg",
        imageAlt:
          "Kids First Initiative project team at a presentation and awards event",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/kfi/landing.png",
        alt:
          "Kids First Initiative student and facilitator landing screen",
        caption: "Student and facilitator entry flow",
      },
      {
        src: "/assets/projects/kfi/hero.jpeg",
        alt:
          "Kids First Initiative activity selection screen",
        caption: "STEM activity selection",
      },
      {
        src: "/assets/projects/kfi/fluids.png",
        alt:
          "Interactive pipe and phase-change learning activity",
        caption: "Fluid systems activity",
      },
      {
        src: "/assets/projects/kfi/gas.png",
        alt:
          "Interactive electrical energy learning activity",
        caption: "Energy systems activity",
      },
      {
        src: "/assets/projects/kfi/team.jpg",
        alt:
          "Kids First Initiative project team at an awards event",
        caption: "Project team and first-place recognition",
      },
    ],

    links: [
      {
        label: "OPEN LIVE PLATFORM",
        href: "https://kids-first-initiative-site.vercel.app/",
      },
    ],

    featured: true,
  },

  {
    id: "laputa-os",
    category: "software",
    title: "Laputa OS",
    subtitle: "Interactive engineering portfolio",
    period: "2026 — PRESENT",
    status: "IN DEVELOPMENT",

    summary:
      "A Cyberpunk 2077-inspired interactive portfolio built as a fictional operating system.",

    objective:
      "Present engineering projects through faithful recreations of Cyberpunk menu interfaces.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS",
      "Figma",
    ],

    assetLabel: "LAPUTA OS INTERFACE CAPTURE",
    image: "/assets/projects/laputa/laputa.jpeg",
    imageAlt: "Landing Screen of the Laputa OS portfolio interface",
    detailLabel: "SOFTWARE // LAPUTA OS",

    sections: [
      {
        id: "interface",
        title: "Interface System",
        description:
          "Laputa recreates Cyberpunk-inspired menu systems as reusable React interfaces while keeping each portfolio section visually distinct.",
        image: "/assets/projects/laputa/laputa.jpeg",
        imageAlt: "Laputa OS portfolio interface",
      },
      {
        id: "project-archive",
        title: "Project Archive",
        description:
          "Projects are organized through typed data records, category filtering, detail views, gallery relationships, and cyberware-style hardware profiles.",
        image: "/assets/projects/laputa/laputa.jpeg",
        imageAlt: "Laputa OS project archive interface",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/laputa/laputa.jpeg",
        alt: "Laputa OS interface during active development",
        caption: "Laputa OS interface capture",
      },
    ],

    featured: true,
  },

  {
    id: "ar-sand-table",
    category: "hardware",
    title: "Augmented Reality Sand Table",
    subtitle: "Interactive terrain simulation",
    period: "2023 — 2024",
    status: "COMPLETED",

    summary:
      "An interactive sand table that used depth sensing and projection to display real-time terrain information.",

    objective:
      "Create an educational physical interface for visualizing topography and terrain data.",

    technologies: [
      "Unity",
      "Kinect",
      "Linux",
      "Projection Mapping",
      "Motion Tracking",
    ],

    assetLabel: "AR SAND TABLE MEDIA",
    image: "/assets/projects/ar-sand-table.jpeg",
    imageAlt:
      "Augmented Reality Sand Table projecting terrain colors onto sculpted sand",
    detailLabel: "HARDWARE // AR SAND TABLE",

    sections: [
      {
        id: "terrain-visualization",
        title: "Terrain Visualization",
        description:
          "A depth camera measured the sand surface while a projector overlaid color-coded terrain information in real time.",
        image: "/assets/projects/ar-sand-table.png",
        imageAlt:
          "Projected elevation colors displayed across the physical sand surface",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/ar-sand-table.png",
        alt:
          "Augmented Reality Sand Table displaying projected terrain visualization",
        caption: "Real-time projected terrain visualization",
      },
    ],
  },

  {
    id: "trimtab",
    category: "archive",
    title: "Trimtab",
    subtitle: "Organic architectural study",
    period: "2024",
    status: "COMPLETED",

    summary:
      "A seven-story coastal structure designed during an architecture fellowship with Eugene Tssui.",

    objective:
      "Explore organic architecture, sustainable systems, and large-scale digital modeling.",

    technologies: [
      "Rhino 3D",
      "Organic Architecture",
      "Sustainable Design",
      "CAD",
    ],

    assetLabel: "TRIMTAB ARCHITECTURAL RENDER",
    image: "/assets/projects/trimtab/final-environment-render.png",
    imageAlt: "Final environment render of the Trimtab organic architecture study",
    detailLabel: "ARCHIVE // TRIMTAB",

    sections: [
      {
        id: "final-form",
        title: "Final Form",
        description:
          "The final concept developed into a seven-story coastal structure shaped through organic architectural principles.",
        image: "/assets/projects/trimtab/final-form-render.png",
        imageAlt: "Final form render of the Trimtab architectural study",
      },
      {
        id: "blueprint-setup",
        title: "Reference Setup",
        description:
          "Blueprint references and aligned construction planes established the scale and primary geometry of the model.",
        image: "/assets/projects/trimtab/blueprint-reference-setup.png",
        imageAlt: "Blueprint reference setup used to model Trimtab",
      },
      {
        id: "form-development",
        title: "Form Development",
        description:
          "The structure was iterated through layered surface modeling, proportion studies, and organic-form refinement.",
        image: "/assets/projects/trimtab/form-development-03.png",
        imageAlt: "Intermediate Trimtab form development model",
      },
      {
        id: "wireframe",
        title: "Multi-View Modeling",
        description:
          "Multiple orthographic and perspective views were used to evaluate continuity, structure, and overall silhouette.",
        image: "/assets/projects/trimtab/multi-view-wireframe.png",
        imageAlt: "Multi-view wireframe of the Trimtab model",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/trimtab/final-environment-render.png",
        alt: "Trimtab architectural concept in its coastal environment",
        caption: "Final environment render",
      },
      {
        src: "/assets/projects/trimtab/final-form-render.png",
        alt: "Final isolated render of the Trimtab structure",
        caption: "Final form render",
      },
      {
        src: "/assets/projects/trimtab/form-development-01.png",
        alt: "Early Trimtab form development",
        caption: "Form development 01",
      },
      {
        src: "/assets/projects/trimtab/form-development-02.png",
        alt: "Second Trimtab form development stage",
        caption: "Form development 02",
      },
      {
        src: "/assets/projects/trimtab/form-development-04.png",
        alt: "Later Trimtab form development stage",
        caption: "Form development 04",
      },
      {
        src: "/assets/projects/trimtab/reference-plane-modeling.png",
        alt: "Reference-plane modeling for Trimtab",
        caption: "Reference-plane modeling",
      },
      {
        src: "/assets/projects/trimtab/reference-overlay-modeling.png",
        alt: "Reference overlay used during Trimtab modeling",
        caption: "Reference overlay",
      },
      {
        src: "/assets/projects/trimtab/base-development.png",
        alt: "Base development for the Trimtab architectural model",
        caption: "Base development",
      },
    ],
  },

  {
    id: "hollow-purple-board",
    category: "hardware",
    title: "Hollow Purple PCB",
    subtitle: "Custom illustrated circuit board",
    period: "2025",
    status: "COMPLETED",

    summary:
      "A custom PCB designed, programmed, assembled, and soldered by hand.",

    objective:
      "Combine electronic design with detailed visual artwork in a functional circuit board.",

    technologies: [
      "PCB Design",
      "Soldering",
      "Embedded Programming",
      "Circuit Design",
    ],

    assetLabel: "HOLLOW PURPLE PCB IMAGE",
    image: "/assets/projects/gojo/front-irl.jpeg",
    imageAlt:
      "Assembled Gojo-inspired custom PCB with illuminated LEDs",
    detailLabel: "HARDWARE // HOLLOW PURPLE PCB",

    sections: [
      {
        id: "front-layout",
        title: "Front Layout",
        description:
          "The front copper, silkscreen, component placement, and character artwork were designed as one integrated visual circuit-board composition.",
        image: "/assets/projects/gojo/front-kicad.jpeg",
        imageAlt:
          "KiCad front-side layout of the Gojo-inspired custom PCB",
      },
      {
        id: "back-layout",
        title: "Back Layout",
        description:
          "The reverse side routes the supporting electronics while preserving the custom board silhouette and engraved quote.",
        image: "/assets/projects/gojo/back-kicad.jpeg",
        imageAlt:
          "KiCad back-side layout of the Gojo-inspired custom PCB",
      },
      {
        id: "assembly",
        title: "Assembly",
        description:
          "The fabricated board was assembled and soldered by hand, combining surface-mounted components, controls, and addressable lighting.",
        image: "/assets/projects/gojo/back-irl.jpeg",
        imageAlt:
          "Back side of the assembled Gojo-inspired custom PCB",
      },
      {
        id: "final-board",
        title: "Final Board",
        description:
          "The completed PCB combines functional lighting and controls with a character-shaped board outline and illustrated front artwork.",
        image: "/assets/projects/gojo/front-irl.jpeg",
        imageAlt:
          "Front side of the completed Gojo-inspired PCB with illuminated artwork",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/gojo/front-irl.jpeg",
        alt:
          "Completed Gojo-inspired custom PCB with illuminated front artwork",
        caption: "Completed front assembly",
      },
      {
        src: "/assets/projects/gojo/back-irl.jpeg",
        alt:
          "Back side of the assembled Gojo-inspired PCB",
        caption: "Assembled reverse side",
      },
      {
        src: "/assets/projects/gojo/front-kicad.jpeg",
        alt:
          "Front-side KiCad layout for the Gojo-inspired PCB",
        caption: "Front PCB layout",
      },
      {
        src: "/assets/projects/gojo/back-kicad.jpeg",
        alt:
          "Back-side KiCad layout for the Gojo-inspired PCB",
        caption: "Back PCB layout",
      },
    ],
  },

  {
    id: "file-cleaner",
    category: "software",
    title: "File Cleaner Utility",
    subtitle: "Storage management application",
    period: "2024",
    status: "COMPLETED",

    summary:
      "A utility for identifying unnecessary files and improving local storage organization.",

    objective:
      "Automate repetitive file-management and storage-cleanup tasks.",

    technologies: [
      "Python",
      "File Systems",
      "Automation",
      "Git",
    ],

    assetLabel: "FILE CLEANER SCREENSHOT",
    detailLabel: "SOFTWARE // FILE CLEANER",
  },
];

export function getVisibleProjects(
  category: ProjectCategory
): ProjectRecord[] {
  if (category === "featured") {
    return projects.filter((project) => project.featured);
  }

  return projects.filter(
    (project) => project.category === category
  );
}

export function getProjectById(
  id: ProjectId | null
): ProjectRecord | undefined {
  if (!id) return undefined;

  return projects.find((project) => project.id === id);
}
export function getCyberwareProjects(): ProjectRecord[] {
  return projects.filter(
    (project): project is ProjectRecord & { cyberware: CyberwareProfile } =>
      Boolean(project.cyberware)
  );
}