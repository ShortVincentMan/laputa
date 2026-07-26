import Link from "next/link";

import "./system-page.css";

export default function NotFoundPage() {
  return (
    <main className="systemPage">
      <div className="systemPage__scanlines" aria-hidden="true" />

      <section
        className="systemPage__panel"
        aria-labelledby="not-found-title"
      >
        <span className="systemPage__code">404 // ARCHIVE INDEX FAILURE</span>
        <h1 id="not-found-title">RECORD NOT FOUND</h1>
        <p>
          The requested shard is missing, corrupted, or outside your current
          access level.
        </p>

        <div className="systemPage__actions">
          <Link href="/home">RETURN TO LAPUTA OS</Link>
          <Link href="/projects">OPEN PROJECT ARCHIVE</Link>
        </div>
      </section>
    </main>
  );
}
