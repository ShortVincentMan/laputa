"use client";

import WindowFrame from "./WindowFrame";

type AboutWindowProps = {
  onClose: () => void;
};

const systemData = [
  {
    label: "Operator",
    value: "Vincent Le",
  },
  {
    label: "Status",
    value: "Online",
    status: true,
  },
  {
    label: "Classification",
    value: "Computer Engineering",
  },
  {
    label: "Affiliation",
    value: "Cal Poly SLO",
  },
  {
    label: "Current Mission",
    value: "Tensegrity Exoskeleton Research",
  },
  {
    label: "Specialization",
    value: "Embedded Systems + Robotics",
  },
  {
    label: "Location",
    value: "San Luis Obispo, California",
  },
];

const objectives = [
  "Upper-Limb Tensegrity Exoskeleton",
  "Spinal Battery System",
  "Laputa OS",
];

const disciplines = [
  "Embedded Systems",
  "Robotics",
  "Wearable Technology",
  "Full-Stack Development",
  "CAD + Manufacturing",
  "Human-Machine Systems",
];

export default function AboutWindow({
  onClose,
}: AboutWindowProps) {
  return (
    <WindowFrame
      title="Operator Profile"
      subtitle="Identity record // personnel database"
      footer="Operator profile verified // clearance level 01"
      onClose={onClose}
    >
      <div className="aboutWindow">
        <section className="aboutWindow__identity">
          <div className="aboutWindow__identityTop">
            <span className="dataLabel">
              DESIGNATION // 01
            </span>

            <span className="onlineStatus">
              <span className="onlineStatus__dot" />
              ONLINE
            </span>
          </div>

          <h2 className="aboutWindow__name">
            VINCENT LE
          </h2>

          <p className="aboutWindow__headline">
            BUILDING THE FUTURE I GREW UP DREAMING
            ABOUT IN SCI-FI GAMES AND MOVIES.
          </p>

          <div className="aboutWindow__divider">
            <span />
            <strong>MISSION PROFILE</strong>
            <span />
          </div>

          <div className="aboutWindow__copy">
            <p>
              I am a Computer Engineering student at
              California Polytechnic State University focused
              on embedded systems, robotics, wearable
              technology, and interactive software.
            </p>

            <p>
              I design complete engineering systems spanning
              mechanical design, electronics, firmware, and
              full-stack software. My goal is to transform
              ambitious fictional concepts into functional,
              documented, and manufacturable technology.
            </p>
          </div>

          <div className="aboutWindow__section">
            <div className="sectionHeading">
              <span>02</span>
              ACTIVE DISCIPLINES
            </div>

            <div className="disciplineGrid">
              {disciplines.map((discipline) => (
                <div
                  className="disciplineChip"
                  key={discipline}
                >
                  <span />
                  {discipline}
                </div>
              ))}
            </div>
          </div>

          <div className="aboutWindow__section">
            <div className="sectionHeading">
              <span>03</span>
              CURRENT OBJECTIVES
            </div>

            <div className="objectiveList">
              {objectives.map((objective, index) => (
                <div
                  className="objectiveItem"
                  key={objective}
                >
                  <span className="objectiveItem__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{objective}</strong>

                  <span className="objectiveItem__status">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="aboutWindow__database">
          <div className="databaseHeader">
            <div>
              <span>PERSONNEL DATABASE</span>
              <strong>OPERATOR DATA</strong>
            </div>

            <span className="databaseHeader__code">
              VL-0606
            </span>
          </div>

          <div className="operatorPortrait">
            <div className="operatorPortrait__scanline" />

            <div className="operatorPortrait__initials">
              VL
            </div>

            <span className="operatorPortrait__corner operatorPortrait__corner--one" />
            <span className="operatorPortrait__corner operatorPortrait__corner--two" />
            <span className="operatorPortrait__corner operatorPortrait__corner--three" />
            <span className="operatorPortrait__corner operatorPortrait__corner--four" />

            <div className="operatorPortrait__footer">
              BIOMETRIC IMAGE UNAVAILABLE
            </div>
          </div>

          <div className="systemData">
            {systemData.map((item) => (
              <div
                className="systemData__row"
                key={item.label}
              >
                <span>{item.label}</span>

                <strong
                  className={
                    item.status
                      ? "systemData__online"
                      : undefined
                  }
                >
                  {item.status && (
                    <span className="systemData__dot" />
                  )}

                  {item.value}
                </strong>
              </div>
            ))}
          </div>

          <div className="databaseFooter">
            <span>RECORD STATUS</span>
            <strong>VERIFIED</strong>
          </div>
        </aside>
      </div>
    </WindowFrame>
  );
}