"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import ActionBar from "@/components/shared/ActionBar";
import ActionKey from "@/components/shared/ActionKey";

import "./contact-window.css";

type ContactWindowProps = {
  onClose: () => void;
};

type ContactId =
  | "message"
  | "linkedin"
  | "github"
  | "resume"
  | "location";

type ContactTab = "contacts" | "messages";
type SendState = "idle" | "sending" | "sent" | "error";

type ContactRecord = {
  id: ContactId;
  label: string;
  subtitle: string;
  value: string;
  actionLabel: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
};

const contacts: ContactRecord[] = [
  {
    id: "message",
    label: "Vincent Le",
    subtitle: "Secure message relay",
    value: "DIRECT CHANNEL // ONLINE",
    actionLabel: "Open Message Thread",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    subtitle: "Professional network",
    value: "linkedin.com/in/vincentrle",
    actionLabel: "Open LinkedIn",
    href: "https://www.linkedin.com/in/vincentrle",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    subtitle: "Engineering repositories",
    value: "github.com/ShortVincentMan",
    actionLabel: "Open GitHub",
    href: "https://github.com/ShortVincentMan",
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    subtitle: "Personnel archive",
    value: "DOCUMENT PENDING",
    actionLabel: "Resume Unavailable",
    disabled: true,
  },
  {
    id: "location",
    label: "Location",
    subtitle: "Current operating region",
    value: "SAN LUIS OBISPO, CA",
    actionLabel: "Location Record",
    disabled: true,
  },
];

