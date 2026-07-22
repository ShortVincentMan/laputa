import type { ReactNode } from "react";

import "./action-bar.css";

type ActionBarProps = {
  children: ReactNode;
  status?: ReactNode;
  className?: string;
};

export default function ActionBar({
  children,
  status,
  className = "",
}: ActionBarProps) {
  const classes = ["actionBar", className]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={classes}>
      <div className="actionBar__status">
        {status && (
          <>
            <span className="actionBar__indicator" aria-hidden="true" />
            <span>{status}</span>
          </>
        )}
      </div>

      <div className="actionBar__controls">{children}</div>
    </footer>
  );
}