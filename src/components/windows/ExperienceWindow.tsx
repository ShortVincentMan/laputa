"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import WindowFrame from "./WindowFrame";
import "./experience-window.css";

type ExperienceWindowProps = {
  onClose: () => void;
};

type ExperienceCategory =
  | "experience"
  | "education"
  | "achievements";

type ExperienceRecord = {
  id: string;
  category: ExperienceCategory;
  title: string;
  organization: string;
  period: string;
  location?: string;
  status?: "ACTIVE" | "COMPLETED";
  description: string;
  details?: string[];
  technologies?: string[];
  link?: {
    label: string;
    href: string;
  };
};

const categoryLabels: Record<
  ExperienceCategory,
  string
> = {
  experience: "Experience",
  education: "Education",
  achievements: "Achievements",
};

const records: ExperienceRecord[] = [
  {
    id: "cal-poly-research",
    category: "experience",
    title: "Undergraduate Student Researcher",
    organization:
      "California Polytechnic State University",
    period: "JUN 2026 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "Researching feedback control of an upper-limb tensegrity exoskeleton for wearable rehabilitation and motion-assistance applications.",
    details: [
      "Integrating IMU-based motion tracking into the exoskeleton control architecture.",
      "Evaluating muscle activity through EMG sensing and signal analysis.",
      "Supporting sensor selection, electronics design, testing, and iterative prototype refinement.",
      "Documenting design decisions and experimental results for continued research.",
    ],
    technologies: [
      "IMU",
      "EMG",
      "Feedback Control",
      "Embedded Systems",
      "Wearable Robotics",
    ],
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
      "Managing organizational operations, financial planning, and internal processes for a student software organization building technology for nonprofit partners.",
    details: [
      "Coordinate financial planning and operational logistics.",
      "Support project teams and organization-wide initiatives.",
      "Continue contributing technical experience from the software engineering team.",
    ],
    technologies: [
      "Operations",
      "Finance",
      "Leadership",
      "Project Management",
    ],
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
      "Building a STEM learning platform for Kids First Initiative, designed to expand access to educational content for underserved students.",
    details: [
      "Shipped features across gameplay, interface design, and backend systems.",
      "Built an end-to-end cloud save system connecting Unity game progress to MongoDB.",
      "Worked across Unity, C#, Next.js, and MongoDB.",
      "Contributed to a platform targeting more than 1,000 students.",
    ],
    technologies: [
      "Unity",
      "C#",
      "Next.js",
      "MongoDB",
      "Full-Stack Development",
    ],
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
    period: "SEP 2025 — PRESENT",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "Developing embedded firmware and validating electronics for Cal Poly's electric Formula SAE race car.",
    details: [
      "Develop embedded C++ firmware for vehicle systems.",
      "Work with CAN bus communication between electronic control modules.",
      "Use FreeRTOS task scheduling for real-time embedded behavior.",
      "Assist with soldering, board validation, and electronics integration.",
    ],
    technologies: [
      "Embedded C++",
      "CAN Bus",
      "FreeRTOS",
      "PCB Validation",
      "Soldering",
    ],
  },
  {
    id: "level-up-msp",
    category: "experience",
    title: "Technical Support Intern",
    organization: "Level Up MSP",
    period: "JUN 2024 — AUG 2025",
    location: "San Jose, CA",
    status: "COMPLETED",
    description:
      "Provided IT engineering and technical support for local businesses across infrastructure, troubleshooting, onboarding, and documentation.",
    details: [
      "Configured computers, networks, accounts, and business systems.",
      "Diagnosed recurring Windows failures and hardware issues.",
      "Maintained backup servers and supported employee onboarding.",
      "Migrated company documentation from ITGlue to PerfectWiki.",
      "Developed automation for documentation-transfer workflows.",
    ],
    technologies: [
      "Windows",
      "Networking",
      "ITGlue",
      "PerfectWiki",
      "Automation",
    ],
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
    technologies: [
      "Mentorship",
      "Engineering Design",
      "Project Management",
      "Technical Communication",
    ],
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
    technologies: [
      "Product Development",
      "Engineering Design",
      "Prototyping",
    ],
  },
  {
    id: "cal-poly-education",
    category: "education",
    title: "B.S. Computer Engineering",
    organization:
      "California Polytechnic State University",
    period: "2025 — 2029",
    location: "San Luis Obispo, CA",
    status: "ACTIVE",
    description:
      "Pursuing a Bachelor of Science in Computer Engineering with an emphasis on embedded systems, computer architecture, electronics, and software development.",
    details: [
      "Current GPA: 3.83.",
      "Named to the 2025–2026 President's List.",
      "Coursework includes Data Structures and Algorithms, Computer Organization, and Linear Analysis.",
      "Active in Hack4Impact, Cal Poly Racing, Nikkei Student Union, VSA, and Lion Dance.",
    ],
    technologies: [
      "Computer Engineering",
      "Embedded Systems",
      "Software",
      "Electronics",
    ],
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
    technologies: [
      "Leadership",
      "Engineering",
      "Athletics",
      "Community Service",
    ],
  },
  {
    id: "presidents-list",
    category: "achievements",
    title: "President's List",
    organization:
      "California Polytechnic State University",
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
    organization:
      "Oakland-Alameda County Coliseum Foundation",
    period: "JUN 2025",
    status: "COMPLETED",
    description:
      "Awarded based on academics, community service, and participation in competitive school athletics.",
  },
];

