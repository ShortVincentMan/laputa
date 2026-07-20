"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./main-menu.css";

type WindowType =
  | "projects"
  | "experience"
  | "about"
  | "contact";

const desktopNavItems: {
  label: string;
  window: WindowType;
}[] = [
  { label: "PROJECTS", window: "projects" },
  { label: "EXPERIENCE", window: "experience" },
  { label: "ABOUT", window: "about" },
  { label: "CONTACT", window: "contact" },
];

const drawerNavItems = [
  { label: "HOME", href: "/home" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

type MainMenuProps = {
  variant?: "home" | "drawer";
  defaultOpen?: boolean;
  activeWindow?: WindowType | null;
  onNavigate?: (window: WindowType) => void;
  onHome?: () => void;
};

export default function MainMenu({
  variant = "home",
  defaultOpen = false,
  activeWindow,
  onNavigate,
  onHome,
}: MainMenuProps) {
  const pathname = usePathname();
  const isHomeVariant = variant === "home";

  const [isOpen, setIsOpen] = useState(
    isHomeVariant ? true : defaultOpen
  );

  useEffect(() => {
    if (isHomeVariant || !isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHomeVariant, isOpen]);

  const menuContent = (
    <>
      {!isHomeVariant && (
        <button
          type="button"
          className="menuClose"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}

      <header className="cpNavHeader">
        <div className="cpNavLogo">VINCENT LE</div>
        <div className="cpNavSubtitle">PORTFOLIO INTERFACE</div>
      </header>

      <nav className="cpNavList" aria-label="Primary navigation">
        {isHomeVariant ? (
          <>
            <button
              type="button"
              className={`cpNavItem ${
                activeWindow == null ? "cpNavItemActive" : ""
              }`}
              onClick={onHome}
            >
              <span className="cpNavLabel">HOME</span>
              <span className="cpNavMeta">00</span>
            </button>

            {desktopNavItems.map((item, index) => (
              <button
                key={item.window}
                type="button"
                className={`cpNavItem ${
                  activeWindow === item.window
                    ? "cpNavItemActive"
                    : ""
                }`}
                onClick={() => onNavigate?.(item.window)}
              >
                <span className="cpNavLabel">{item.label}</span>

                <span className="cpNavMeta">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </>
        ) : (
          drawerNavItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/home" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`cpNavItem ${
                  isActive ? "cpNavItemActive" : ""
                }`}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="cpNavLabel">{item.label}</span>

                <span className="cpNavMeta">
                  {String(index).padStart(2, "0")}
                </span>
              </Link>
            );
          })
        )}
      </nav>

      <footer className="cpNavFooter">
        <span className="cpNavVersion">1.0</span>
        <strong className="cpNavUser">VINCENT_LE</strong>

        <div className="cpNavAccount">
          <span className="cpNavAccountIcon" aria-hidden="true">
            V
          </span>
          <span>ACCOUNT SELECT</span>
        </div>
      </footer>
    </>
  );

  if (isHomeVariant) {
    return (
      <aside className="cpNav cpNavHome">
        {menuContent}
      </aside>
    );
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="menuTrigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          aria-expanded={false}
          aria-controls="main-navigation-drawer"
        >
          <span className="menuTriggerCode">MENU</span>

          <span className="menuTriggerLines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      )}

      <div
        className={`menuBackdrop ${
          isOpen ? "menuBackdropVisible" : ""
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="main-navigation-drawer"
        className={`cpNav cpNavDrawer ${
          isOpen ? "cpNavDrawerOpen" : ""
        }`}
        aria-hidden={!isOpen}
      >
        {menuContent}
      </aside>
    </>
  );
}