"use client";

import { useMemo, useState } from "react";

import WindowFrame from "./WindowFrame";
import "./about-window.css";

type AboutWindowProps = {
  onClose: () => void;
};

type AboutSection =
  | "profile"
  | "systems"
  | "objectives"
  | "affiliations";

const sections: {
  id: AboutSection;
  label: string;
  code: string;
}[] = [
  {
    id: "profile",
    label: "Profile",
    code: "01",
  },
  {
    id: "systems",
    label: "Systems",
    code: "02",
  },
  {
    id: "objectives",
    label: "Objectives",
    code: "03",
  },
  {
    id: "affiliations",
    label: "Affiliations",
    code: "04",
  },
];

const systemStats = [
  {
    label: "Discipline",
    value: "Computer Engineering",
  },
  {
    label: "Institution",
    value: "Cal Poly SLO",
  },
  {
    label: "GPA",
    value: "3.83",
  },
  {
    label: "Status",
    value: "Active",
    active: true,
  },
  {
    label: "Location",
    value: "San Luis Obispo, CA",
  },
  {
    label: "Classification",
    value: "Undergraduate Researcher",
  },
];

const specialties = [
  "Embedded Systems",
  "Wearable Robotics",
  "Feedback Control",
  "Full-Stack Development",
  "CAD + Manufacturing",
  "Human-Machine Systems",
];

const objectives = [
  {
    name: "Upper-Limb Tensegrity Exoskeleton",
    type: "Research",
    status: "ACTIVE",
  },
  {
    name: "Spinal Battery System",
    type: "Independent Engineering",
    status: "ACTIVE",
  },
  {
    name: "Laputa OS",
    type: "Interactive Portfolio",
    status: "ACTIVE",
  },
  {
    name: "Kids First Initiative",
    type: "Software Development",
    status: "ACTIVE",
  },
];

const affiliations = [
  {
    name: "California Polytechnic State University",
    role: "Undergraduate Student Researcher",
  },
  {
    name: "Hack4Impact Cal Poly",
    role: "Director of Finance and Operations",
  },
  {
    name: "Cal Poly Racing",
    role: "Firmware Developer",
  },
  {
    name: "Nikkei Student Union",
    role: "Event Coordinator Chair",
  },
  {
    name: "Vietnamese Student Association",
    role: "General Member",
  },
];