export default function ExperienceWindow({
  onClose,
}: ExperienceWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<ExperienceCategory>("experience");

  const visibleRecords = useMemo(
    () =>
      records.filter(
        (record) =>
          record.category === activeCategory
      ),
    [activeCategory]
  );

  const [selectedId, setSelectedId] =
    useState<string>(visibleRecords[0]?.id ?? "");

  const selectedRecord =
    visibleRecords.find(
      (record) => record.id === selectedId
    ) ?? visibleRecords[0];

  const selectCategory = useCallback(
    (category: ExperienceCategory) => {
      const firstRecord = records.find(
        (record) => record.category === category
      );

      setActiveCategory(category);
      setSelectedId(firstRecord?.id ?? "");
    },
    []
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (!selectedRecord) {
        return;
      }

      const currentIndex = visibleRecords.findIndex(
        (record) => record.id === selectedRecord.id
      );

      if (currentIndex === -1) {
        return;
      }

      const nextIndex =
        (currentIndex +
          direction +
          visibleRecords.length) %
        visibleRecords.length;

      setSelectedId(visibleRecords[nextIndex].id);
    },
    [selectedRecord, visibleRecords]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        moveSelection(1);
      }

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w"
      ) {
        event.preventDefault();
        moveSelection(-1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        const order: ExperienceCategory[] = [
          "experience",
          "education",
          "achievements",
        ];

        const currentIndex =
          order.indexOf(activeCategory);

        selectCategory(
          order[
            (currentIndex - 1 + order.length) %
              order.length
          ]
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        const order: ExperienceCategory[] = [
          "experience",
          "education",
          "achievements",
        ];

        const currentIndex =
          order.indexOf(activeCategory);

        selectCategory(
          order[(currentIndex + 1) % order.length]
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeCategory,
    moveSelection,
    selectCategory,
  ]);

  const tabs = (
    <div className="experienceTabs">
      {(
        Object.keys(
          categoryLabels
        ) as ExperienceCategory[]
      ).map((category) => (
        <button
          key={category}
          type="button"
          className={
            activeCategory === category
              ? "experienceTabs__button experienceTabs__button--active"
              : "experienceTabs__button"
          }
          onClick={() => selectCategory(category)}
        >
          <span>
            {String(
              records.filter(
                (record) =>
                  record.category === category
              ).length
            ).padStart(2, "0")}
          </span>

          {categoryLabels[category]}
        </button>
      ))}
    </div>
  );

  return (
    <WindowFrame
      title="Experience"
      subtitle="Personnel archive // operational history"
      tabs={tabs}
      footer={`${visibleRecords.length} ${categoryLabels[
        activeCategory
      ].toLowerCase()} records loaded`}
      className="experienceFrame"
      onClose={onClose}
    >
      <div className="experienceInterface">
        <aside
          className="experienceList"
          aria-label={`${categoryLabels[activeCategory]} records`}
        >
          <header className="experienceList__header">
            <div>
              <span>DATABASE INDEX</span>
              <strong>
                {categoryLabels[activeCategory]}
              </strong>
            </div>

            <span>
              {String(visibleRecords.length).padStart(
                2,
                "0"
              )}
            </span>
          </header>

          <div className="experienceList__records">
            {visibleRecords.map((record, index) => {
              const isSelected =
                selectedRecord?.id === record.id;

              return (
                <button
                  key={record.id}
                  type="button"
                  className={
                    isSelected
                      ? "experienceRecord experienceRecord--selected"
                      : "experienceRecord"
                  }
                  onClick={() =>
                    setSelectedId(record.id)
                  }
                  aria-pressed={isSelected}
                >
                  <span className="experienceRecord__index">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="experienceRecord__text">
                    <strong>{record.title}</strong>
                    <span>{record.organization}</span>
                  </span>

                  <span className="experienceRecord__marker">
                    {isSelected ? "◆" : "◇"}
                  </span>
                </button>
              );
            })}
          </div>

          <footer className="experienceList__footer">
            <span>W/S</span>
            Navigate records
          </footer>
        </aside>

        {selectedRecord && (
          <article
            className="experienceDetails"
            key={selectedRecord.id}
          >
            <header className="experienceDetails__header">
              <div className="experienceDetails__identity">
                <span className="experienceDetails__eyebrow">
                  SELECTED RECORD //{" "}
                  {selectedRecord.period}
                </span>

                <h2>{selectedRecord.title}</h2>

                <h3>
                  {selectedRecord.organization}
                </h3>
              </div>

              <div className="experienceDetails__status">
                <span
                  className={
                    selectedRecord.status === "ACTIVE"
                      ? "experienceDetails__statusDot experienceDetails__statusDot--active"
                      : "experienceDetails__statusDot"
                  }
                />

                <div>
                  <span>Record Status</span>
                  <strong>
                    {selectedRecord.status ??
                      "COMPLETED"}
                  </strong>
                </div>
              </div>
            </header>

            <div className="experienceDetails__metadata">
              <div>
                <span>Timeline</span>
                <strong>
                  {selectedRecord.period}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {selectedRecord.location ??
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>Classification</span>
                <strong>
                  {
                    categoryLabels[
                      selectedRecord.category
                    ]
                  }
                </strong>
              </div>
            </div>

            <section className="experienceDetails__section">
              <div className="experienceSectionTitle">
                <span>01</span>
                <strong>Overview</strong>
              </div>

              <p className="experienceDetails__description">
                {selectedRecord.description}
              </p>
            </section>

            {selectedRecord.details &&
              selectedRecord.details.length > 0 && (
                <section className="experienceDetails__section">
                  <div className="experienceSectionTitle">
                    <span>02</span>
                    <strong>
                      Operational Details
                    </strong>
                  </div>

                  <ul className="experienceDetails__details">
                    {selectedRecord.details.map(
                      (detail) => (
                        <li key={detail}>
                          <span />
                          <p>{detail}</p>
                        </li>
                      )
                    )}
                  </ul>
                </section>
              )}

            {selectedRecord.technologies &&
              selectedRecord.technologies.length >
                0 && (
                <section className="experienceDetails__section">
                  <div className="experienceSectionTitle">
                    <span>03</span>
                    <strong>
                      Systems and Technologies
                    </strong>
                  </div>

                  <div className="experienceTechnologyList">
                    {selectedRecord.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </section>
              )}

            {selectedRecord.link && (
              <a
                className="experienceDetails__link"
                href={selectedRecord.link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>Open external record</span>
                <strong>
                  {selectedRecord.link.label}
                </strong>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <footer className="experienceDetails__footer">
              <span>
                RECORD ID //{" "}
                {selectedRecord.id.toUpperCase()}
              </span>

              <strong>VERIFIED</strong>
            </footer>
          </article>
        )}
      </div>
    </WindowFrame>
  );
}