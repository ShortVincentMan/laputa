import type { ReactNode } from "react";

type ActionKeyProps = {
  keyLabel: ReactNode;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function ActionKey({
  keyLabel,
  label,
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
}: ActionKeyProps) {
  const classes = [
    "actionKey",
    onClick ? "actionKey--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="actionKey__key">{keyLabel}</span>
      <span className="actionKey__label">{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}