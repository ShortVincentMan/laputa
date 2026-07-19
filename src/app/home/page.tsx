import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import HomeMenu from "@/components/Menu";

import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main className={styles.homePage}>
      <CyberpunkBackground muted />

      <HomeMenu />

      <section className={styles.homeContent}>
        {/* Page-specific content */}
      </section>
    </main>
  );
}