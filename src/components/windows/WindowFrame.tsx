"use client";

import type { ReactNode } from "react";

import "./window-frame.css";

type WindowFrameProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
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
  tabs,
  footer,
  sideActions,
  className = "",
  onClose,
}: WindowFrameProps) {
  return (
    <section
      className={`windowFrame ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="windowFrame__topBar">
        <div className="windowFrame__protocol">
          PROTOCOL 6520-A44
        </div>

        <div className="windowFrame__status">
          SYSTEM LINK // ACTIVE
        </div>
      </div>

      <header className="windowFrame__header">
        <div className="windowFrame__heading">
          <span className="windowFrame__index">01</span>

          <div>
            <h1 className="windowFrame__title">{title}</h1>

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
            <span>ESC</span>
            <strong>CLOSE</strong>
          </button>
        )}
      </header>

      {tabs && (
        <nav className="windowFrame__tabs">
          {tabs}
        </nav>
      )}

      <div className="windowFrame__layout">
        <main className="windowFrame__body">
          {children}
        </main>

        {sideActions && (
          <aside className="windowFrame__sideActions">
            {sideActions}
          </aside>
        )}
      </div>

      <footer className="windowFrame__footer">
        <div className="windowFrame__footerData">
          {footer ?? "DATABASE ONLINE"}
        </div>

        <div className="windowFrame__controls">
          <button type="button" onClick={onClose}>
            <span>ESC</span>
            Close
          </button>

          <div>
            <span>F1</span>
            Help
          </div>

          <div>
            <span>◉</span>
            Select
          </div>
        </div>
      </footer>
    </section>
  );
}