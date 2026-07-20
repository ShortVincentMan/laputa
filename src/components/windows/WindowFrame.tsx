"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import "./window-frame.css";

type WindowFrameProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
  sectionLabel?: string;
  tabs?: ReactNode;
  footer?: ReactNode;
  sideActions?: ReactNode;
  className?: string;
  onClose?: () => void;
};

export default function WindowFrame({
  title,
  children,
  subtitle,
  sectionLabel = "DATABASE",
  tabs,
  footer,
  sideActions,
  className = "",
  onClose,
}: WindowFrameProps) {
  useEffect(() => {
    if (!onClose) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
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
      className={`windowFrame ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="windowFrame__noise"
        aria-hidden="true"
      />

      <header className="windowFrame__top">
        <div className="windowFrame__topLeft">
          <span className="windowFrame__system">
            LAPUTA OS
          </span>

          <span className="windowFrame__separator">
            /
          </span>

          <span className="windowFrame__section">
            {sectionLabel}
          </span>
        </div>

        <div className="windowFrame__topRight">
          <span className="windowFrame__connection">
            <span />
            SYSTEM LINK ACTIVE
          </span>

          <span className="windowFrame__protocol">
            PROTOCOL 6520-A44
          </span>
        </div>
      </header>

      <div className="windowFrame__titleRow">
        <div className="windowFrame__heading">
          <span className="windowFrame__marker">
            01
          </span>

          <div>
            <h1 className="windowFrame__title">
              {title}
            </h1>

            {subtitle && (
              <p className="windowFrame__subtitle">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            className="windowFrame__close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <span className="windowFrame__closeKey">
              ESC
            </span>

            <span className="windowFrame__closeText">
              CLOSE
            </span>
          </button>
        )}
      </div>

      {tabs && (
        <nav
          className="windowFrame__tabs"
          aria-label={`${title} sections`}
        >
          {tabs}
        </nav>
      )}

      <div className="windowFrame__main">
        <main className="windowFrame__content">
          {children}
        </main>

        {sideActions && (
          <aside className="windowFrame__side">
            <div className="windowFrame__sideLine" />

            <div className="windowFrame__sideContent">
              {sideActions}
            </div>
          </aside>
        )}
      </div>

      <footer className="windowFrame__footer">
        <div className="windowFrame__footerStatus">
          <span className="windowFrame__footerIndicator" />

          <span>
            {footer ?? "DATABASE ONLINE"}
          </span>
        </div>

        <div className="windowFrame__controls">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
            >
              <span>ESC</span>
              Back
            </button>
          )}

          <div>
            <span>W/S</span>
            Navigate
          </div>

          <div>
            <span>ENTER</span>
            Select
          </div>
        </div>
      </footer>
    </section>
  );
}