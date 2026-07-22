"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";
import TopHud from "@/components/shared/TopHud";

import "./about-window.css";

type AboutWindowProps = {
  onClose: () => void;
};

type AboutSection =
  | "profile"
  | "systems"
  | "objectives"
  | "affiliations";

type SectionDefinition = {
  id: AboutSection;
  label: string;
  code: string;
  icon: string;
  value: string;
};

const sections: SectionDefinition[] = [
  {
    id: "profile",
    label: "Profile",
    code: "01",
    icon: "⌁",
    value: "VL",
  },
  {
    id: "systems",
    label: "Systems",
    code: "02",
    icon: "⬟",
    value: "06",
  },
  {
    id: "objectives",
    label: "Objectives",
    code: "03",
    icon: "✚",
    value: "04",
  },
  {
    id: "affiliations",
    label: "Affiliations",
    code: "04",
    icon: "⬡",
    value: "05",
  },
];

const specialties = [
  {
    code: "EMB",
    label: "Embedded Systems",
    detail: "Firmware, microcontrollers, sensing, and hardware integration.",
  },
  {
    code: "ROB",
    label: "Wearable Robotics",
    detail: "Exoskeletons, prosthetics, and human-machine systems.",
  },
  {
    code: "CTRL",
    label: "Feedback Control",
    detail: "Motion sensing, system response, and closed-loop control.",
  },
  {
    code: "CAD",
    label: "Mechanical Design",
    detail: "CAD, prototyping, tolerancing, and additive manufacturing.",
  },
  {
    code: "WEB",
    label: "Interactive Software",
    detail: "Full-stack systems, interface design, and web applications.",
  },
  {
    code: "HMI",
    label: "Human-Machine Systems",
    detail: "Technology designed around physical interaction and real users.",
  },
];

const objectives = [
  {
    code: "01",
    name: "Upper-Limb Tensegrity Exoskeleton",
    type: "Research",
    status: "ACTIVE",
  },
  {
    code: "02",
    name: "Spinal Battery System",
    type: "Independent Engineering",
    status: "ACTIVE",
  },
  {
    code: "03",
    name: "Laputa OS",
    type: "Interactive Portfolio",
    status: "ACTIVE",
  },
  {
    code: "04",
    name: "Future Cybernetics Platform",
    type: "Long-Term Mission",
    status: "PLANNED",
  },
];

const affiliations = [
  {
    code: "01",
    name: "California Polytechnic State University",
    role: "Computer Engineering / Undergraduate Research",
  },
  {
    code: "02",
    name: "Hack4Impact Cal Poly",
    role: "Director of Finance and Operations",
  },
  {
    code: "03",
    name: "Cal Poly Racing",
    role: "Firmware Development",
  },
  {
    code: "04",
    name: "Nikkei Student Union",
    role: "Event Coordination",
  },
  {
    code: "05",
    name: "Vietnamese Student Association",
    role: "Community Member",
  },
];

const milestones = ["CPE", "CAD", "EMB", "ROB", "CTRL", "HMI"];

