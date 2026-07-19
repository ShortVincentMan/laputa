import CyberpunkBackground from "@/components/background/CyberpunkBackground";
import MainMenu from "@/components/navigation/MainMenu";

import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main className={styles.homePage}>
      <CyberpunkBackground muted />

      <MainMenu variant="home" />

      <section className={styles.homeContent}>
        {/* Page-specific content */}
      </section>
    </main>
  );
}