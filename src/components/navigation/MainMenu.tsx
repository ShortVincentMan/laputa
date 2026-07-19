"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./main-menu.css";

const navItems = [
  { label: "HOME", href: "/home" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

type MainMenuProps = {
  variant?: "home" | "drawer";
  defaultOpen?: boolean;
};

export default function MainMenu({
  variant = "home",
  defaultOpen = false,
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

      <header className="mainMenuHeader">
        <h2 className="mainMenuLogo">VINCENT LE</h2>
        <p className="mainMenuEyebrow">PORTFOLIO INTERFACE</p>
      </header>

      <nav className="mainMenuNav" aria-label="Primary navigation">
        {navItems.map((item, index) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/home" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mainMenuLink ${
                isActive ? "mainMenuLinkActive" : ""
              }`}
              onClick={() => {
                if (!isHomeVariant) {
                  setIsOpen(false);
                }
              }}
              tabIndex={isHomeVariant || isOpen ? 0 : -1}
            >
              <span className="mainMenuIndex">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="mainMenuLabel">{item.label}</span>

              <span className="mainMenuGlyph" aria-hidden="true" />
            </Link>
          );
        })}
      </nav>

      <footer className="mainMenuFooter">
        <span className="mainMenuVersion">1.0</span>
        <strong className="mainMenuUser">VINCENT_LE</strong>

        <div className="mainMenuStatus">
          <span className="mainMenuStatusDot" aria-hidden="true" />
          SYSTEM ONLINE
        </div>
      </footer>
    </>
  );

  if (isHomeVariant) {
    return (
      <aside className="mainMenu mainMenuHome">
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
        className={`mainMenu mainMenuDrawer ${
          isOpen ? "mainMenuOpen" : ""
        }`}
        aria-hidden={!isOpen}
      >
        {menuContent}
      </aside>
    </>
  );
}
