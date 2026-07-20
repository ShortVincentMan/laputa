"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import WindowFrame from "@/components/windows/WindowFrame";

import "./projects-window.css";

type ProjectsWindowProps = {
  onClose: () => void;
};

type ProjectCategory =
  | "featured"
  | "hardware"
  | "software"
  | "research"
  | "archive";

type ProjectStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "IN DEVELOPMENT"
  | "PLANNED";

type ProjectRecord = {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  period: string;
  status: ProjectStatus;
  summary: string;
  objective: string;
  technologies: string[];
  assetLabel: string;
  featured?: boolean;
};

const categoryLabels: Record<
  ProjectCategory,
  string
> = {
  featured: "Featured",
  hardware: "Hardware",
  software: "Software",
  research: "Research",
  archive: "Archive",
};

const categoryOrder: ProjectCategory[] = [
  "featured",
  "hardware",
  "software",
  "research",
  "archive",
];

const projects: ProjectRecord[] = [
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
    featured: true,
  },
  {
    id: "mantis-blades",
    category: "hardware",
    title: "Mantis Blades",
    subtitle: "Wearable robotic mechanism",
    period: "2024 — 2025",
    status: "COMPLETED",
    summary:
      "A servo-actuated wearable recreation inspired by the Mantis Blades from Cyberpunk 2077.",
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
    featured: true,
  },
  {
    id: "kids-first-platform",
    category: "software",
    title: "Kids First STEM Platform",
    subtitle: "Educational game and cloud platform",
    period: "2025 — PRESENT",
    status: "ACTIVE",
    summary:
      "A STEM learning platform developed with Hack4Impact for Kids First Initiative.",
    objective:
      "Expand access to interactive STEM education for more than 1,000 students from underserved communities.",
    technologies: [
      "Unity",
      "C#",
      "Next.js",
      "MongoDB",
      "Cloud Save",
    ],
    assetLabel: "KIDS FIRST PLATFORM PREVIEW",
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
  },
];

function getVisibleProjects(
  category: ProjectCategory
) {
  if (category === "featured") {
    return projects.filter(
      (project) => project.featured
    );
  }

  return projects.filter(
    (project) => project.category === category
  );
}

