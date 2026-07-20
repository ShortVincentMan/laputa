"use client";

import WindowFrame from "./WindowFrame";

type AboutWindowProps = {
  onClose: () => void;
};

const systemData = [
  ["Designation", "Vincent Le"],
  ["Discipline", "Computer Engineering"],
  ["Location", "Cal Poly"],
  ["Focus", "Embedded Systems + Robotics"],
  ["Status", "Active"],
];

export default function AboutWindow({
  onClose,
}: AboutWindowProps) {
  return (
    <WindowFrame
      title="About"
      subtitle="Operator profile // identity record"
      footer="Operator profile successfully loaded"
      onClose={onClose}
    >
      <div className="aboutLayout">
        <section className="aboutProfile">
          <div className="aboutProfile__label">
            OPERATOR 01
          </div>

          <h2>ENGINEER. BUILDER. SYSTEMS DESIGNER.</h2>

          <p>
            I am a Computer Engineering student focused on
            embedded systems, robotics, wearable technology,
            and interactive software.
          </p>

          <p>
            My work combines mechanical design, electronics,
            firmware, and software to turn fictional concepts
            into functional engineering prototypes.
          </p>
        </section>

        <aside className="systemData">
          <div className="systemData__header">
            SYSTEM DATA
          </div>

          {systemData.map(([label, value]) => (
            <div className="systemData__row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </aside>
      </div>
    </WindowFrame>
  );
}