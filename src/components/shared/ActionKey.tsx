import type { ReactNode } from "react";

type ActionKeyProps = {
  keyLabel: ReactNode;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  focusReturnId?: string;
  modalClose?: boolean;
};

function isEscapeCloseControl(keyLabel: ReactNode, label: ReactNode) {
  if (typeof keyLabel !== "string" || typeof label !== "string") {
    return false;
  }

  const normalizedKey = keyLabel.trim().toUpperCase();
  const normalizedLabel = label.trim().toUpperCase();

  return (
    normalizedKey === "ESC" &&
    (normalizedLabel === "CLOSE" ||
      normalizedLabel === "BACK" ||
      normalizedLabel === "EXIT")
  );
}

export default function ActionKey({
  keyLabel,
  label,
  onClick,
  disabled = false,
  className = "",
  ariaLabel,
  focusReturnId,
  modalClose,
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
    const closesModal =
      modalClose ?? isEscapeCloseControl(keyLabel, label);

    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        data-focus-return={focusReturnId}
        data-modal-close={closesModal ? "true" : undefined}
      >
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
