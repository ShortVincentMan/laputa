"use client";

import WindowFrame from "./WindowFrame";

type ExperienceWindowProps = {
  onClose: () => void;
};

const experiences = [
  {
    period: "SUMMER 2026",
    role: "Undergraduate Researcher",
    organization: "Cal Poly",
    description:
      "Developing feedback control systems for an upper-limb tensegrity exoskeleton using IMU and EMG sensors.",
  },
  {
    period: "2025 — PRESENT",
    role: "Computer Engineering Student",
    organization: "California Polytechnic State University",
    description:
      "Studying embedded systems, electronics, software engineering, and computer architecture.",
  },
  {
    period: "PREVIOUS",
    role: "Engineering Project Developer",
    organization: "Independent Projects",
    description:
      "Designed and built wearable robotics, Arduino systems, CAD assemblies, and augmented-reality prototypes.",
  },
];

export default function ExperienceWindow({
  onClose,
}: ExperienceWindowProps) {
  return (
    <WindowFrame
      title="Experience"
      subtitle="Employment records // academic operations"
      footer={`${experiences.length} records detected`}
      onClose={onClose}
    >
      <div className="recordList">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.role}-${experience.period}`}
            className="recordCard"
          >
            <div className="recordCard__index">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="recordCard__content">
              <span className="recordCard__eyebrow">
                {experience.period}
              </span>

              <h2>{experience.role}</h2>

              <h3>{experience.organization}</h3>

              <p>{experience.description}</p>
            </div>

            <div className="recordCard__status">
              <span />
              VERIFIED
            </div>
          </article>
        ))}
      </div>
    </WindowFrame>
  );
}