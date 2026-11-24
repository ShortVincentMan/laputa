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
      "Providing technical support to Cal Poly faculty and staff by diagnosing and resolving hardware, software, and network connectivity issues across Zone B.",
    details: [
      "Troubleshoot Windows and macOS hardware, software, peripheral, and network issues.",
      "Manage service requests through the university ticketing system and document resolutions.",
      "Support workstation deployment, account assistance, and day-to-day IT operations.",
      "Escalate complex technical issues while helping maintain reliable campus computing services.",
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
      "Managing organizational operations, financial planning, and internal systems for a student software organization building technology for nonprofit partners.",
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
      "Building a STEM learning platform for Kids First Initiative to expand access to educational content for underserved students.",
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
      "Provided IT engineering and technical support for local businesses across infrastructure, troubleshooting, onboarding, and documentation.",
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
      "Mentored high school students through engineering projects, internship preparation, and technical presentations.",
    details: [
      "Provided technical guidance and project-management support.",
      "Coached students in developing and pitching engineering concepts.",
      "Provided college, career, and internship guidance.",
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
      "Developed engineering concepts and gained experience in product design, technical communication, and project execution.",
    details: [
      "Worked on engineering and product-development initiatives.",
      "Developed project concepts and technical presentations.",
      "Collaborated with mentors and other student engineers.",
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
      "Pursuing a Bachelor of Science in Computer Engineering with an emphasis on embedded systems, computer architecture, electronics, and software development.",
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
      "Completed high school with a focus on engineering, athletics, leadership, and community involvement.",
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
      "Recognized for high academic performance during the 2025–2026 academic year.",
    details: [
      "Maintained a 3.83 cumulative GPA.",
      "Completed first-year Computer Engineering coursework while participating in technical organizations.",
    ],
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
  },
  {
    id: "families-care-about-you-scholarship",
    category: "achievements",
    title: "Families Care About You Engineering Scholarship",
    organization: "California Polytechnic State University",
    period: "2026",
    status: "COMPLETED",
    description:
      "Awarded the Families Care About You Engineering Scholarship in recognition of academic achievement and continued pursuit of an engineering degree.",
    details: [
      "Awarded through Cal Poly's College of Engineering scholarship program.",
      "Recognized for academic performance and commitment to engineering.",
    ],
  },
  {
    id: "pge-scholarship",
    category: "achievements",
    title: "Better Together STEM Scholarship",
    organization: "PG&E Corporation Foundation",
    period: "MAY 2025",
    status: "COMPLETED",
    description:
      "Awarded for academic performance, leadership, community involvement, and pursuit of a STEM discipline.",
  },
  {
    id: "nahas-scholarship",
    category: "achievements",
    title: "Robert T. Nahas Family Scholarship",
    organization: "Oakland-Alameda County Coliseum Foundation",
    period: "JUN 2025",
    status: "COMPLETED",
    description:
      "Awarded based on academics, community service, and participation in competitive school athletics.",
  },
];

export function getExperienceRecords(category: ExperienceCategory) {
  return experienceRecords.filter((record) => record.category === category);
}