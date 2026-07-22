import type { ReactNode } from "react";

import "./top-hud.css";

export type TopHudMetric = {
  value: ReactNode;
  label: ReactNode;
  tone?: "cyan" | "green" | "red" | "yellow";
};

export type TopHudNavItem = {
  id: string;
  label: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
};

type TopHudProps = {
  metrics: TopHudMetric[];
  navigation: TopHudNavItem[];
  systemLabel?: ReactNode;
  archiveLabel: ReactNode;
  ariaLabel?: string;
  className?: string;
};

export default function TopHud({
  metrics,
  navigation,
  systemLabel = "LAPUTA OS",
  archiveLabel,
  ariaLabel = "Portfolio sections",
  className = "",
}: TopHudProps) {
  return (
    <header className={`topHud ${className}`.trim()}>
      <div className="topHud__metrics">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`topHud__metric topHud__metric--${
              metric.tone ?? "cyan"
            }`}
          >
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <nav className="topHud__navigation" aria-label={ariaLabel}>
        {navigation.map((item) => {
          const className = [
            "topHud__navigationItem",
            item.active ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (item.onClick || item.disabled) {
            return (
              <button
                key={item.id}
                type="button"
                className={className}
                disabled={item.disabled}
                onClick={item.onClick}
                title={item.title}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </button>
            );
          }

          return (
            <span
              key={item.id}
              className={className}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </span>
          );
        })}
      </nav>

      <div className="topHud__status">
        <span>{systemLabel}</span>
        <strong>{archiveLabel}</strong>
      </div>
    </header>
  );
}