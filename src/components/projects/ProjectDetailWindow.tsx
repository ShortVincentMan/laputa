"use client";

import { useEffect } from "react";

import ProjectDetail from "@/components/projects/ProjectDetail";
import WindowFrame from "@/components/windows/WindowFrame";
import type { ProjectRecord } from "@/data/projects";

import "./project-detail-window.css";

type ProjectDetailWindowProps = {
  project: ProjectRecord;
  onBack: () => void;
  onClose: () => void;
  onOpenCyberware?: () => void;
};

export default function ProjectDetailWindow({
  project,
  onBack,
  onClose,
  onOpenCyberware,
}: ProjectDetailWindowProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Backspace") return;

      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      event.preventDefault();
      onBack();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack]);

  const tabs = (
    <>
      <button type="button" className="projectDetailTab" onClick={onBack}>
        <span>BKSP</span>
        JOURNAL
      </button>

      <button type="button" className="projectDetailTab is-active" aria-current="page">
        PROJECT RECORD
      </button>

      {project.cyberware && onOpenCyberware && (
        <button
          type="button"
          className="projectDetailTab projectDetailTab--cyberware"
          onClick={onOpenCyberware}
        >
          CYBERWARE
        </button>
      )}
    </>
  );

  return (
    <WindowFrame
      title={project.title}
      subtitle={`${project.subtitle} // ${project.period}`}
      sectionLabel="PROJECT RECORD"
      tabs={tabs}
      footer={`PROJECT RECORD // ${project.status}`}
      className="projectDetailFrame"
      onClose={onClose}
    >
      <ProjectDetail project={project} />
    </WindowFrame>
  );
}