export default function ProjectsWindow({
  onClose,
}: ProjectsWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("featured");

  const visibleProjects = useMemo(
    () => getVisibleProjects(activeCategory),
    [activeCategory]
  );

  const [selectedId, setSelectedId] =
    useState<string>(
      getVisibleProjects("featured")[0]?.id ?? ""
    );

  const selectedProject =
    visibleProjects.find(
      (project) => project.id === selectedId
    ) ?? visibleProjects[0];

  const selectCategory = useCallback(
    (category: ProjectCategory) => {
      const nextProjects =
        getVisibleProjects(category);

      setActiveCategory(category);
      setSelectedId(nextProjects[0]?.id ?? "");
    },
    []
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (
        visibleProjects.length === 0 ||
        !selectedProject
      ) {
        return;
      }

      const currentIndex =
        visibleProjects.findIndex(
          (project) =>
            project.id === selectedProject.id
        );

      const nextIndex =
        (currentIndex +
          direction +
          visibleProjects.length) %
        visibleProjects.length;

      setSelectedId(
        visibleProjects[nextIndex].id
      );
    },
    [selectedProject, visibleProjects]
  );

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
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

        const currentIndex =
          categoryOrder.indexOf(activeCategory);

        const nextCategory =
          categoryOrder[
            (currentIndex -
              1 +
              categoryOrder.length) %
              categoryOrder.length
          ];

        selectCategory(nextCategory);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        const currentIndex =
          categoryOrder.indexOf(activeCategory);

        const nextCategory =
          categoryOrder[
            (currentIndex + 1) %
              categoryOrder.length
          ];

        selectCategory(nextCategory);
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
    <div className="projectTabs">
      {categoryOrder.map((category) => {
        const count =
          getVisibleProjects(category).length;

        return (
          <button
            key={category}
            type="button"
            className={
              activeCategory === category
                ? "projectTabs__button projectTabs__button--active"
                : "projectTabs__button"
            }
            onClick={() =>
              selectCategory(category)
            }
          >
            <span>
              {String(count).padStart(2, "0")}
            </span>

            {categoryLabels[category]}
          </button>
        );
      })}
    </div>
  );

  return (
    <WindowFrame
      title="Projects"
      subtitle="Journal archive // engineering records"
      sectionLabel="JOURNAL"
      tabs={tabs}
      footer={`${visibleProjects.length} ${categoryLabels[
        activeCategory
      ].toLowerCase()} records loaded`}
      className="projectsFrame"
      onClose={onClose}
    >
      <div className="projectsJournal">
        <aside className="projectJournalList">
          <header className="projectJournalList__header">
            <div>
              <span>JOURNAL DATABASE</span>

              <strong>
                {categoryLabels[activeCategory]}
              </strong>
            </div>

            <span>
              {String(
                visibleProjects.length
              ).padStart(2, "0")}
            </span>
          </header>

          <div className="projectJournalList__records">
            {visibleProjects.map(
              (project, index) => {
                const isSelected =
                  selectedProject?.id ===
                  project.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    className={
                      isSelected
                        ? "projectJournalRecord projectJournalRecord--selected"
                        : "projectJournalRecord"
                    }
                    onClick={() =>
                      setSelectedId(project.id)
                    }
                    aria-pressed={isSelected}
                  >
                    <span className="projectJournalRecord__index">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="projectJournalRecord__identity">
                      <strong>
                        {project.title}
                      </strong>

                      <span>
                        {project.subtitle}
                      </span>
                    </span>

                    <span className="projectJournalRecord__status">
                      {project.status}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <footer className="projectJournalList__footer">
            <span>W/S</span>
            Navigate projects
          </footer>
        </aside>

        {selectedProject && (
          <article
            className="projectJournalDetails"
            key={selectedProject.id}
          >
            <header className="projectJournalDetails__header">
              <div>
                <span className="projectJournalDetails__eyebrow">
                  SELECTED JOURNAL ENTRY //{" "}
                  {selectedProject.period}
                </span>

                <h2>
                  {selectedProject.title}
                </h2>

                <p>
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="projectJournalDetails__status">
                <span
                  className={
                    selectedProject.status ===
                      "ACTIVE" ||
                    selectedProject.status ===
                      "IN DEVELOPMENT"
                      ? "projectJournalDetails__statusDot projectJournalDetails__statusDot--active"
                      : "projectJournalDetails__statusDot"
                  }
                />

                <div>
                  <span>Record Status</span>

                  <strong>
                    {selectedProject.status}
                  </strong>
                </div>
              </div>
            </header>

            <div className="projectJournalDetails__body">
              <section className="projectJournalDetails__visual">
                <AssetPlaceholder
                  label={
                    selectedProject.assetLabel
                  }
                  className="projectJournalAsset"
                />

                <div className="projectJournalDetails__assetMeta">
                  <span>
                    ASSET ID //{" "}
                    {selectedProject.id.toUpperCase()}
                  </span>

                  <strong>
                    VISUAL PLACEHOLDER
                  </strong>
                </div>
              </section>

              <section className="projectJournalDetails__information">
                <div className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>01</span>
                    <strong>Overview</strong>
                  </div>

                  <p>
                    {selectedProject.summary}
                  </p>
                </div>

                <div className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>02</span>
                    <strong>Objective</strong>
                  </div>

                  <p>
                    {selectedProject.objective}
                  </p>
                </div>

                <div className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>03</span>
                    <strong>
                      Systems and Technologies
                    </strong>
                  </div>

                  <div className="projectTechnologyList">
                    {selectedProject.technologies.map(
                      (technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="projectJournalDetails__open"
                  disabled
                >
                  <span>ENTER</span>

                  <div>
                    <small>
                      PROJECT DETAIL INTERFACE
                    </small>

                    <strong>
                      OPEN RECORD
                    </strong>
                  </div>

                  <span>LOCKED</span>
                </button>
              </section>
            </div>

            <footer className="projectJournalDetails__footer">
              <span>
                JOURNAL ID //{" "}
                {selectedProject.id.toUpperCase()}
              </span>

              <strong>VERIFIED</strong>
            </footer>
          </article>
        )}
      </div>
    </WindowFrame>
  );
}