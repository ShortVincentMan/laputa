"use client";

import WindowFrame from "./WindowFrame";

type ExperienceWindowProps = {
  onClose: () => void;
};

type Experience = {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  technologies: string[];
  current?: boolean;
};

const experiences: Experience[] = [
  {
    period: "JUN 2026 — PRESENT",
    role: "Undergraduate Student Researcher",
    organization: "California Polytechnic State University",
    location: "San Luis Obispo, CA",
    description:
      "Researching feedback control of an upper-limb tensegrity exoskeleton by integrating IMU-based motion tracking and EMG-based muscle evaluation for wearable robotic rehabilitation systems.",
    technologies: [
      "IMU",
      "EMG",
      "Feedback Control",
      "Wearable Robotics",
      "Embedded Systems",
    ],
    current: true,
  },
  {
    period: "MAY 2026 — PRESENT",
    role: "Director of Finance and Operations",
    organization: "Hack4Impact Cal Poly",
    location: "San Luis Obispo, CA",
    description:
      "Managing organizational operations and financial planning while continuing software development work for nonprofit technology projects.",
    technologies: [
      "Operations",
      "Finance",
      "Leadership",
      "Project Management",
    ],
    current: true,
  },
  {
    period: "NOV 2025 — PRESENT",
    role: "Software Engineer",
    organization: "Hack4Impact Cal Poly",
    location: "San Luis Obispo, CA",
    description:
      "Building a STEM learning platform for Kids First Initiative. Developed features across gameplay, interface design, backend systems, and an end-to-end cloud save system connecting Unity game progress with MongoDB.",
    technologies: [
      "Unity",
      "C#",
      "Next.js",
      "MongoDB",
      "Full-Stack",
    ],
    current: true,
  },
  {
    period: "SEP 2025 — PRESENT",
    role: "Firmware Developer",
    organization: "Cal Poly Racing",
    location: "San Luis Obispo, CA",
    description:
      "Developing embedded C++ firmware for Cal Poly's electric Formula SAE race car, including CAN bus communication, FreeRTOS task scheduling, soldering, and board validation.",
    technologies: [
      "Embedded C++",
      "CAN Bus",
      "FreeRTOS",
      "PCB Validation",
      "Soldering",
    ],
    current: true,
  },
  {
    period: "JUN 2024 — AUG 2025",
    role: "Technical Support Intern",
    organization: "Level Up MSP",
    location: "San Jose, CA",
    description:
      "Supported local businesses through network setup, system configuration, employee onboarding, Windows troubleshooting, and backup-server maintenance. Migrated company databases and documentation from ITGlue to PerfectWiki.",
    technologies: [
      "Windows",
      "Networking",
      "ITGlue",
      "PerfectWiki",
      "Automation",
    ],
  },
  {
    period: "MAY 2024 — AUG 2024",
    role: "Project Development Intern",
    organization: "PilotCity",
    location: "San Leandro, CA",
    description:
      "Developed engineering projects and educational initiatives while gaining experience in product development, technical communication, and project execution.",
    technologies: [
      "Product Development",
      "Engineering Design",
      "Mentorship",
    ],
  },
];

export default function ExperienceWindow({
  onClose,
}: ExperienceWindowProps) {
  const activeCount = experiences.filter(
    (experience) => experience.current
  ).length;

  return (
    <WindowFrame
      title="Experience"
      subtitle="Career history // operational timeline"
      footer={`${experiences.length} records loaded // ${activeCount} active assignments`}
      onClose={onClose}
    >
      <div className="experienceWindow">
        <header className="experienceSummary">
          <div>
            <span className="dataLabel">
              PERSONNEL HISTORY
            </span>

            <h2>OPERATIONAL TIMELINE</h2>

            <p>
              Engineering, research, software, leadership, and
              technical infrastructure experience.
            </p>
          </div>

          <div className="experienceSummary__metrics">
            <div>
              <strong>{experiences.length}</strong>
              <span>Records</span>
            </div>

            <div>
              <strong>{activeCount}</strong>
              <span>Active</span>
            </div>

            <div>
              <strong>2024</strong>
              <span>First Record</span>
            </div>
          </div>
        </header>

        <div className="timeline">
          {experiences.map((experience, index) => (
            <article
              className="timelineEntry"
              key={`${experience.organization}-${experience.role}`}
            >
              <div className="timelineEntry__rail">
                <span className="timelineEntry__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="timelineEntry__line" />
              </div>

              <div className="timelineEntry__content">
                <header className="timelineEntry__header">
                  <div>
                    <span className="timelineEntry__period">
                      {experience.period}
                    </span>

                    <h2>{experience.role}</h2>

                    <h3>{experience.organization}</h3>
                  </div>

                  <div className="timelineEntry__metadata">
                    <span>{experience.location}</span>

                    <strong
                      className={
                        experience.current
                          ? "timelineEntry__active"
                          : ""
                      }
                    >
                      <span />
                      {experience.current
                        ? "ACTIVE"
                        : "ARCHIVED"}
                    </strong>
                  </div>
                </header>

                <p className="timelineEntry__description">
                  {experience.description}
                </p>

                <div className="technologyList">
                  {experience.technologies.map(
                    (technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}