"use client";

import { useEffect } from "react";
import Link from "next/link";

import "./system-page.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="systemPage">
      <div className="systemPage__scanlines" aria-hidden="true" />

      <section
        className="systemPage__panel"
        role="alert"
        aria-labelledby="system-error-title"
      >
        <span className="systemPage__code">ERR // RUNTIME FAILURE</span>
        <h1 id="system-error-title">SYSTEM INTERRUPTED</h1>
        <p>
          Laputa OS encountered an unexpected interface fault. Your archive
          data remains intact.
        </p>

        {error.digest && (
          <small>TRACE ID // {error.digest}</small>
        )}

        <div className="systemPage__actions">
          <button type="button" onClick={reset}>
            RETRY INTERFACE
          </button>
          <Link href="/home">RETURN HOME</Link>
        </div>
      </section>
    </main>
  );
}
