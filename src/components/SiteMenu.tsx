"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./sitemenu.css";

const navItems = [
  { label: "HOME", href: "/home" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

type SiteMenuProps = {
  defaultOpen?: boolean;
};

export default function SiteMenu({
  defaultOpen = false,
}: SiteMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [pathname, defaultOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="menuTrigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation"
          aria-expanded={false}
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
        className={`menuBackdrop ${isOpen ? "menuBackdropVisible" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`siteMenu ${isOpen ? "siteMenuOpen" : ""}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="menuClose"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
        >
          <span aria-hidden="true">×</span>
        </button>

        <header className="siteMenuHeader">
          <p className="siteMenuEyebrow">PORTFOLIO INTERFACE</p>
          <h2>VINCENT LE</h2>
        </header>

        <nav className="siteMenuNav" aria-label="Primary navigation">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/home" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`siteMenuLink ${
                  isActive ? "siteMenuLinkActive" : ""
                }`}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="siteMenuIndex">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="siteMenuLabel">{item.label}</span>

                <span className="siteMenuGlyph" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <footer className="siteMenuFooter">
          <span>1.0</span>
          <strong>VINCENT_LE</strong>

          <div className="siteMenuStatus">
            <span className="siteMenuStatusDot" />
            SYSTEM ONLINE
          </div>
        </footer>
      </aside>
    </>
  );
}