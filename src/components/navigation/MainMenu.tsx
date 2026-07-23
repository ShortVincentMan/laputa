"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "./main-menu.css";

export type WindowType =
  | "projects"
  | "experience"
  | "about"
  | "contact"
  | "credits"
  | "music";

type MainMenuProps = {
  variant?: "home" | "drawer";
  defaultOpen?: boolean;
  activeWindow?: WindowType | null;
  onNavigate?: (window: WindowType) => void;
  onHome?: () => void;
};

const homeNavItems: {
  label: string;
  window: Exclude<WindowType, "music">;
}[] = [
  {
    label: "PROJECTS",
    window: "projects",
  },
  {
    label: "EXPERIENCE",
    window: "experience",
  },
  {
    label: "ABOUT",
    window: "about",
  },
  {
    label: "CONTACT",
    window: "contact",
  },
  {
    label: "CREDITS",
    window: "credits",
  },
];

type HomeMenuKey =
  | "home"
  | Exclude<WindowType, "music">;

type HomeMenuPreview = {
  eyebrow: string;
  title: string;
  subtitle: string;
  status: string;
  period: string;
  image?: string;
};

const homeMenuPreviews: Record<
  HomeMenuKey,
  HomeMenuPreview
> = {
  home: {
    eyebrow: "SYSTEM RECORD // 00",
    title: "LAPUTA OS",
    subtitle: "INTERACTIVE ENGINEERING PORTFOLIO",
    status: "SYSTEM ONLINE",
    period: "BUILD 01.00",
  },

  projects: {
    eyebrow: "FEATURED RECORD // 01",
    title: "MANTIS BLADES",
    subtitle: "WEARABLE ROBOTIC MECHANISM",
    status: "COMPLETED PROTOTYPE",
    period: "2024 — 2025",
    image: "/assets/projects/mantis-blades/hero.jpeg",
  },

  experience: {
    eyebrow: "PERSONNEL RECORD // 02",
    title: "ENGINEERING HISTORY",
    subtitle: "RESEARCH // EMBEDDED // OPERATIONS",
    status: "RECORD READY",
    period: "2024 — PRESENT",
  },

  about: {
    eyebrow: "CHARACTER RECORD // 03",
    title: "VINCENT LE",
    subtitle: "COMPUTER ENGINEER // RESEARCHER",
    status: "PROFILE ONLINE",
    period: "CAL POLY SLO",
  },

  contact: {
    eyebrow: "NETWORK RECORD // 04",
    title: "CONTACT CHANNELS",
    subtitle: "PROFESSIONAL // DIRECT // EXTERNAL",
    status: "CHANNELS AVAILABLE",
    period: "SECURE LINK",
  },

  credits: {
    eyebrow: "ARCHIVE RECORD // 05",
    title: "CREDITS",
    subtitle: "CONTRIBUTORS // REFERENCES // SOURCES",
    status: "ACKNOWLEDGEMENTS",
    period: "LAPUTA OS",
  },
};

const drawerNavItems = [
  {
    label: "HOME",
    href: "/home",
  },
  {
    label: "PROJECTS",
    href: "/projects",
  },
  {
    label: "EXPERIENCE",
    href: "/experience",
  },
  {
    label: "ABOUT",
    href: "/about",
  },
  {
    label: "CONTACT",
    href: "/contact",
  },
];

