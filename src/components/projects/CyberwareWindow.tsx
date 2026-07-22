"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";
import {
  getCyberwareProjects,
  type CyberwareSlot,
} from "@/data/projects";

import "./cyberware-window.css";

type CyberwareWindowProps = {
  initialProjectId?: string;
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
  {
    id: "torso",
    label: "CIRCULATORY SYSTEM",
    className: "slot--circulatory",
  },
  { id: "legs", label: "LEGS", className: "slot--legs" },
];

export default function CyberwareWindow({
  initialProjectId,
  onBack,
  onOpenRecord,
  onClose,
}: CyberwareWindowProps) {
  const cyberwareProjects = useMemo(() => getCyberwareProjects(), []);

  const [selectedId, setSelectedId] = useState(
    initialProjectId ?? cyberwareProjects[0]?.id ?? ""
  );

  const selectedProject =
    cyberwareProjects.find((project) => project.id === selectedId) ??
    cyberwareProjects[0];

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      if (!selectedProject || cyberwareProjects.length === 0) return;

      const currentIndex = Math.max(
        0,
        cyberwareProjects.findIndex(
          (project) => project.id === selectedProject.id
        )
      );

      const nextIndex =
        (currentIndex + direction + cyberwareProjects.length) %
        cyberwareProjects.length;

      setSelectedId(cyberwareProjects[nextIndex].id);
    },
    [cyberwareProjects, selectedProject]
  );

  const cycleSlot = useCallback(
    (slot: CyberwareSlot) => {
      const slotProjects = cyberwareProjects.filter(
        (project) => project.cyberware?.slot === slot
      );

      if (slotProjects.length === 0) return;

      const currentIndex = slotProjects.findIndex(
        (project) => project.id === selectedProject?.id
      );

      const nextIndex =
        currentIndex < 0 ? 0 : (currentIndex + 1) % slotProjects.length;

      setSelectedId(slotProjects[nextIndex].id);
    },
    [cyberwareProjects, selectedProject]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Backspace":
          event.preventDefault();
          onBack();
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          moveSelection(-1);
          break;
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          moveSelection(1);
          break;
        case "Enter":
          event.preventDefault();
          if (selectedProject) onOpenRecord(selectedProject.id);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveSelection, onBack, onClose, onOpenRecord, selectedProject]);

  if (!selectedProject) return null;

  return (
    <section
      className="cyberwareMenu"
      role="dialog"
      aria-modal="true"
      aria-label="Cyberware database"
    >
      <div className="cyberwareMenu__scanlines" aria-hidden="true" />

      <TopHud
        metrics={[
          {
            value: String(cyberwareProjects.length).padStart(2, "0"),
            label: "IMPLANTS",
          },
          {
            value: String(slotDefinitions.length).padStart(2, "0"),
            label: "SYSTEMS",
            tone: "green",
          },
        ]}
        navigation={[
          { id: "cyberware", label: "CYBERWARE", active: true },
          { id: "inventory", label: "INVENTORY" },
          { id: "map", label: "MAP" },
          { id: "character", label: "CHARACTER" },
          { id: "journal", label: "JOURNAL", onClick: onBack },
        ]}
        archiveLabel="CYBERWARE DATABASE"
      />

      <main className="cyberwareWorkspace">
        <aside
          className="cyberwareMeter cyberwareMeter--left"
          aria-hidden="true"
        >
          <div className="cyberwareMeter__icon">◇</div>
          <span>176</span>
          <div className="cyberwareMeter__bars" />
          <strong>135</strong>
        </aside>

        <section
          className="cyberwareStage"
          aria-label="Installed cyberware systems"
        >
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
            const slotProjects = cyberwareProjects.filter(
              (project) => project.cyberware?.slot === slot.id
            );
            const selectedInSlot = slotProjects.find(
              (project) => project.id === selectedProject.id
            );
            const displayedProject = selectedInSlot ?? slotProjects[0];
            const active = Boolean(selectedInSlot);

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
                  disabled={!displayedProject}
                  onClick={() => cycleSlot(slot.id)}
                  onDoubleClick={() => {
                    if (displayedProject) onOpenRecord(displayedProject.id);
                  }}
                  aria-label={
                    displayedProject
                      ? `Select ${displayedProject.title}`
                      : `${slot.label} unavailable`
                  }
                >
                  <span className="cyberwareSystem__rail" />
                  <span className="cyberwareSystem__asset">
                    {displayedProject?.image ? (
                      <Image
                        src={displayedProject.image}
                        alt=""
                        fill
                        sizes="170px"
                      />
                    ) : (
                      <span className="cyberwareSystem__empty">
                        {displayedProject ? "?" : "—"}
                      </span>
                    )}
                  </span>
                  <span className="cyberwareSystem__corner">
                    {slotProjects.length > 1 ? slotProjects.length : "⌃"}
                  </span>
                </button>
                <small>{displayedProject?.title ?? "UNAVAILABLE"}</small>
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

        <aside
          className="cyberwareMeter cyberwareMeter--right"
          aria-hidden="true"
        >
          <div className="cyberwareMeter__icon">▣</div>
          <span>288</span>
          <div className="cyberwareMeter__bars" />
        </aside>
      </main>

      <ActionBar status={<>SELECTED IMPLANT // {selectedProject.title}</>}>
        <ActionKey keyLabel="BKSP" label="Journal" onClick={onBack} />
        <ActionKey keyLabel="← →" label="Navigate" />
        <ActionKey
          keyLabel="ENTER"
          label="Open Record"
          onClick={() => onOpenRecord(selectedProject.id)}
        />
        <ActionKey keyLabel="ESC" label="Close" onClick={onClose} />
      </ActionBar>
    </section>
  );
}