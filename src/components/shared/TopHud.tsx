import type { ReactNode } from "react";

import "./top-hud.css";

export type TopHudMetric = {
  value: ReactNode;
  label: ReactNode;
  tone?: "cyan" | "green" | "red" | "yellow";
};

export type TopHudSubmenuItem = {
  id: string;
  label: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
};

export type TopHudNavItem = {
  id: string;
  label: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title?: string;
  submenu?: TopHudSubmenuItem[];
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
          const itemClassName = [
            "topHud__navigationItem",
            item.active ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const trigger = item.onClick || item.disabled || item.submenu ? (
            <button
              type="button"
              className={itemClassName}
              disabled={item.disabled}
              onClick={item.onClick}
              title={item.title}
              aria-current={item.active ? "page" : undefined}
              aria-haspopup={item.submenu ? "menu" : undefined}
            >
              {item.label}
            </button>
          ) : (
            <span
              className={itemClassName}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </span>
          );

          if (!item.submenu) {
            return <div key={item.id}>{trigger}</div>;
          }

          return (
            <div key={item.id} className="topHud__navigationGroup">
              {trigger}

              <div
                className="topHud__dropdown"
                role="menu"
                aria-label="Journal navigation"
              >
                {item.submenu.map((submenuItem) => (
                  <button
                    key={submenuItem.id}
                    type="button"
                    role="menuitem"
                    className={[
                      "topHud__dropdownItem",
                      submenuItem.active ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={submenuItem.disabled}
                    onClick={submenuItem.onClick}
                  >
                    <span className="topHud__dropdownIcon" aria-hidden="true">
                      {submenuItem.id === "projects" && "▦"}
                      {submenuItem.id === "journal-log" && "▤"}
                      {submenuItem.id === "gallery" && "▧"}
                    </span>

                    <span className="topHud__dropdownCopy">
                      <strong>{submenuItem.label}</strong>

                      <small>
                        {submenuItem.disabled
                          ? "ACCESS NOT YET AVAILABLE"
                          : "CERTIFIED TO ACCESS"}
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
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