export default function ContactWindow({
  onClose,
}: ContactWindowProps) {
  const [activeTab, setActiveTab] =
    useState<ContactTab>("contacts");
  const [selectedId, setSelectedId] =
    useState<ContactId>("message");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [sendState, setSendState] =
    useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedContact = useMemo(
    () =>
      contacts.find(
        (contact) => contact.id === selectedId
      ) ?? contacts[0],
    [selectedId]
  );

  const moveSelection = useCallback(
    (direction: 1 | -1) => {
      const currentIndex = contacts.findIndex(
        (contact) => contact.id === selectedId
      );

      const nextIndex =
        (currentIndex + direction + contacts.length) %
        contacts.length;

      setSelectedId(contacts[nextIndex].id);
    },
    [selectedId]
  );

  const openContact = useCallback(
    (contact: ContactRecord) => {
      setSelectedId(contact.id);

      if (contact.id === "message") {
        setActiveTab("messages");
        setSendState("idle");
        setErrorMessage("");
        return;
      }

      if (
        contact.href &&
        !contact.disabled
      ) {
        window.open(
          contact.href,
          contact.external ? "_blank" : "_self",
          contact.external
            ? "noopener,noreferrer"
            : undefined
        );
      }
    },
    []
  );

  const activateSelectedContact = useCallback(() => {
    openContact(selectedContact);
  }, [openContact, selectedContact]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if (event.key === "Escape") {
        if (editing) return;

        event.preventDefault();

        if (activeTab === "messages") {
          setActiveTab("contacts");
          return;
        }

        onClose();
        return;
      }

      if (editing || activeTab !== "contacts") {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "s":
        case "S":
          event.preventDefault();
          moveSelection(1);
          break;

        case "ArrowUp":
        case "w":
        case "W":
          event.preventDefault();
          moveSelection(-1);
          break;

        case "Enter":
          event.preventDefault();
          activateSelectedContact();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeTab,
    activateSelectedContact,
    moveSelection,
    onClose,
  ]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sendState === "sending") return;

    setSendState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          website,
        }),
      });

      const result = (await response
        .json()
        .catch(() => null)) as
        | {
            success?: boolean;
            error?: string;
          }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error ??
            "Transmission failed. Try again later."
        );
      }

      setSendState("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
    } catch (error) {
      setSendState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Transmission failed. Try again later."
      );
    }
  }

  function resetComposer() {
    setSendState("idle");
    setErrorMessage("");
  }

  return (
    <section
      className="contactsScreen"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Vincent Le"
    >
      <div
        className="contactsScreen__scanlines"
        aria-hidden="true"
      />

      <main className="contactsWorkspace">
        <section className="contactsPanel">
          <header className="contactsHeader">
            <div
              className="contactsHeader__device"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div
              className="contactsTabs"
              role="tablist"
              aria-label="Contact views"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "messages"}
                className={
                  activeTab === "messages"
                    ? "is-active"
                    : ""
                }
                onClick={() => {
                  setActiveTab("messages");
                  setSelectedId("message");
                }}
              >
                <span aria-hidden="true">✉</span>
                Messages
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "contacts"}
                className={
                  activeTab === "contacts"
                    ? "is-active"
                    : ""
                }
                onClick={() =>
                  setActiveTab("contacts")
                }
              >
                <span aria-hidden="true">●</span>
                Contacts
              </button>
            </div>
          </header>

          {activeTab === "contacts" ? (
            <div
              className="contactsDirectory"
              role="listbox"
              aria-label="Contact methods"
            >
              {contacts.map((contact) => {
                const selected =
                  contact.id === selectedId;

                return (
                  <button
                    key={contact.id}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    aria-disabled={contact.disabled}
                    className={`contactsDirectory__item${
                      selected ? " is-selected" : ""
                    }${
                      contact.disabled
                        ? " is-disabled"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setSelectedId(contact.id)
                    }
                    onFocus={() =>
                      setSelectedId(contact.id)
                    }
                    onClick={() => openContact(contact)}
                  >
                    <span
                      className="contactsDirectory__icon"
                      aria-hidden="true"
                    >
                      {contact.id === "message"
                        ? "●"
                        : ""}
                    </span>

                    <span className="contactsDirectory__copy">
                      <strong>{contact.label}</strong>
                      <small>{contact.subtitle}</small>
                    </span>

                    {selected && (
                      <span className="contactsDirectory__actions">
                        R ✉ F ☎
                      </span>
                    )}
                  </button>
                );
              })}

              <span
                className="contactsDirectory__rail"
                aria-hidden="true"
              />
            </div>
          ) : (
            <form
              className="messageThread"
              onSubmit={handleSubmit}
            >
              <input
                className="messageThread__honeypot"
                type="text"
                name="website"
                value={website}
                onChange={(event) =>
                  setWebsite(event.target.value)
                }
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <header className="messageThread__header">
                <span>MESSAGES</span>
                <strong>› VINCENT LE</strong>
                <small>TRN_CLASS_CONTACT</small>
              </header>

              <div className="messageThread__body">
                <div className="messageBubble messageBubble--incoming">
                  <p>
                    Hey. Leave your contact information and
                    tell me what you want to build.
                  </p>
                </div>

                <label className="messageBubble messageBubble--outgoing messageBubble--field">
                  <span>Operator Name</span>
                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>

                <label className="messageBubble messageBubble--outgoing messageBubble--field">
                  <span>Return Channel</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="messageBubble messageBubble--outgoing messageBubble--field">
                  <span>Subject</span>
                  <input
                    value={subject}
                    onChange={(event) =>
                      setSubject(event.target.value)
                    }
                    required
                    maxLength={150}
                    placeholder="Opportunity, project, or idea"
                  />
                </label>

                <label className="messageBubble messageBubble--outgoing messageBubble--field messageBubble--message">
                  <span>Message</span>
                  <textarea
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder="Compose transmission"
                  />
                </label>

                {sendState === "sent" && (
                  <div
                    className="messageBubble messageBubble--incoming messageBubble--system"
                    role="status"
                  >
                    <p>
                      Transmission accepted. Message delivered.
                    </p>
                  </div>
                )}

                {sendState === "error" && (
                  <div
                    className="messageBubble messageBubble--incoming messageBubble--error"
                    role="alert"
                  >
                    <p>
                      Transmission error // {errorMessage}
                    </p>
                  </div>
                )}
              </div>

              <div className="messageThread__composer">
                <span>
                  {sendState === "sending"
                    ? "UPLOADING PACKET..."
                    : sendState === "sent"
                      ? "CHANNEL CONFIRMED"
                      : "SECURE RELAY READY"}
                </span>

                {sendState === "sent" ? (
                  <button
                    type="button"
                    onClick={resetComposer}
                  >
                    New Message
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={sendState === "sending"}
                  >
                    {sendState === "sending"
                      ? "Transmitting..."
                      : "Send Transmission"}
                  </button>
                )}
              </div>
            </form>
          )}
        </section>

        <aside className="contactPreview">
          <span className="contactPreview__eyebrow">
            CONTACT DATABASE // VL-01
          </span>

          <h1>
            {activeTab === "messages"
              ? "SECURE MESSAGE"
              : selectedContact.label}
          </h1>

          <p>
            {activeTab === "messages"
              ? "Your message is sent through a private server-side relay. Vincent's email address is never exposed to the browser."
              : selectedContact.value}
          </p>

          {activeTab === "contacts" && (
            <button
              type="button"
              onClick={activateSelectedContact}
              disabled={selectedContact.disabled}
            >
              {selectedContact.actionLabel}
            </button>
          )}
        </aside>
      </main>

      <ActionBar
        status={
          activeTab === "messages"
            ? "MESSAGE CHANNEL OPEN"
            : "CONTACT DIRECTORY ONLINE"
        }
      >
        {activeTab === "contacts" ? (
          <>
            <ActionKey keyLabel="↑ ↓" label="Navigate" />
            <ActionKey
              keyLabel="ENTER"
              label="Select"
              onClick={activateSelectedContact}
              disabled={selectedContact.disabled}
            />
            <ActionKey
              keyLabel="ESC"
              label="Close"
              onClick={onClose}
            />
          </>
        ) : (
          <>
            <ActionKey
              keyLabel="BKSP"
              label="Contacts"
              onClick={() => setActiveTab("contacts")}
            />
            <ActionKey
              keyLabel="ESC"
              label="Close"
              onClick={onClose}
            />
          </>
        )}
      </ActionBar>
    </section>
  );
}