export default function AboutWindow({ onClose }: AboutWindowProps) {
  const [activeSection, setActiveSection] =
    useState<AboutSection>("profile");

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeSection),
    [activeSection]
  );

  const activeSectionLabel = useMemo(
    () =>
      sections.find((section) => section.id === activeSection)?.label ??
      "Profile",
    [activeSection]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (activeIndex + 1) % sections.length;
        setActiveSection(sections[nextIndex].id);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex =
          (activeIndex - 1 + sections.length) % sections.length;
        setActiveSection(sections[nextIndex].id);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onClose]);

  return (
    <section
      className="characterScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Character profile"
    >
      <div className="characterScreen__scanlines" aria-hidden="true" />

      <TopHud
        metrics={[
          { value: "02", label: "YEAR" },
          { value: "00", label: "STREET CRED 😂", tone: "green" },
        ]}
        navigation={[
          { id: "cyberware", label: "CYBERWARE" },
          { id: "inventory", label: "INVENTORY" },
          { id: "map", label: "MAP" },
          { id: "character", label: "CHARACTER", active: true },
          { id: "journal", label: "JOURNAL" },
        ]}
        archiveLabel="OPERATOR PROFILE"
      />

      <main className="characterWorkspace">
        <section className="characterLeft" aria-label="Character categories">
          <div className="characterProtocol" aria-hidden="true">
            <strong>PROTOCOL</strong>
            <span>OPERATOR PROFILE DATABASE</span>
            <small>AUTHORIZED PERSONNEL ONLY</small>
          </div>

          <div className="characterCategories" role="tablist">
            {sections.map((section) => {
              const active = section.id === activeSection;

              return (
                <button
                  key={section.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`characterCategory${active ? " is-active" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="characterCategory__icon" aria-hidden="true">
                    {section.icon}
                  </span>
                  <strong>{section.label}</strong>
                  <span className="characterCategory__value">
                    {section.value}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="characterProgress">
            <div className="characterProgress__meta">
              <span>Current Status</span>
              <strong>Research Active</strong>
            </div>

            <div className="characterProgress__identity">
              <span>Engineering Track</span>
              <strong>Computer Engineering</strong>
            </div>

            <div className="characterLevel">
              <div className="characterLevel__heading">
                <strong>02</strong>
                <span>YEAR OF ENGINEERING</span>
                <small>Cal Poly SLO</small>
              </div>
              <div className="characterLevel__bar">
                <span />
              </div>
            </div>

            <div className="characterLevel characterLevel--cred">
              <div className="characterLevel__heading">
                <strong>01</strong>
                <span>Research Cred</span>
                <small>Undergraduate Researcher</small>
              </div>
              <div className="characterLevel__bar">
                <span />
              </div>
            </div>

            <div className="characterMilestones" aria-label="Focus areas">
              {milestones.map((milestone, index) => (
                <span
                  key={milestone}
                  className={index === milestones.length - 1 ? "is-current" : ""}
                >
                  <strong>{milestone}</strong>
                  <i>+</i>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="characterModel" aria-label="Vincent Le profile image">
          <div className="characterModel__glow" aria-hidden="true" />

          <div className="characterModel__frame">
            <span className="characterModel__corner characterModel__corner--tl" />
            <span className="characterModel__corner characterModel__corner--tr" />
            <span className="characterModel__corner characterModel__corner--bl" />
            <span className="characterModel__corner characterModel__corner--br" />

            <Image
              src="/assets/about/vincent-portrait.jpeg"
              alt="Vincent Le sunset portrait"
              fill
              priority
              sizes="(max-width: 900px) 45vw, 28vw"
              className="characterModel__image"
            />
          </div>

          <div className="characterModel__designation">
            <span>VINCENT LE</span>
            <small>ENGINEER // RESEARCHER // BUILDER</small>
          </div>
        </section>

        <section className="characterRight" aria-live="polite">
          {activeSection === "profile" && (
            <div className="characterPanel">
              <header className="characterRight__header">
                <h1>Operator Profile</h1>
              </header>

              <div className="characterProfileCopy">
                <h2>
                  BUILDING THE FUTURE I GREW UP DREAMING ABOUT.
                </h2>

                <p className="characterProfileCopy__lead">
                  I am a Computer Engineering student at Cal Poly San Luis
                  Obispo who builds hands-on systems that bridge hardware and
                  software.
                </p>

                <p>
                  My work spans wearable robotics, embedded systems, mechanical
                  design, firmware, feedback control, and interactive software.
                  I am most interested in projects that turn fictional concepts
                  into practical, documented, and manufacturable technology.
                </p>

                <p>
                  Outside engineering, I care about wrestling, video games,
                  alternative music, sustainability, and collaborative design.
                  Those interests shape how I approach technical work: with
                  discipline, imagination, and respect for the people who will
                  use what I build.
                </p>

                <div className="characterQuote">
                  <span>MISSION STATEMENT</span>
                  <blockquote>
                    Bring technology that feels like science fiction into
                    practical reality within my lifetime.
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          {activeSection === "systems" && (
            <div className="characterPanel">
              <header className="characterRight__header">
                <h1>Systems</h1>
              </header>

              <div className="characterAttributeList">
                {specialties.map((specialty) => (
                  <article className="characterAttribute" key={specialty.code}>
                    <strong>{specialty.code}</strong>
                    <div>
                      <span>{specialty.label}</span>
                      <small>{specialty.detail}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeSection === "objectives" && (
            <div className="characterPanel">
              <header className="characterRight__header">
                <h1>Objectives</h1>
              </header>

              <div className="characterMissionList">
                {objectives.map((objective) => (
                  <article className="characterMission" key={objective.name}>
                    <span>{objective.code}</span>
                    <div>
                      <small>{objective.type}</small>
                      <strong>{objective.name}</strong>
                    </div>
                    <em>{objective.status}</em>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeSection === "affiliations" && (
            <div className="characterPanel">
              <header className="characterRight__header">
                <h1>Affiliations</h1>
              </header>

              <div className="characterMissionList">
                {affiliations.map((affiliation) => (
                  <article className="characterMission" key={affiliation.name}>
                    <span>{affiliation.code}</span>
                    <div>
                      <strong>{affiliation.name}</strong>
                      <small>{affiliation.role}</small>
                    </div>
                    <em>VERIFIED</em>
                  </article>
                ))}
              </div>
            </div>
          )}

          <footer className="characterRight__footer">
            <span>PROFILE LINK // VL-01</span>
            <small>{activeSectionLabel.toUpperCase()} RECORD</small>
          </footer>
        </section>
      </main>

      <ActionBar status={`${activeSectionLabel.toUpperCase()} RECORD LOADED`}>
        <ActionKey keyLabel="← →" label="Navigate" />
        <ActionKey keyLabel="ENTER" label="Select" />
        <ActionKey keyLabel="ESC" label="Close" onClick={onClose} />
      </ActionBar>
    </section>
  );
}