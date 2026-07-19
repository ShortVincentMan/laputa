"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import "./menu.css";

const navItems = [
  { label: "HOME", href: "/home" },
  { label: "PROJECTS", href: "/projects" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function HomeMenu() {
  const pathname = usePathname();

  return (
    <aside className="cpNav">
      <div className="cpNavHeader">
        <div className="cpNavLogo">VINCENT LE</div>
        <div className="cpNavSubtitle">PORTFOLIO INTERFACE</div>
      </div>

      <nav className="cpNavList" aria-label="Primary navigation">
        {navItems.map((item, index) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/home" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`cpNavItem ${isActive ? "cpNavItemActive" : ""}`}
            >
              <span className="cpNavLabel">{item.label}</span>

              <span className="cpNavMeta">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="cpNavFooter">
        <span className="cpNavVersion">1.0</span>
        <span className="cpNavUser">VINCENT_LE</span>

        <div className="cpNavAccount">
          <span className="cpNavAccountIcon">V</span>
          <span>ACCOUNT SELECT</span>
        </div>
      </div>
    </aside>
  );
}