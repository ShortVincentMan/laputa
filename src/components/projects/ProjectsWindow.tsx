"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import ProjectDetailWindow from "@/components/projects/ProjectDetailWindow";
import AssetPlaceholder from "@/components/shared/AssetPlaceholder";
import WindowFrame from "@/components/windows/WindowFrame";

import {
  categoryLabels,
  categoryOrder,
  getProjectById,
  getVisibleProjects,
  type ProjectCategory,
} from "@/data/projects";

import "./projects-window.css";

type ProjectsWindowProps = {
  onClose: () => void;
};

export default function ProjectsWindow({
  onClose,
}: ProjectsWindowProps) {
  const initialProject =
    getVisibleProjects("featured")[0];

  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("featured");

  const [selectedId, setSelectedId] = useState(
    initialProject?.id ?? ""
  );

  const [openProjectId, setOpenProjectId] =
    useState<string | null>(null);

  const visibleProjects = useMemo(
    () => getVisibleProjects(activeCategory),
    [activeCategory]
  );

  const selectedProject =
    visibleProjects.find(
      (project) => project.id === selectedId
    ) ?? visibleProjects[0];

  const openProject = getProjectById(openProjectId);

  const selectCategory = useCallback(
    (category: ProjectCategory) => {
      const nextProjects = getVisibleProjects(category);

      setActiveCategory(category);
      setSelectedId(nextProjects[0]?.id ?? "");
    },
    []
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (
        !selectedProject ||
        visibleProjects.length === 0
      ) {
        return;
      }

      const currentIndex = visibleProjects.findIndex(
        (project) => project.id === selectedProject.id
      );

      const nextIndex =
        (currentIndex +
          direction +
          visibleProjects.length) %
        visibleProjects.length;

      setSelectedId(visibleProjects[nextIndex].id);
    },
    [selectedProject, visibleProjects]
  );

  const openSelectedProject = useCallback(() => {
    if (!selectedProject) return;

    setOpenProjectId(selectedProject.id);
  }, [selectedProject]);

  useEffect(() => {
    if (openProjectId) return;

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
        return;
      }

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w"
      ) {
        event.preventDefault();
        moveSelection(-1);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        openSelectedProject();
        return;
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();

        const currentIndex =
          categoryOrder.indexOf(activeCategory);

        const direction =
          event.key === "ArrowLeft" ? -1 : 1;

        const nextIndex =
          (currentIndex +
            direction +
            categoryOrder.length) %
          categoryOrder.length;

        selectCategory(categoryOrder[nextIndex]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeCategory,
    moveSelection,
    openProjectId,
    openSelectedProject,
    selectCategory,
  ]);

  if (openProject) {
    return (
      <ProjectDetailWindow
        project={openProject}
        onBack={() => setOpenProjectId(null)}
        onClose={onClose}
      />
    );
  }

  const tabs = (
    <div className="projectTabs">
      {categoryOrder.map((category) => {
        const count = getVisibleProjects(category).length;
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            className={
              isActive
                ? "projectTabs__button projectTabs__button--active"
                : "projectTabs__button"
            }
            onClick={() => selectCategory(category)}
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
              {String(visibleProjects.length).padStart(
                2,
                "0"
              )}
            </span>
          </header>

          <div className="projectJournalList__records">
            {visibleProjects.map((project, index) => {
              const isSelected =
                selectedProject?.id === project.id;

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
                  onDoubleClick={() =>
                    setOpenProjectId(project.id)
                  }
                  aria-pressed={isSelected}
                >
                  <span className="projectJournalRecord__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="projectJournalRecord__identity">
                    <strong>{project.title}</strong>
                    <span>{project.subtitle}</span>
                  </span>

                  <span className="projectJournalRecord__status">
                    {project.status}
                  </span>
                </button>
              );
            })}
          </div>

          <footer className="projectJournalList__footer">
            <span>W/S</span>
            Navigate projects
          </footer>
        </aside>

        {selectedProject && (
          <article
            key={selectedProject.id}
            className="projectJournalDetails"
          >
            <header className="projectJournalDetails__header">
              <div>
                <span className="projectJournalDetails__eyebrow">
                  RECORD //{" "}
                  {selectedProject.id.toUpperCase()}
                </span>

                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.subtitle}</p>
              </div>

              <div className="projectJournalDetails__status">
                <span
                  className={
                    selectedProject.status === "ACTIVE" ||
                    selectedProject.status ===
                      "IN DEVELOPMENT"
                      ? "projectJournalDetails__statusDot projectJournalDetails__statusDot--active"
                      : "projectJournalDetails__statusDot"
                  }
                />

                <div>
                  <span>STATUS</span>
                  <strong>
                    {selectedProject.status}
                  </strong>
                </div>
              </div>
            </header>

            <div className="projectJournalDetails__body">
              <div className="projectJournalDetails__visual">
                {selectedProject.image ? (
                  <div className="projectJournalAsset projectJournalAsset--image">
                    <Image
                      src={selectedProject.image}
                      alt={
                        selectedProject.imageAlt ??
                        selectedProject.title
                      }
                      fill
                      priority={
                        selectedProject.id ===
                        "mantis-blades"
                      }
                      sizes="(max-width: 900px) 100vw, 45vw"
                    />
                  </div>
                ) : (
                  <AssetPlaceholder
                    label={selectedProject.assetLabel}
                    className="projectJournalAsset"
                  />
                )}

                <div className="projectJournalDetails__assetMeta">
                  <span>PRIMARY VISUAL</span>
                  <strong>
                    {selectedProject.period}
                  </strong>
                </div>
              </div>

              <div className="projectJournalDetails__information">
                <section className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>01</span>
                    <strong>Overview</strong>
                  </div>

                  <p>{selectedProject.summary}</p>
                </section>

                <section className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>02</span>
                    <strong>Objective</strong>
                  </div>

                  <p>{selectedProject.objective}</p>
                </section>

                <section className="projectJournalSection">
                  <div className="projectJournalSection__title">
                    <span>03</span>
                    <strong>Technologies</strong>
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
                </section>

                <button
                  type="button"
                  className="projectJournalDetails__open"
                  onClick={openSelectedProject}
                >
                  <span>ENTER</span>

                  <div>
                    <small>PROJECT DATABASE</small>
                    <strong>OPEN RECORD</strong>
                  </div>

                  <span>ACCESS &gt;</span>
                </button>
              </div>
            </div>

            <footer className="projectJournalDetails__footer">
              <span>
                DOUBLE CLICK OR PRESS ENTER TO OPEN
              </span>

              <strong>RECORD READY</strong>
            </footer>
          </article>
        )}
      </div>
    </WindowFrame>
  );
}