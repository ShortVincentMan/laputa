"use client";

import WindowFrame from "./WindowFrame";

type ContactWindowProps = {
  onClose: () => void;
};

const contactMethods = [
  {
    label: "Email",
    value: "Add your email address",
    href: "",
  },
  {
    label: "LinkedIn",
    value: "Add your LinkedIn profile",
    href: "",
  },
  {
    label: "GitHub",
    value: "Add your GitHub profile",
    href: "",
  },
];

export default function ContactWindow({
  onClose,
}: ContactWindowProps) {
  return (
    <WindowFrame
      title="Contact"
      subtitle="Secure communications // open channel"
      footer="Communication network online"
      onClose={onClose}
    >
      <div className="contactLayout">
        <section className="contactIntro">
          <span className="contactIntro__status">
            CHANNEL AVAILABLE
          </span>

          <h2>ESTABLISH CONNECTION</h2>

          <p>
            Reach out regarding engineering projects,
            research, internships, or collaboration.
          </p>
        </section>

        <div className="contactGrid">
          {contactMethods.map((method, index) => {
            const content = (
              <>
                <span className="contactCard__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="contactCard__label">
                    {method.label}
                  </span>

                  <strong>{method.value}</strong>
                </div>

                <span className="contactCard__arrow">
                  ↗
                </span>
              </>
            );

            return method.href ? (
              <a
                key={method.label}
                className="contactCard"
                href={method.href}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <div
                key={method.label}
                className="contactCard contactCard--disabled"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </WindowFrame>
  );
}