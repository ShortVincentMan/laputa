"use client";

import WindowFrame from "./WindowFrame";

type ContactWindowProps = {
  onClose: () => void;
};

const contactMethods = [
  {
    label: "Email",
    value: "vinvyle06@gmail.com",
    detail: "Primary communications channel",
    href: "mailto:vinvyle06@gmail.com",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/ShortVincentMan",
    detail: "Repositories and engineering projects",
    href: "https://github.com/ShortVincentMan",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vincentrle",
    detail: "Professional network and experience",
    href: "https://www.linkedin.com/in/vincentrle",
    external: true,
  },
];

export default function ContactWindow({
  onClose,
}: ContactWindowProps) {
  return (
    <WindowFrame
      title="Communications"
      subtitle="Secure channels // external network access"
      footer="Communications network online // three channels available"
      onClose={onClose}
    >
      <div className="contactWindow">
        <section className="contactWindow__intro">
          <div className="contactSignal">
            <div className="contactSignal__rings">
              <span />
              <span />
              <span />
              <strong>VL</strong>
            </div>

            <div className="contactSignal__status">
              <span />
              SIGNAL DETECTED
            </div>
          </div>

          <span className="dataLabel">
            EXTERNAL COMMUNICATIONS
          </span>

          <h2>ESTABLISH CONNECTION</h2>

          <p>
            Available for engineering projects, research,
            internships, technical collaboration, and
            development opportunities.
          </p>

          <div className="availabilityPanel">
            <div>
              <span>Network Status</span>
              <strong>
                <span className="availabilityPanel__dot" />
                Online
              </strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                San Luis Obispo, California
              </strong>
            </div>

            <div>
              <span>Response Protocol</span>
              <strong>Email Preferred</strong>
            </div>
          </div>
        </section>

        <section className="contactWindow__channels">
          <header className="channelHeader">
            <div>
              <span>AVAILABLE NETWORKS</span>
              <strong>SELECT CHANNEL</strong>
            </div>

            <span>03 ONLINE</span>
          </header>

          <div className="contactGrid">
            {contactMethods.map((method, index) => (
              <a
                key={method.label}
                className="contactCard"
                href={method.href}
                target={
                  method.external ? "_blank" : undefined
                }
                rel={
                  method.external
                    ? "noreferrer"
                    : undefined
                }
              >
                <span className="contactCard__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="contactCard__content">
                  <span className="contactCard__label">
                    {method.label}
                  </span>

                  <strong>{method.value}</strong>

                  <p>{method.detail}</p>
                </div>

                <div className="contactCard__action">
                  <span>OPEN</span>
                  <strong>↗</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="contactNotice">
            <span>NOTICE</span>

            <p>
              Do not transmit confidential, proprietary, or
              sensitive information through unsecured
              channels.
            </p>
          </div>
        </section>
      </div>
    </WindowFrame>
  );
}