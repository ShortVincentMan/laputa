"use client";

import { useState } from "react";

import WindowFrame from "@/components/windows/WindowFrame";
import CyberwareWindow from "@/components/projects/CyberwarePanel";

import "./projects-window.css";

type ProjectsWindowProps = {
  onClose: () => void;
};

type ProjectCategory =
  | "cyberware"
  | "quickhacks"
  | "research"
  | "archive";

const categories: {
  id: ProjectCategory;
  label: string;
}[] = [
  { id: "cyberware", label: "Cyberware" },
  { id: "quickhacks", label: "Quickhacks" },
  { id: "research", label: "Research" },
  { id: "archive", label: "Archive" },
];

export default function ProjectsWindow({
  onClose,
}: ProjectsWindowProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("cyberware");

  return (
    <WindowFrame
      title="Project Database"
      subtitle="Portfolio archive // authorized access"
      onClose={onClose}
      footer="04 project categories detected"
      tabs={
        <div className="projectTabs">
          {categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`projectTabs__button ${
                activeCategory === category.id
                  ? "projectTabs__button--active"
                  : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              {category.label}
            </button>
          ))}
        </div>
      }
      sideActions={
        <>
          <button
            className="projectSideAction"
            type="button"
          >
            Database Index
            <span>Q</span>
          </button>

          <button
            className="projectSideAction"
            type="button"
          >
            Filter Records
            <span>E</span>
          </button>
        </>
      }
    >
      {activeCategory === "cyberware" && (
        <CyberwareWindow />
      )}

      {activeCategory === "quickhacks" && (
        <section className="projectsContent">
          <div className="projectsContent__label">
            Active Database
          </div>

          <h2>Quickhacks</h2>
          <p>Software projects will go here.</p>
        </section>
      )}

      {activeCategory === "research" && (
        <section className="projectsContent">
          <div className="projectsContent__label">
            Active Database
          </div>

          <h2>Research</h2>
          <p>Research projects will go here.</p>
        </section>
      )}

      {activeCategory === "archive" && (
        <section className="projectsContent">
          <div className="projectsContent__label">
            Active Database
          </div>

          <h2>Archive</h2>
          <p>Archived projects will go here.</p>
        </section>
      )}
    </WindowFrame>
  );
}