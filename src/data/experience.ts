export type ExperienceCategory =
  | "experience"
  | "education"
  | "achievements";

export type ExperienceStatus = "ACTIVE" | "COMPLETED";

export type ExperienceLink = {
  label: string;
  href: string;
};

export type ExperienceRecord = {
  id: string;
  category: ExperienceCategory;
  title: string;
  organization: string;
  period: string;
  location?: string;
  status?: ExperienceStatus;
  description: string;
  details?: string[];
  technologies?: string[];
  link?: ExperienceLink;
};

export const experienceCategoryOrder: ExperienceCategory[] = [
  "experience",
  "education",
  "achievements",
];

export const experienceCategoryLabels: Record<ExperienceCategory, string> = {
  experience: "Professional Records",
  education: "Education",
  achievements: "Awards & Recognition",
};

export const experienceRecords: ExperienceRecord[] = [
  {
    id: "cal-poly-research",
    category: "experience",
    title: "Undergraduate Student Researcher",
    organization: "California Polytechnic State University",
    period: "MAY 2026 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "Summer Undergraduate Research Program project: a wearable, cable-driven tensegrity arm that helps bend the elbow.",
    details: [
      "Wrote ESP32 firmware in Arduino C++ (PlatformIO) that combines two BNO085 IMUs over UART into a relative elbow angle and runs a 6-state cable controller with calibration and fault states at 100 Hz.",
      "Designed a 2-layer KiCad PCB (fabricated by OSH Park) for the ESP32, both IMUs, and two A4988 stepper drivers, then brought it up on the worn prototype.",
      "Ran 18 IMU/EMG trials at 0 and 15 lb loads and traced the limited assist to cable pretension.",
      "Presented at the Oct 2026 symposium; the project was featured by the College of Engineering.",
      "Next up: an ML pipeline that classifies motion state from the logged IMU/EMG data.",
    ],
    technologies: [
      "ESP32",
      "Arduino C++",
      "PlatformIO",
      "KiCad",
      "BNO085 IMU",
      "EMG",
      "Python",
    ],
    link: {
      label: "Open GitHub repo",
      href: "https://github.com/ShortVincentMan/tensegrity-exoskeleton-public",
    },
  },
  {
    id: "cal-poly-its",
    category: "experience",
    title: "IT Student Assistant",
    organization: "Cal Poly Information Technology Services",
    period: "JUL 2026 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "I fix hardware, software, and network problems for Cal Poly faculty and staff across Zone B.",
    details: [
      "Resolved 30+ tickets, ranking #2 of Zone B technicians by volume, with 10+ five-star ratings.",
      "Troubleshoot Windows and macOS machines, peripherals, and network connections.",
      "Set up workstations and document each fix in the ticketing system.",
    ],
    technologies: [
      "Windows",
      "macOS",
      "Networking",
      "Technical Support",
      "IT Operations",
    ],
  },
  {
    id: "hack4impact-tech-lead",
    category: "experience",
    title: "Tech Lead (Co-Lead)",
    organization: "Hack4Impact Cal Poly",
    period: "AUG 2026 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "Co-leading 10 developers building a platform that replaces the San Luis Coastal Education Foundation's manual volunteer scheduling for 30 fellows across 15 schools.",
    details: [
      "Turn the product requirements document into Agile sprints and GitHub issues.",
      "Run pull-request code reviews and mentor developers.",
      "Designed the PostgreSQL schema and a Google OR-Tools constraint scheduler that matches volunteers to shifts and minimizes disruption when availability changes.",
    ],
    technologies: ["PostgreSQL", "Google OR-Tools", "Next.js", "TypeScript", "Agile"],
  },
  {
    id: "hack4impact-operations",
    category: "experience",
    title: "Director of Finance and Operations",
    organization: "Hack4Impact Cal Poly",
    period: "MAY 2026 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "I run the chapter's money and logistics so the project teams can focus on building software for nonprofits.",
    details: [
      "Manage chapter finances, budgeting, reimbursements, and operations logistics for the executive board.",
      "Support project teams and organization-wide initiatives.",
    ],
    technologies: ["Operations", "Finance", "Leadership", "Project Management"],
  },
  {
    id: "hack4impact-engineer",
    category: "experience",
    title: "Software Engineer",
    organization: "Hack4Impact Cal Poly",
    period: "NOV 2025 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "I built game modes and the cloud save system for Kids First Initiative's STEM learning platform.",
    details: [
      "Won 1st place out of 15 nonprofit software projects in Hack4Impact Cal Poly's year-long build cycle.",
      "Engineered two Unity game modes and fixed 25+ cascading gameplay and logic bugs.",
      "Built a cloud save system with a Next.js REST API and MongoDB so 100+ students pick up where they left off (the platform targets 1,000+).",
    ],
    technologies: ["Unity", "C#", "Next.js", "MongoDB", "Full-Stack"],
    link: {
      label: "Open project site",
      href: "https://kids-first-initiative-site.vercel.app/",
    },
  },
  {
    id: "cal-poly-racing",
    category: "experience",
    title: "Firmware Developer",
    organization: "Cal Poly Racing",
    period: "SEP 2025 — SEP 2026",
    location: "San Luis Obispo, CA",
    status: "COMPLETED",
    description:
      "Wrote firmware for the sensor CAN board on Cal Poly's electric Formula SAE car.",
    details: [
      "Developed C++17 FreeRTOS firmware and clock configuration for an STM32H573 (Cortex-M33) sensor board; one image runs as the front or rear node via a hardware ID pin.",
      "Scheduled 500, 100, and 20 Hz sampling tasks for strain gauges, shock and steering pots, thermistors, current sense, and a pitot sensor across 5 CAN message types.",
      "Decoupled sampling from transmission with a static 20-deep queue feeding a higher-priority FDCAN TX task (about 600 frames/s, no heap).",
      "Brought up the aero CAN board after it failed to flash: probed over JTAG, traced it to a wrong resistor value, and reworked it.",
    ],
    technologies: ["C++17", "FreeRTOS", "STM32", "FDCAN", "JTAG", "Soldering"],
  },
  {
    id: "level-up-msp",
    category: "experience",
    title: "IT Intern",
    organization: "Level Up MSP",
    period: "SUMMERS 2024 & 2025",
    location: "San Jose, CA",
    status: "COMPLETED",
    description:
      "IT for small and mid-size businesses: automation, troubleshooting, and documentation across dozens of clients.",
    details: [
      "Automated Azure backup monitoring with Python scripts for 25+ business clients, so failed backups got caught sooner.",
      "Fixed recurring BSOD and kernel failures across 50+ clients through root-cause analysis, taking uptime from days to weeks.",
      "Migrated company documentation from IT Glue to PerfectWiki and automated the transfer.",
      "Configured computers, networks, and accounts and supported employee onboarding.",
    ],
    technologies: ["Python", "Azure", "Windows", "Networking", "PerfectWiki", "Automation"],
  },
  {
    id: "pilotcity-mentor",
    category: "experience",
    title: "Engineering Mentor",
    organization: "PilotCity",
    period: "JUN 2025 — AUG 2025",
    location: "Bay Area, CA",
    status: "COMPLETED",
    description:
      "I mentored high school students through their engineering projects and pitches.",
    details: [
      "Gave technical and project-management help as teams built their projects.",
      "Coached students on developing and pitching engineering ideas.",
      "Answered questions about college, careers, and landing internships.",
    ],
    technologies: ["Mentorship", "Engineering Design", "Project Management", "Technical Communication"],
  },
  {
    id: "pilotcity-intern",
    category: "experience",
    title: "Project Development Intern",
    organization: "PilotCity",
    period: "MAY 2024 — AUG 2024",
    location: "San Leandro, CA",
    status: "COMPLETED",
    description:
      "My first engineering internship: I built a Python app with SQL that cleans up and repairs PC storage, and published it on GitHub.",
    details: [
      "Wrote a Python storage-cleanup tool with SQL integration that improved storage efficiency by about 30%.",
      "Pitched project concepts and presented technical work to mentors.",
      "Worked alongside other student engineers and industry mentors.",
    ],
    technologies: ["Product Development", "Engineering Design", "Prototyping"],
  },
  {
    id: "cal-poly-education",
    category: "education",
    title: "B.S. Computer Engineering",
    organization: "California Polytechnic State University",
    period: "2025 — 2029",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "B.S. in Computer Engineering. I'm focused on embedded systems, digital design, and robotics.",
    details: [
      "Current GPA: 3.83.",
      "Named to the 2025–2026 President's List.",
      "Coursework: Computer Organization (RISC-V), HDL & Digital Design, Circuit Analysis, System Software, Data Structures.",
      "Active in Hack4Impact, Cal Poly Racing, Nikkei Student Union, VSA, and Lion Dance.",
    ],
    technologies: ["Computer Engineering", "Embedded Systems", "Software", "Electronics"],
  },
  {
    id: "irvington-education",
    category: "education",
    title: "High School Diploma",
    organization: "Irvington High School",
    period: "2021 — 2025",
    location: "Fremont, CA",
    status: "COMPLETED",
    description:
      "Where I started building things, ran a hardware club, and wrestled.",
    details: [
      "Graduated with a 3.89 GPA.",
      "Founded and led the Hardware & Technology Club.",
      "Served as varsity wrestling captain.",
      "Competed in wrestling, track and field, and cross country.",
    ],
    technologies: ["Leadership", "Engineering", "Athletics", "Community Service"],
  },
  {
    id: "presidents-list",
    category: "achievements",
    title: "President's List",
    organization: "California Polytechnic State University",
    period: "2025 — 2026",
    status: "COMPLETED",
    description:
      "Cal Poly's yearly academic honor for the 2025–2026 year, earned with a 3.83 GPA.",
  },
  {
    id: "uncapher-scholarship",
    category: "achievements",
    title: "Keith Uncapher Memorial Computer Engineering Scholarship",
    organization: "Cal Poly Computer Engineering Department",
    period: "OCT 2026",
    status: "COMPLETED",
    description:
      "Computer Engineering department scholarship, recognized at the CPE Scholarship Recognition ceremony.",
  },
  {
    id: "hack4impact-first-place",
    category: "achievements",
    title: "1st Place, Hack4Impact Cal Poly",
    organization: "Hack4Impact Cal Poly",
    period: "2026",
    status: "COMPLETED",
    description:
      "Kids First Initiative placed first out of 15 nonprofit software projects in the chapter's year-long build cycle.",
  },
  {
    id: "coe-feature",
    category: "achievements",
    title: "Featured by Cal Poly College of Engineering",
    organization: "California Polytechnic State University",
    period: "NOV 2026",
    status: "COMPLETED",
    description:
      "My exoskeleton research was featured in the college's summer research highlights.",
    link: {
      label: "Read the article",
      href: "https://ceng.calpoly.edu/news/cal-poly-students-put-summer-research-work",
    },
  },
  {
    id: "families-care-about-you-scholarship",
    category: "achievements",
    title: "Families Care About You Engineering Scholarship",
    organization: "California Polytechnic State University",
    period: "2026",
    status: "COMPLETED",
    description:
      "College of Engineering scholarship for academic performance.",
  },
  {
    id: "pge-scholarship",
    category: "achievements",
    title: "Better Together STEM Scholarship",
    organization: "PG&E Corporation Foundation",
    period: "MAY 2025",
    status: "COMPLETED",
    description:
      "PG&E Foundation scholarship for students going into STEM, based on academics, leadership, and community work.",
  },
  {
    id: "nahas-scholarship",
    category: "achievements",
    title: "Robert T. Nahas Family Scholarship",
    organization: "Oakland-Alameda County Coliseum Foundation",
    period: "JUN 2025",
    status: "COMPLETED",
    description:
      "Awarded for academics, community service, and varsity athletics.",
  },
];

export function getExperienceRecords(category: ExperienceCategory) {
  return experienceRecords.filter((record) => record.category === category);
}