export default function MainMenu({
  variant = "home",
  defaultOpen = false,
  activeWindow = null,
  onNavigate,
  onHome,
}: MainMenuProps) {
  const pathname = usePathname();

  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isHomeVariant = variant === "home";

  const [isOpen, setIsOpen] = useState(
    isHomeVariant || defaultOpen
  );

  const [hoveredHomeItem, setHoveredHomeItem] =
    useState<HomeMenuKey | null>(null);

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    if (isHomeVariant) {
      return;
    }

    setIsOpen(false);
  }

  function handleHomeSelection() {
    onHome?.();
  }

  function handleWindowSelection(
    window: Exclude<WindowType, "music">
  ) {
    onNavigate?.(window);
  }

  useEffect(() => {
    if (isHomeVariant || !isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const triggerElement = triggerRef.current;

    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;

    const focusableElements =
      drawer?.querySelectorAll<HTMLElement>(
        [
          "a[href]",
          "button:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(",")
      );

    focusableElements?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (
        event.key !== "Tab" ||
        !focusableElements ||
        focusableElements.length === 0
      ) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      const focusTarget =
        triggerElement ??
        previouslyFocusedElement;

      focusTarget?.focus();
    };
  }, [isHomeVariant, isOpen]);

  const menuContent = (
    <>
      {!isHomeVariant && (
        <button
          type="button"
          className="menuClose"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}

      <header className="cpNavHeader">
        <div className="cpNavLogo">
          VINCENT LE
        </div>

        <div className="cpNavSubtitle">
          PORTFOLIO INTERFACE
        </div>
      </header>

      <nav
        className="cpNavList"
        aria-label="Primary navigation"
        onMouseLeave={() =>
          setHoveredHomeItem(null)
        }
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null
            )
          ) {
            setHoveredHomeItem(null);
          }
        }}
      >
        {isHomeVariant ? (
          <>
            <button
              type="button"
              className={[
                "cpNavItem",
                activeWindow === null
                  ? "cpNavItemActive"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={handleHomeSelection}
              onMouseEnter={() =>
                setHoveredHomeItem("home")
              }
              onFocus={() =>
                setHoveredHomeItem("home")
              }
            >
              <span className="cpNavLabel">
                HOME
              </span>

              <span className="cpNavMeta">
                00
              </span>
            </button>

            {homeNavItems.map(
              (item, index) => {
                const isActive =
                  activeWindow === item.window;

                return (
                  <button
                    key={item.window}
                    type="button"
                    className={[
                      "cpNavItem",
                      isActive
                        ? "cpNavItemActive"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      handleWindowSelection(
                        item.window
                      )
                    }
                    onMouseEnter={() =>
                      setHoveredHomeItem(
                        item.window
                      )
                    }
                    onFocus={() =>
                      setHoveredHomeItem(
                        item.window
                      )
                    }
                  >
                    <span className="cpNavLabel">
                      {item.label}
                    </span>

                    <span className="cpNavMeta">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>
                  </button>
                );
              }
            )}
          </>
        ) : (
          drawerNavItems.map(
            (item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/home" &&
                  pathname.startsWith(
                    `${item.href}/`
                  ));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "cpNavItem",
                    isActive
                      ? "cpNavItemActive"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                >
                  <span className="cpNavLabel">
                    {item.label}
                  </span>

                  <span className="cpNavMeta">
                    {String(index).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </Link>
              );
            }
          )
        )}
      </nav>

      <footer className="cpNavFooter">
        <span className="cpNavVersion">
          Welcome V // LAPUTA OS // BUILD
          01.00
        </span>

        <strong className="cpNavUser">
          VINCENT_LE
        </strong>

        <div className="cpNavAccount">
          <span
            className="cpNavAccountIcon"
            aria-hidden="true"
          >
            V
          </span>

          <span>ACCOUNT SELECT</span>
        </div>
      </footer>
    </>
  );

  if (isHomeVariant) {
    const preview = hoveredHomeItem
      ? homeMenuPreviews[hoveredHomeItem]
      : null;

    return (
      <div className="cpNavHomeShell">
        <aside
          className="cpNav cpNavHome"
          aria-label="Main menu"
        >
          {menuContent}
        </aside>
        <div className="cpMenuPreviewShell">
        <section
          className={
            preview
              ? "homeMenuPreview homeMenuPreview--visible"
              : "homeMenuPreview"
          }
          aria-label="Featured portfolio record"
        >
          {preview && (
            <>
              {preview.image ? (
                <div className="homeMenuPreview__image">
                  <Image
                    src={preview.image}
                    alt={preview.title}
                    fill
                    sizes="(max-width: 900px) 0px, 28vw"
                  />
                </div>
              ) : (
                <div
                  className="homeMenuPreview__image homeMenuPreview__image--placeholder"
                  aria-hidden="true"
                >
                  <span>{preview.title}</span>
                </div>
              )}

              <div className="homeMenuPreview__content">
                <span>
                  {preview.eyebrow}
                </span>

                <strong>
                  {preview.title}
                </strong>

                <small>
                  {preview.subtitle}
                </small>

                <div>
                  <span>
                    {preview.status}
                  </span>

                  <span>
                    {preview.period}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
        </div>

        <div
          className="homeMenuHud homeMenuHud--top"
          aria-hidden="true"
        >
          <span>
            PORTFOLIO BUILD 01.00
          </span>

          <strong>
            LAPUTA OS // ONLINE
          </strong>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menuTrigger"
        onClick={openMenu}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="main-navigation-drawer"
        hidden={isOpen}
      >
        <span className="menuTriggerCode">
          MENU
        </span>

        <span
          className="menuTriggerLines"
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={[
          "menuBackdrop",
          isOpen
            ? "menuBackdropVisible"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        id="main-navigation-drawer"
        className={[
          "cpNav",
          "cpNavDrawer",
          isOpen
            ? "cpNavDrawerOpen"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Main menu"
        aria-hidden={!isOpen}
      >
        {menuContent}
      </aside>
    </>
  );
}