export default function AboutWindow({
  onClose,
}: AboutWindowProps) {
  const [activeSection, setActiveSection] =
    useState<AboutSection>("profile");

  const activeSectionLabel = useMemo(
    () =>
      sections.find(
        (section) => section.id === activeSection
      )?.label ?? "Profile",
    [activeSection]
  );

  const tabs = (
    <div className="aboutTabs">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className={
            activeSection === section.id
              ? "aboutTabs__button aboutTabs__button--active"
              : "aboutTabs__button"
          }
          onClick={() =>
            setActiveSection(section.id)
          }
        >
          <span>{section.code}</span>
          {section.label}
        </button>
      ))}
    </div>
  );

  return (
    <WindowFrame
      title="Character"
      subtitle="Operator identity // personnel profile"
      sectionLabel="CHARACTER"
      tabs={tabs}
      footer={`${activeSectionLabel} record loaded`}
      className="aboutFrame"
      onClose={onClose}
    >
      <div className="aboutInterface">
        <aside className="aboutStats">
          <header className="aboutStats__header">
            <div>
              <span>CHARACTER DATABASE</span>
              <strong>OPERATOR STATS</strong>
            </div>

            <span>VL-01</span>
          </header>

          <div className="aboutStats__identity">
            <span className="aboutStats__status">
              <span />
              ONLINE
            </span>

            <h2>VINCENT LE</h2>

            <p>
              Exoskeleton Researcher
              <br />
              Computer Engineering
            </p>
          </div>

          <div className="aboutStats__list">
            {systemStats.map((stat) => (
              <div
                className="aboutStat"
                key={stat.label}
              >
                <span>{stat.label}</span>

                <strong
                  className={
                    stat.active
                      ? "aboutStat__active"
                      : undefined
                  }
                >
                  {stat.active && <i />}
                  {stat.value}
                </strong>
              </div>
            ))}
          </div>

          <div className="aboutStats__clearance">
            <span>SECURITY CLEARANCE</span>

            <div>
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <strong>LEVEL 05</strong>
          </div>
        </aside>

        <section className="aboutCharacter">
          <div
            className="aboutCharacter__grid"
            aria-hidden="true"
          />

          <div
            className="aboutCharacter__scanner"
            aria-hidden="true"
          />

          <div className="aboutCharacter__top">
            <span>BIOMETRIC RECORD</span>
            <strong>SYNC 98.7%</strong>
          </div>

          <div className="aboutCharacter__portrait">
            <span className="aboutCharacter__corner aboutCharacter__corner--topLeft" />
            <span className="aboutCharacter__corner aboutCharacter__corner--topRight" />
            <span className="aboutCharacter__corner aboutCharacter__corner--bottomLeft" />
            <span className="aboutCharacter__corner aboutCharacter__corner--bottomRight" />

            <div className="aboutCharacter__initials">
              VL
            </div>

            <div className="aboutCharacter__crosshair">
              <span />
              <span />
            </div>

            <div className="aboutCharacter__scanLabel">
              PORTRAIT ASSET PENDING
            </div>
          </div>

          <div className="aboutCharacter__readout">
            <div>
              <span>Height</span>
              <strong>5&apos;6&quot;</strong>
            </div>

            <div>
              <span>Class</span>
              <strong>Engineer</strong>
            </div>

            <div>
              <span>Build</span>
              <strong>Hybrid Systems</strong>
            </div>
          </div>

          <div className="aboutCharacter__nameplate">
            <span>DESIGNATION</span>
            <strong>VINCENT_LE</strong>
          </div>
        </section>

        <section className="aboutDetails">
          {activeSection === "profile" && (
            <div className="aboutPanel">
              <header className="aboutPanel__header">
                <span>01 // PROFILE</span>
                <strong>OPERATOR SUMMARY</strong>
              </header>

              <h2>
                BUILDING THE FUTURE I GREW UP
                DREAMING ABOUT.
              </h2>

              <p className="aboutPanel__lead">
                I am a Computer Engineering student at
                California Polytechnic State University
                focused on embedded systems, robotics,
                wearable technology, and interactive
                software.
              </p>

              <p>
                My work combines mechanical design,
                electronics, firmware, and software into
                complete engineering systems. I am most
                interested in projects that turn fictional
                concepts into practical, documented, and
                manufacturable technology.
              </p>

              <p>
                Current work includes feedback control for an
                upper-limb tensegrity exoskeleton, embedded
                firmware for Formula SAE, full-stack
                development for nonprofit education, and
                independent wearable robotics.
              </p>

              <div className="aboutPanel__quote">
                <span>MISSION STATEMENT</span>

                <blockquote>
                  Build ambitious systems that feel like
                  science fiction but function like real
                  engineering.
                </blockquote>
              </div>
            </div>
          )}

          {activeSection === "systems" && (
            <div className="aboutPanel">
              <header className="aboutPanel__header">
                <span>02 // SYSTEMS</span>
                <strong>ACTIVE SPECIALIZATIONS</strong>
              </header>

              <div className="aboutSystems">
                {specialties.map(
                  (specialty, index) => (
                    <article
                      className="aboutSystem"
                      key={specialty}
                    >
                      <span className="aboutSystem__index">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div>
                        <strong>{specialty}</strong>

                        <span>
                          SYSTEM PROFICIENCY
                        </span>
                      </div>

                      <div className="aboutSystem__bar">
                        <span
                          style={{
                            width: `${88 - index * 5}%`,
                          }}
                        />
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          )}

          {activeSection === "objectives" && (
            <div className="aboutPanel">
              <header className="aboutPanel__header">
                <span>03 // OBJECTIVES</span>
                <strong>CURRENT MISSIONS</strong>
              </header>

              <div className="aboutObjectives">
                {objectives.map(
                  (objective, index) => (
                    <article
                      className="aboutObjective"
                      key={objective.name}
                    >
                      <span className="aboutObjective__index">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div className="aboutObjective__content">
                        <span>
                          {objective.type}
                        </span>

                        <strong>
                          {objective.name}
                        </strong>
                      </div>

                      <div className="aboutObjective__status">
                        <span />
                        {objective.status}
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          )}

          {activeSection === "affiliations" && (
            <div className="aboutPanel">
              <header className="aboutPanel__header">
                <span>05 // AFFILIATIONS</span>
                <strong>ACTIVE NETWORKS</strong>
              </header>

              <div className="aboutAffiliations">
                {affiliations.map(
                  (affiliation, index) => (
                    <article
                      className="aboutAffiliation"
                      key={affiliation.name}
                    >
                      <span className="aboutAffiliation__index">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div>
                        <strong>
                          {affiliation.name}
                        </strong>

                        <span>
                          {affiliation.role}
                        </span>
                      </div>

                      <span className="aboutAffiliation__marker">
                        ◆
                      </span>
                    </article>
                  )
                )}
              </div>
            </div>
          )}

          <footer className="aboutDetails__footer">
            <span>
              RECORD ID // VINCENT-LE-CHARACTER
            </span>

            <strong>VERIFIED</strong>
          </footer>
        </section>
      </div>
    </WindowFrame>
  );
}