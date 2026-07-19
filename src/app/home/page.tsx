import HomeMenu from "@/components/Menu";

import "./home.module.css";

export default function HomePage() {
  return (
    <main className="homePage">
      <div className="homeBackdrop">
        {/* Reused muted landing composition */}
      </div>

      <HomeMenu />

      <section className="homeContent">
        {/* Page-specific content goes here */}
      </section>
    </main>
  );
}