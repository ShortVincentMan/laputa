"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  getCyberwareProjects,
  type CyberwareSlot,
  type ProjectRecord,
} from "@/data/projects";

import "./cyberware-window.css";

type CyberwareWindowProps = {
  project: ProjectRecord;
  onBack: () => void;
  onOpenRecord: (projectId: string) => void;
  onClose: () => void;
};

type SlotDefinition = {
  id: CyberwareSlot;
  label: string;
  className: string;
};

const slotDefinitions: SlotDefinition[] = [
  { id: "head", label: "FRONTAL CORTEX", className: "slot--cortex" },
  { id: "ocular", label: "FACE", className: "slot--face" },
  { id: "arms", label: "ARMS", className: "slot--arms" },
  { id: "hands", label: "HANDS", className: "slot--hands" },
  { id: "spine", label: "SKELETON", className: "slot--skeleton" },
  { id: "torso", label: "CIRCULATORY SYSTEM", className: "slot--circulatory" },
  { id: "legs", label: "LEGS", className: "slot--legs" },
];

export default function CyberwareWindow({
  project,
  onBack,
  onOpenRecord,
  onClose,
}: CyberwareWindowProps) {
  const cyberwareProjects = useMemo(() => getCyberwareProjects(), []);
  const [selectedId, setSelectedId] = useState(project.id);

  const selectedProject =
    cyberwareProjects.find((item) => item.id === selectedId) ?? project;

  useEffect(() => {
    function moveSelection(direction: 1 | -1) {
      const currentIndex = cyberwareProjects.findIndex(
        (item) => item.id === selectedId
      );
      const nextIndex =
        (currentIndex + direction + cyberwareProjects.length) %
        cyberwareProjects.length;
      setSelectedId(cyberwareProjects[nextIndex].id);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Backspace") {
        event.preventDefault();
        onBack();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        moveSelection(-1);
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        moveSelection(1);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        onOpenRecord(selectedProject.id);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    cyberwareProjects,
    onBack,
    onClose,
    onOpenRecord,
    selectedId,
    selectedProject.id,
  ]);

  return (
    <section
      className="cyberwareMenu"
      role="dialog"
      aria-modal="true"
      aria-label="Cyberware database"
    >
      <div className="cyberwareMenu__scanlines" aria-hidden="true" />

      <header className="cyberwareHud">
        <div className="cyberwareHud__metrics">
          <div>
            <strong>{String(cyberwareProjects.length).padStart(2, "0")}</strong>
            <span>IMPLANTS</span>
          </div>
          <div>
            <strong>{String(slotDefinitions.length).padStart(2, "0")}</strong>
            <span>SYSTEMS</span>
          </div>
        </div>

        <nav className="cyberwareHud__nav" aria-label="Portfolio sections">
          <strong>CYBERWARE</strong>
          <span>INVENTORY</span>
          <span>MAP</span>
          <span>CHARACTER</span>
          <button type="button" onClick={onBack}>JOURNAL</button>
        </nav>

        <div className="cyberwareHud__status">
          <span>LAPUTA OS</span>
          <strong>CYBERWARE DATABASE</strong>
        </div>
      </header>

      <main className="cyberwareWorkspace">
        <aside className="cyberwareMeter cyberwareMeter--left" aria-hidden="true">
          <div className="cyberwareMeter__icon">◇</div>
          <span>176</span>
          <div className="cyberwareMeter__bars" />
          <strong>135</strong>
        </aside>

        <section className="cyberwareStage" aria-label="Installed cyberware systems">
          <div className="cyberwareBody" aria-hidden="true">
            <span className="cyberwareBody__head" />
            <span className="cyberwareBody__neck" />
            <span className="cyberwareBody__torso" />
            <span className="cyberwareBody__spine" />
            <span className="cyberwareBody__pelvis" />
            <span className="cyberwareBody__arm cyberwareBody__arm--left" />
            <span className="cyberwareBody__arm cyberwareBody__arm--right" />
            <span className="cyberwareBody__leg cyberwareBody__leg--left" />
            <span className="cyberwareBody__leg cyberwareBody__leg--right" />
          </div>

          {slotDefinitions.map((slot) => {
            const installedProjects = cyberwareProjects.filter(
              (item) => item.cyberware?.slot === slot.id
            );
            const installed = installedProjects[0];
            const active = installed?.id === selectedProject.id;

            return (
              <div
                key={slot.id}
                className={`cyberwareSystem ${slot.className}${
                  active ? " is-active" : ""
                }`}
              >
                <h2>{slot.label}</h2>
                <button
                  type="button"
                  disabled={!installed}
                  onClick={() => installed && setSelectedId(installed.id)}
                  onDoubleClick={() => installed && onOpenRecord(installed.id)}
                  aria-label={
                    installed
                      ? `Select ${installed.title}`
                      : `${slot.label} unavailable`
                  }
                >
                  <span className="cyberwareSystem__rail" />
                  <span className="cyberwareSystem__asset">
                    {installed?.image ? (
                      <Image
                        src={installed.image}
                        alt=""
                        fill
                        sizes="170px"
                      />
                    ) : (
                      <span className="cyberwareSystem__empty">—</span>
                    )}
                  </span>
                  <span className="cyberwareSystem__corner">⌃</span>
                </button>
                <small>{installed?.title ?? "UNAVAILABLE"}</small>
              </div>
            );
          })}

          <div className="cyberwareSystem slot--operating">
            <h2>OPERATING SYSTEM</h2>
            <button type="button" disabled>
              <span className="cyberwareSystem__rail" />
              <span className="cyberwareSystem__asset cyberwareSystem__asset--os">
                LAPUTA
              </span>
            </button>
            <small>PORTFOLIO CORE</small>
          </div>

          <div className="cyberwareSystem slot--nervous">
            <h2>NERVOUS SYSTEM</h2>
            <button type="button" disabled>
              <span className="cyberwareSystem__rail" />
              <span className="cyberwareSystem__asset">
                <span className="cyberwareSystem__empty">—</span>
              </span>
            </button>
            <small>UNAVAILABLE</small>
          </div>

          <div className="cyberwareSystem slot--integumentary">
            <h2>INTEGUMENTARY SYSTEM</h2>
            <div className="cyberwareSystem__triple">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>

        <aside className="cyberwareMeter cyberwareMeter--right" aria-hidden="true">
          <div className="cyberwareMeter__icon">▣</div>
          <span>288</span>
          <div className="cyberwareMeter__bars" />
        </aside>
      </main>

      <footer className="cyberwareFooter">
        <div className="cyberwareFooter__debug">
          <span />
          SELECTED IMPLANT // {selectedProject.title}
        </div>
        <div className="cyberwareFooter__controls">
          <button type="button" onClick={onBack}><span>BKSP</span>JOURNAL</button>
          <div><span>← →</span>NAVIGATE</div>
          <button type="button" onClick={() => onOpenRecord(selectedProject.id)}>
            <span>ENTER</span>OPEN RECORD
          </button>
          <button type="button" onClick={onClose}><span>ESC</span>CLOSE</button>
        </div>
      </footer>
    </section>
  );
}