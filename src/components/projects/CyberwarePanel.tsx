"use client";

import { useState } from "react";

import { cyberwareProjects } from "@/data/cyberware";

export default function CyberwarePanel() {
  const [selectedId, setSelectedId] = useState(
    cyberwareProjects[0].id
  );

  const selectedProject = cyberwareProjects.find(
    (project) => project.id === selectedId
  );

  if (!selectedProject) return null;

  return (
    <div className="cyberwarePanel">
      <aside className="cyberwarePanel__list">
        {cyberwareProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={
              project.id === selectedId
                ? "cyberwarePanel__item cyberwarePanel__item--active"
                : "cyberwarePanel__item"
            }
            onClick={() => setSelectedId(project.id)}
          >
            {project.name}
          </button>
        ))}
      </aside>

      <section className="cyberwarePanel__details">
        <h2>{selectedProject.name}</h2>

        <p>Status: {selectedProject.status}</p>

        <p>{selectedProject.description}</p>

        <h3>Technologies</h3>

        <ul>
          {selectedProject.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}