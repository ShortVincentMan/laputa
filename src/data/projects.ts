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
  | "racing-canboard"
  | "slcef-scheduler";

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
    subtitle: "Wearable arm blades with motion sensing",
    period: "2024 — 2025",
    status: "COMPLETED",

    summary:
      "Forearm-mounted blades that deploy on command, inspired by the Mantis Blades from Cyberpunk 2077. An MPU-6050 detects the motion and an Arduino Nano drives the servos.",

    objective:
      "Turn a piece of fictional cyberware into something I could actually wear and trigger.",

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
          "I started from the game's Mantis Blades and worked out what a wearable, real-world version would need: a forearm mount, a fold-out mechanism, and a way to trigger it.",
        image:
          "/assets/projects/mantis-blades/inspiration.jpg",
        imageAlt:
          "Cyberpunk 2077 Mantis Blades design reference",
      },
      {
        id: "mechanical-design",
        title: "Mechanical Design",
        description:
          "I modeled the blade housing, forearm mount, and deployment linkage in Fusion 360 before printing anything.",
        image: "/assets/projects/mantis-blades/cad.png",
        imageAlt: "Mantis Blades CAD model",
      },
      {
        id: "fabrication",
        title: "Fabrication",
        description:
          "Every part went through several rounds of 3D printing, test fitting, and reprinting until the mechanism moved cleanly.",
        image:
          "/assets/projects/mantis-blades/fabrication.png",
        imageAlt:
          "Fabricated Mantis Blades components and assembly",
      },
      {
        id: "electronics",
        title: "Electronics",
        description:
          "An Arduino Nano reads the MPU-6050 and drives the servos, with everything mounted on the arm.",
        image:
          "/assets/projects/mantis-blades/electronics.png",
        imageAlt:
          "Mantis Blades Arduino and electronics prototype",
      },
      {
        id: "firmware",
        title: "Firmware",
        description:
          "The Arduino C++ firmware reads the IMU and drives the servos to deploy or retract the blades.",
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
    subtitle: "Firmware, PCB, and testing for a wearable elbow assist",
    period: "MAY 2026 — PRESENT",
    status: "ACTIVE",

    summary:
      "A cable-driven tensegrity arm for the elbow. I wrote the ESP32 firmware that turns two BNO085 IMUs into an elbow angle and drives the cable motors, and designed the 2-layer PCB that runs it.",

    objective:
      "Build a low-cost, flexible exoskeleton that tracks the arm and helps lift, then use 18 logged IMU/EMG trials to find out why the assist was limited.",

    technologies: [
      "ESP32",
      "Arduino C++",
      "PlatformIO",
      "KiCad",
      "BNO085 IMU",
      "EMG",
    ],

    assetLabel: "EXOSKELETON RESEARCH VISUAL",
    image: "/assets/projects/exoskeleton-symposium.jpg",
    imageAlt:
      "Vincent wearing the exoskeleton while presenting his poster at the SURP+ Research Poster Symposium",
    detailLabel: "RESEARCH // TENSEGRITY EXOSKELETON",

    sections: [
      {
        id: "prototype",
        title: "Prototype",
        description:
          "The arm is a tensegrity structure: rigid struts held in shape by cables. That keeps it light and flexible, and pulling the cables bends the elbow.",
        image: "/assets/personal/exoskeleton.jpeg",
        imageAlt:
          "Upper-limb tensegrity exoskeleton prototype being worn during early testing",
      },
      {
        id: "fit-testing",
        title: "Fit Testing",
        description:
          "I ran fit tests to check alignment, comfort, and range of motion, and whether the arm followed my elbow instead of fighting it.",
        image: "/assets/personal/exoskeleton2.jpeg",
        imageAlt:
          "Wearable fit test of the upper-limb tensegrity exoskeleton",
      },
      {
        id: "arm-assembly",
        title: "Arm Assembly",
        description:
          "Two stepper motors wind the cables on spools. Cable pretension turned out to matter most: the 18 logged trials showed it limited how much the arm could assist.",
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
        "Cable-driven elbow exoskeleton with dual-IMU angle sensing, an ESP32 controller, and a custom PCB.",
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
      "// WORK IN PROGRESS // A wearable modular spinal platform combining structural support, distributed batteries, sensing, and future telemetry  interfaces. // WORK IN PROGRESS // ",

    objective:
      "Design a wearable, articulated backbone that can carry batteries and electronics without restricting how I move.",

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
          "It's a chain of modular vertebrae. Each one gives structure, a joint, and a protected bay for batteries or sensors later on. So far it's mechanical design and CAD.",
        image: "/assets/projects/spinal-battery.png",
        imageAlt:
          "CAD model of the modular vertebral architecture and articulated joints",
      },
      {
        id: "range-of-motion",
        title: "Range of Motion",
        description:
          "I'm tuning joint geometry and hard stops so the spine bends like a real one without folding further than a back can.",
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
    period: "2025 — 2026",
    status: "COMPLETED",

    summary:
      "A STEM learning platform built with Hack4Impact for Kids First Initiative. It took 1st place out of 15 projects, and 100+ students use it.",

    objective:
      "Give kids in underserved schools hands-on STEM activities they can keep coming back to.",

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
          "Students play the activities, and facilitators get a separate view to manage classrooms and track progress.",
        image: "/assets/projects/kfi/landing.png",
        imageAlt:
          "Kids First Initiative platform landing screen with student and facilitator options",
      },
      {
        id: "activity-selection",
        title: "Activity Selection",
        description:
          "Students pick from guided activities on matter, fluid systems, and energy.",
        image: "/assets/projects/kfi/hero.jpeg",
        imageAlt:
          "Kids First Initiative activity selection screen",
      },
      {
        id: "fluid-systems",
        title: "Fluid Systems",
        description:
          "In the pipe activity, students build a route for water and deal with it freezing along the way. I built two of the Unity game modes.",
        image: "/assets/projects/kfi/fluids.png",
        imageAlt:
          "Kids First Initiative pipe activity showing a frozen-water route puzzle",
      },
      {
        id: "energy-systems",
        title: "Energy Systems",
        description:
          "In the energy activity, students wire up a circuit to get power where it needs to go.",
        image: "/assets/projects/kfi/gas.png",
        imageAlt:
          "Kids First Initiative energy activity showing connected wires and a power control",
      },
      {
        id: "team",
        title: "Team Recognition",
        description:
          "Our team took 1st place out of 15 projects in Hack4Impact Cal Poly's year-long build cycle. I also built the cloud save system (Next.js API + MongoDB) so students keep their progress.",
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
      "This site. A portfolio built as a fictional operating system, inspired by the menus in Cyberpunk 2077.",

    objective:
      "Show my projects in a way that feels like exploring a system instead of scrolling a résumé.",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "CSS",
      "Figma",
    ],

    assetLabel: "LAPUTA OS INTERFACE CAPTURE",
    image: "/assets/projects/laputa/desktop-projects.jpg",
    imageAlt: "Landing Screen of the Laputa OS portfolio interface",
    detailLabel: "SOFTWARE // LAPUTA OS",

    sections: [
      {
        id: "interface",
        title: "Interface System",
        description:
          "Every window, menu, and HUD element is a hand-written React component, with no UI library. Keyboard, mouse, and reduced-motion all work.",
        image: "/assets/projects/laputa/laputa.jpeg",
        imageAlt: "Laputa OS portfolio interface",
      },
      {
        id: "project-archive",
        title: "Project Archive",
        description:
          "All the content lives in typed TypeScript records. Scripts in CI check that every image exists, every cross-link is valid, and the page stays under its JavaScript budget.",
        image: "/assets/projects/laputa/desktop-projects.jpg",
        imageAlt: "Laputa OS project archive interface",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/laputa/desktop-experience.jpg",
        alt: "Experience window showing a research record",
        caption: "Experience window",
      },
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
      "A sandbox that maps itself. A depth camera reads the sand and a projector paints elevation colors back onto it in real time.",

    objective:
      "Make topography something you can shape with your hands and see change instantly.",

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
          "As you move sand, the depth camera picks up the new surface and the projected colors update to match.",
        image: "/assets/projects/ar-sand-table.jpeg",
        imageAlt:
          "Projected elevation colors displayed across the physical sand surface",
      },
    ],

    gallery: [
      {
        src: "/assets/projects/ar-sand-table.jpeg",
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
      "A seven-story coastal building I modeled during an architecture fellowship with Eugene Tssui.",

    objective:
      "Learn organic architecture and large-scale 3D modeling from a working architect.",

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
          "The final design is a seven-story coastal structure shaped by organic architecture, with curves instead of boxes.",
        image: "/assets/projects/trimtab/final-form-render.png",
        imageAlt: "Final form render of the Trimtab architectural study",
      },
      {
        id: "blueprint-setup",
        title: "Reference Setup",
        description:
          "I lined up the blueprint references on construction planes to lock in the scale and main geometry.",
        image: "/assets/projects/trimtab/blueprint-reference-setup.png",
        imageAlt: "Blueprint reference setup used to model Trimtab",
      },
      {
        id: "form-development",
        title: "Form Development",
        description:
          "I iterated the form through layered surface modeling and proportion studies.",
        image: "/assets/projects/trimtab/form-development-03.png",
        imageAlt: "Intermediate Trimtab form development model",
      },
      {
        id: "wireframe",
        title: "Multi-View Modeling",
        description:
          "I checked continuity and silhouette from multiple orthographic and perspective views.",
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
      "A character-shaped ATtiny85 board I designed in KiCad for CSC 123, then hand-soldered and programmed over ISP with an Arduino.",

    objective:
      "Make a board that works as electronics and also looks good as art.",

    technologies: [
      "KiCad",
      "ATtiny85",
      "Arduino as ISP",
      "Soldering",
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
          "I laid out the front copper, silkscreen, and parts together with the character art, so the circuit is part of the picture.",
        image: "/assets/projects/gojo/front-kicad.jpeg",
        imageAlt:
          "KiCad front-side layout of the Gojo-inspired custom PCB",
      },
      {
        id: "back-layout",
        title: "Back Layout",
        description:
          "The back carries most of the routing, keeping the custom outline and the quote on the silkscreen clean.",
        image: "/assets/projects/gojo/back-kicad.jpeg",
        imageAlt:
          "KiCad back-side layout of the Gojo-inspired custom PCB",
      },
      {
        id: "assembly",
        title: "Assembly",
        description:
          "I soldered the surface-mount parts by hand and flashed the ATtiny85 over the 2×3 ISP header, using an Arduino as the programmer.",
        image: "/assets/projects/gojo/back-irl.jpeg",
        imageAlt:
          "Back side of the assembled Gojo-inspired custom PCB",
      },
      {
        id: "final-board",
        title: "Final Board",
        description:
          "The finished board lights up and responds to its button, all in a character-shaped outline.",
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
    id: "racing-canboard",
    category: "hardware",
    title: "Formula SAE Sensor CAN Board",
    subtitle: "FreeRTOS firmware for Cal Poly Racing",
    period: "SEP 2025 — SEP 2026",
    status: "COMPLETED",
    summary:
      "Firmware for the sensor data board on Cal Poly Racing's electric Formula SAE car. It samples the car's sensors and puts the readings on the CAN bus.",
    objective:
      "Read strain gauges, suspension and steering pots, thermistors, current sense, and a pitot sensor at fixed rates without ever blocking the CAN transmit path.",
    technologies: ["C++17", "FreeRTOS", "STM32H573", "FDCAN", "JTAG"],
    assetLabel: "CAN BOARD FIRMWARE DIAGRAM",
    image: "/assets/projects/racing-canboard-diagram.jpg",
    imageAlt:
      "Diagram: 500, 100 and 20 Hz sampling tasks feed a static queue drained by a higher-priority FDCAN transmit task",
    detailLabel: "HARDWARE // SENSOR CAN BOARD",
    sections: [
      {
        id: "tasks",
        title: "Task Layout",
        description:
          "Three sampling tasks run at 500, 100, and 20 Hz and push readings into a static 20-deep queue. A higher-priority FDCAN transmit task drains it, about 600 frames per second across 5 message types, with no heap allocation.",
      },
      {
        id: "one-image",
        title: "One Image, Two Nodes",
        description:
          "The same firmware image runs as the front or rear node. A hardware ID pin picks which sensors and message IDs it uses.",
      },
      {
        id: "bring-up",
        title: "Board Bring-Up",
        description:
          "The aero CAN board wouldn't flash. I probed it over JTAG, traced the problem to a wrong resistor value, and reworked the board by hand.",
      },
    ],
  },
  {
    id: "slcef-scheduler",
    category: "software",
    title: "SLCEF Volunteer Scheduler",
    subtitle: "Hack4Impact tech lead project",
    period: "AUG 2026 — PRESENT",
    status: "IN DEVELOPMENT",
    summary:
      "A platform for the San Luis Coastal Education Foundation that replaces manual volunteer scheduling for 30 fellows across 15 schools. I co-lead the 10-person team.",
    objective:
      "Match volunteers to school shifts automatically and reshuffle as little as possible when someone's availability changes.",
    technologies: ["PostgreSQL", "Google OR-Tools", "Next.js", "TypeScript", "Agile"],
    assetLabel: "SCHEDULER FLOW DIAGRAM",
    image: "/assets/projects/slcef-scheduler-diagram.jpg",
    imageAlt:
      "Diagram: availability and shift data in PostgreSQL feed an OR-Tools model that minimizes changes to the existing schedule",
    detailLabel: "SOFTWARE // SLCEF SCHEDULER",
    sections: [
      {
        id: "scheduler",
        title: "Constraint Scheduler",
        description:
          "I designed the PostgreSQL schema and a Google OR-Tools constraint model that assigns volunteers to shifts and minimizes disruption to the existing schedule when availability changes.",
      },
      {
        id: "team",
        title: "Running the Team",
        description:
          "I turn the product requirements document into sprints and GitHub issues, review pull requests, and mentor the developers.",
      },
    ],
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
