"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

import "./window-frame.css";

type WindowFrameProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
  tabs?: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClose?: () => void;
};

type Position = {
  x: number;
  y: number;
};

export default function WindowFrame({
  title,
  children,
  subtitle,
  tabs,
  footer,
  className = "",
  onClose,
}: WindowFrameProps) {
  const windowRef = useRef<HTMLElement>(null);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  function handlePointerDown(
    event: ReactPointerEvent<HTMLElement>
  ) {
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;

    if (target.closest("button, a, input, textarea, select")) {
      return;
    }

    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>
  ) {
    if (!isDragging || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();

    const nextX =
      event.clientX - dragOffset.current.x;

    const nextY =
      event.clientY - dragOffset.current.y;

    const minimumVisibleWidth = 120;
    const headerVisibleHeight = 60;

    const minX =
      -rect.left - rect.width + minimumVisibleWidth;

    const maxX =
      window.innerWidth - rect.left - minimumVisibleWidth;

    const minY =
      -rect.top;

    const maxY =
      window.innerHeight - rect.top - headerVisibleHeight;

    setPosition({
      x: Math.min(Math.max(nextX, minX), maxX),
      y: Math.min(Math.max(nextY, minY), maxY),
    });
  }

  function handlePointerUp(
    event: ReactPointerEvent<HTMLElement>
  ) {
    if (!isDragging) return;

    event.currentTarget.releasePointerCapture(
      event.pointerId
    );

    setIsDragging(false);
  }

  return (
    <section
      ref={windowRef}
      className={`windowFrame ${
        isDragging ? "windowFrame--dragging" : ""
      } ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      role="dialog"
      aria-label={title}
    >
      <div className="windowFrame__corner windowFrame__corner--topLeft" />
      <div className="windowFrame__corner windowFrame__corner--bottomRight" />

      <header
        className="windowFrame__header"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="windowFrame__heading">
          <span className="windowFrame__eyebrow">
            SYSTEM INTERFACE
          </span>

          <div>
            <h2 className="windowFrame__title">
              {title}
            </h2>

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
            <span aria-hidden="true">×</span>
          </button>
        )}
      </header>

      {tabs && (
        <nav className="windowFrame__tabs">
          {tabs}
        </nav>
      )}

      <div className="windowFrame__body">
        {children}
      </div>

      {footer && (
        <footer className="windowFrame__footer">
          {footer}
        </footer>
      )}
    </section>
  );
}