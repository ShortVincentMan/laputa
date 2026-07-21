"use client";

import WindowFrame from "./WindowFrame";

import "./credits-window.css";

type CreditsWindowProps = {
  onClose: () => void;
};

const creditGroups = [
  {
    title: "PROJECT CONTRIBUTORS",
    items: [
      "Vincent Le // Engineering, design, and development",
      "Laputa OS contributors // To be added as the project grows",
    ],
  },
  {
    title: "REFERENCES AND INSPIRATION",
    items: [
      "Cyberpunk 2077 // Interface and visual language reference",
      "Project collaborators, educators, and engineering communities",
    ],
  },
];

export default function CreditsWindow({
  onClose,
}: CreditsWindowProps) {
  return (
    <WindowFrame
      title="Credits"
      subtitle="Contributors // references // acknowledgements"
      sectionLabel="CREDITS"
      footer="Acknowledgement record loaded"
      className="creditsFrame"
      onClose={onClose}
    >
      <div className="creditsInterface">
        <header className="creditsInterface__header">
          <span>ARCHIVE RECORD // LAPUTA-OS-CREDITS</span>
          <strong>THANK YOU FOR CONNECTING</strong>
        </header>

        <p className="creditsInterface__intro">
          Laputa OS is built from engineering work, visual references,
          collaborators, and communities that made ambitious ideas feel
          possible.
        </p>

        <div className="creditsInterface__groups">
          {creditGroups.map((group, index) => (
            <section className="creditsGroup" key={group.title}>
              <div className="creditsGroup__number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h2>{group.title}</h2>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}
