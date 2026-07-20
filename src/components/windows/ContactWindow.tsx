"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import WindowFrame from "./WindowFrame";

import "./contact-window.css";

type ContactWindowProps = {
  onClose: () => void;
};

type ContactChannel = {
  id: string;
  label: string;
  handle: string;
  category: string;
  description: string;
  status: string;
  actionLabel: string;
  href: string;
  external?: boolean;
};

const channels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    handle: "vinvyle06@gmail.com",
    category: "Direct Channel",
    description:
      "Primary contact method for internships, research, engineering collaborations, and professional opportunities.",
    status: "AVAILABLE",
    actionLabel: "Send Email",
    href: "mailto:vinvyle06@gmail.com",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "linkedin.com/in/vincentrle",
    category: "Professional Network",
    description:
      "View professional experience, research, education, leadership, and current engineering work.",
    status: "CONNECTED",
    actionLabel: "Open LinkedIn",
    href: "https://www.linkedin.com/in/vincentrle",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "github.com/ShortVincentMan",
    category: "Code Repository",
    description:
      "Browse software, embedded systems, portfolio development, and engineering project repositories.",
    status: "ONLINE",
    actionLabel: "Open GitHub",
    href: "https://github.com/ShortVincentMan",
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    handle: "Vincent Le // Engineering Resume",
    category: "Document Archive",
    description:
      "Download a concise overview of technical experience, education, research, projects, and skills.",
    status: "LOCKED",
    actionLabel: "Resume Coming Soon",
    href: "",
  },
];

export default function ContactWindow({
  onClose,
}: ContactWindowProps) {
  const [selectedId, setSelectedId] = useState(
    channels[0].id
  );

  const selectedChannel = useMemo(
    () =>
      channels.find(
        (channel) => channel.id === selectedId
      ) ?? channels[0],
    [selectedId]
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = channels.findIndex(
        (channel) => channel.id === selectedId
      );

      const nextIndex =
        (currentIndex +
          direction +
          channels.length) %
        channels.length;

      setSelectedId(channels[nextIndex].id);
    },
    [selectedId]
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();
        moveSelection(1);
      }

      if (
        event.key === "ArrowUp" ||
        event.key.toLowerCase() === "w"
      ) {
        event.preventDefault();
        moveSelection(-1);
      }

      if (
        event.key === "Enter" &&
        selectedChannel.href
      ) {
        event.preventDefault();

        if (selectedChannel.external) {
          window.open(
            selectedChannel.href,
            "_blank",
            "noopener,noreferrer"
          );
        } else {
          window.location.href =
            selectedChannel.href;
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [moveSelection, selectedChannel]);

  return (
    <WindowFrame
      title="Contacts"
      subtitle="Communications directory // external channels"
      sectionLabel="NETWORK"
      footer={`${channels.length} communication channels loaded`}
      className="contactFrame"
      onClose={onClose}
    >
      <div className="contactInterface">
        <aside className="contactDirectory">
          <header className="contactDirectory__header">
            <div>
              <span>CONTACT DIRECTORY</span>
              <strong>AVAILABLE CHANNELS</strong>
            </div>

            <span>
              {String(channels.length).padStart(
                2,
                "0"
              )}
            </span>
          </header>

          <div className="contactDirectory__list">
            {channels.map((channel, index) => {
              const isSelected =
                channel.id === selectedChannel.id;

              return (
                <button
                  key={channel.id}
                  type="button"
                  className={
                    isSelected
                      ? "contactDirectoryItem contactDirectoryItem--selected"
                      : "contactDirectoryItem"
                  }
                  onClick={() =>
                    setSelectedId(channel.id)
                  }
                  aria-pressed={isSelected}
                >
                  <span className="contactDirectoryItem__index">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="contactDirectoryItem__identity">
                    <strong>{channel.label}</strong>
                    <span>{channel.category}</span>
                  </span>

                  <span className="contactDirectoryItem__status">
                    {channel.status}
                  </span>
                </button>
              );
            })}
          </div>

          <footer className="contactDirectory__footer">
            <span>W/S</span>
            Navigate contacts
          </footer>
        </aside>

        <article
          className="contactDetails"
          key={selectedChannel.id}
        >
          <div
            className="contactDetails__backgroundCode"
            aria-hidden="true"
          >
            {selectedChannel.id
              .toUpperCase()
              .padEnd(10, "0")}
          </div>

          <header className="contactDetails__header">
            <div>
              <span className="contactDetails__eyebrow">
                SELECTED CONTACT //{" "}
                {selectedChannel.category}
              </span>

              <h2>{selectedChannel.label}</h2>

              <p>{selectedChannel.handle}</p>
            </div>

            <div className="contactDetails__status">
              <span
                className={
                  selectedChannel.status ===
                  "LOCKED"
                    ? "contactDetails__statusDot contactDetails__statusDot--locked"
                    : "contactDetails__statusDot"
                }
              />

              <div>
                <span>Channel Status</span>
                <strong>
                  {selectedChannel.status}
                </strong>
              </div>
            </div>
          </header>

          <div className="contactDetails__divider" />

          <section className="contactDetails__section">
            <div className="contactDetails__sectionTitle">
              <span>01</span>
              <strong>Channel Information</strong>
            </div>

            <p className="contactDetails__description">
              {selectedChannel.description}
            </p>
          </section>

          <section className="contactDetails__section">
            <div className="contactDetails__sectionTitle">
              <span>02</span>
              <strong>Connection Data</strong>
            </div>

            <div className="contactDetails__metadata">
              <div>
                <span>Contact Type</span>
                <strong>
                  {selectedChannel.category}
                </strong>
              </div>

              <div>
                <span>Address</span>
                <strong>
                  {selectedChannel.handle}
                </strong>
              </div>

              <div>
                <span>Protocol</span>
                <strong>
                  {selectedChannel.external
                    ? "EXTERNAL LINK"
                    : "DIRECT LINK"}
                </strong>
              </div>
            </div>
          </section>

          <section className="contactDetails__actionSection">
            {selectedChannel.href ? (
              <a
                className="contactDetails__action"
                href={selectedChannel.href}
                target={
                  selectedChannel.external
                    ? "_blank"
                    : undefined
                }
                rel={
                  selectedChannel.external
                    ? "noreferrer"
                    : undefined
                }
              >
                <span className="contactDetails__actionIcon">
                  ↗
                </span>

                <span className="contactDetails__actionText">
                  <small>
                    ESTABLISH CONNECTION
                  </small>

                  <strong>
                    {selectedChannel.actionLabel}
                  </strong>
                </span>

                <span className="contactDetails__actionArrow">
                  &gt;
                </span>
              </a>
            ) : (
              <div className="contactDetails__action contactDetails__action--disabled">
                <span className="contactDetails__actionIcon">
                  ×
                </span>

                <span className="contactDetails__actionText">
                  <small>ACCESS DENIED</small>

                  <strong>
                    {selectedChannel.actionLabel}
                  </strong>
                </span>
              </div>
            )}
          </section>

          <footer className="contactDetails__footer">
            <span>
              CHANNEL ID //{" "}
              {selectedChannel.id.toUpperCase()}
            </span>

            <strong>
              CONNECTION SECURE
            </strong>
          </footer>
        </article>
      </div>
    </WindowFrame>
  );
}