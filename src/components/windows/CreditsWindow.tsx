"use client";

import { useEffect, useState } from "react";

import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";

import "./credits-window.css";

type CreditsWindowProps = {
  onClose: () => void;
};

type CreditCardId = "project" | "acknowledgements";

const creditCards: Array<{
  id: CreditCardId;
  eyebrow: string;
  title: string;
}> = [
  {
    id: "project",
    eyebrow: "LAPUTA OS",
    title: "Project Credits",
  },
  {
    id: "acknowledgements",
    eyebrow: "SPECIAL THANKS",
    title: "Acknowledgements",
  },
];

export default function CreditsWindow({
  onClose,
}: CreditsWindowProps) {
  const [activeCard, setActiveCard] =
    useState<CreditCardId>("project");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "a" ||
        event.key === "A" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        event.preventDefault();
        setActiveCard((current) =>
          current === "project"
            ? "acknowledgements"
            : "project"
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <section
      className="creditsScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Laputa OS credits"
    >
      <div
        className="creditsScreen__scanlines"
        aria-hidden="true"
      />

      <div
        className="creditsScreen__leftCode"
        aria-hidden="true"
      >
        00010110010100101101001011010010
      </div>

      <div
        className="creditsScreen__rightCode"
        aria-hidden="true"
      >
        1001
        <br />
        0100
        <br />
        1101
        <br />
        0011
      </div>

      <header className="creditsHeader">
        <div
          className="creditsHeader__protocol"
          aria-hidden="true"
        >
          <span>PROTOCOL</span>
          <strong>6520-A44</strong>
        </div>

        <div className="creditsHeader__title">
          <span
            className="creditsHeader__mark"
            aria-hidden="true"
          >
            ▽
          </span>
          <h1>CREDITS</h1>
        </div>
      </header>

      <main className="creditsStage">
        <div className="creditsCards">
          <button
            type="button"
            className={`creditsCard creditsCard--project${
              activeCard === "project"
                ? " is-active"
                : ""
            }`}
            onClick={() => setActiveCard("project")}
            aria-pressed={activeCard === "project"}
          >
            <header className="creditsCard__heading">
              <span>{creditCards[0].eyebrow}</span>
              <h2>{creditCards[0].title}</h2>
            </header>

            <div className="creditsCard__panel">
              <section className="creditsSection">
                <span className="creditsSection__code">
                  01
                </span>
                <div>
                  <h3>CREATED BY</h3>
                  <p>
                    <strong>Vincent Le</strong>
                    <br />
                    Engineering, interface design,
                    development, and portfolio content.
                  </p>
                </div>
              </section>

              <section className="creditsSection">
                <span className="creditsSection__code">
                  02
                </span>
                <div>
                  <h3>TECHNOLOGY</h3>
                  <p>
                    Next.js // React // TypeScript // CSS
                    // Vercel // Resend
                  </p>
                </div>
              </section>

              <section className="creditsSection">
                <span className="creditsSection__code">
                  03
                </span>
                <div>
                  <h3>PROJECT STATUS</h3>
                  <p>
                    Independent, solo, non-commercial
                    portfolio project.
                  </p>
                </div>
              </section>

              <footer className="creditsCard__footer">
                <span>LAPUTA-OS // BUILD 01.00</span>
                <strong>ONLINE</strong>
              </footer>
            </div>
          </button>

          <button
            type="button"
            className={`creditsCard creditsCard--thanks${
              activeCard === "acknowledgements"
                ? " is-active"
                : ""
            }`}
            onClick={() =>
              setActiveCard("acknowledgements")
            }
            aria-pressed={
              activeCard === "acknowledgements"
            }
          >
            <header className="creditsCard__heading">
              <span>{creditCards[1].eyebrow}</span>
              <h2>{creditCards[1].title}</h2>
            </header>

            <div className="creditsCard__panel">
              <section className="creditsSection">
                <span className="creditsSection__code">
                  01
                </span>
                <div>
                  <h3>TITLE-SCREEN ASSETS</h3>
                  <p>
                    <a
                      href="https://www.youtube.com/watch?v=JkB3FbaKOkY"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      Vermillionaire
                    </a>
                    <br />
                    After Effects title-screen recreation
                    and source assets.
                  </p>
                </div>
              </section>

              <section className="creditsSection">
                <span className="creditsSection__code">
                  02
                </span>
                <div>
                  <h3>DEVELOPMENT ASSISTANCE</h3>
                  <p>
                    ChatGPT // OpenAI Codex // GitHub
                    Copilot
                  </p>
                </div>
              </section>

              <section className="creditsSection">
                <span className="creditsSection__code">
                  03
                </span>
                <div>
                  <h3>CREATIVE INSPIRATION</h3>
                  <p>
                    CD PROJEKT RED // Cyberpunk 2077
                    UI/UX design team // Mike Pondsmith //
                    R. Talsorian Games
                  </p>
                </div>
              </section>

              <section className="creditsSection creditsSection--legal">
                <span className="creditsSection__code">
                  04
                </span>
                <div>
                  <h3>PROJECT NOTICE</h3>
                  <p>
                    Laputa OS is an independent portfolio
                    project and is not affiliated with CD
                    PROJEKT RED or R. Talsorian Games.
                    Related names, visual references, and
                    trademarks belong to their respective
                    owners.
                  </p>
                </div>
              </section>

              <footer className="creditsCard__footer">
                <span>THANK YOU FOR CONNECTING</span>
                <strong>VERIFIED</strong>
              </footer>
            </div>
          </button>
        </div>

        <div
          className="creditsStage__microcopy"
          aria-hidden="true"
        >
          <span>JHN 102 CCK 151 CC10 A55</span>
          <span>TRN_CLASS_CREDITS</span>
        </div>
      </main>

      <ActionBar
        className="creditsActionBar"
        status="CREDITS DATABASE ONLINE"
      >
        <ActionKey
          keyLabel="← →"
          label="Navigate"
        />
        <ActionKey
          keyLabel="ESC"
          label="Back"
          onClick={onClose}
        />
      </ActionBar>
    </section>
  );
}