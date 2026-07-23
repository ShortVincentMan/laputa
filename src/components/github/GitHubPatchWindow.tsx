"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { GitHubCommit } from "@/lib/github";
import ActionKey from "@/components/shared/ActionKey";

import "./github-patch-window.css";

type GitHubPatchWindowProps = {
  onClose: () => void;
};

type GitHubResponse = {
  repository: string;
  branch: string;
  commits: GitHubCommit[];
};

export default function GitHubPatchWindow({
  onClose,
}: GitHubPatchWindowProps) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const [commits, setCommits] = useState<GitHubCommit[]>(
    []
  );
  const [repository, setRepository] = useState("LAPUTA OS");
  const [branch, setBranch] = useState("main");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadCommits() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/github", {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ?? "Unable to load changes."
          );
        }

        const result = data as GitHubResponse;

        setCommits(result.commits);
        setRepository(result.repository);
        setBranch(result.branch);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load changes."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadCommits();
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      controller.abort();

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  function openCommit(url: string) {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section
      className="githubPatchOverlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="github-patch-title"
    >
      <button
        type="button"
        className="githubPatchOverlay__dismiss"
        onClick={onClose}
        aria-label="Close repository changes"
      />

      <div className="githubPatchWindow">
        <aside className="githubPatchWindow__art">
          <div className="githubPatchWindow__artImage" />
        </aside>

        <div className="githubPatchWindow__content">
          <header className="githubPatchWindow__header">
            <div>
              <span className="githubPatchWindow__eyebrow">
                {repository}
              </span>

              <h2 id="github-patch-title">
                CHANGES IN BUILD 01.00
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className="githubPatchWindow__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </header>

          <div className="githubPatchWindow__scroll">
            {isLoading && (
              <div className="githubPatchWindow__status">
                ACCESSING REPOSITORY...
              </div>
            )}

            {error && (
              <div className="githubPatchWindow__status githubPatchWindow__status--error">
                {error}
              </div>
            )}

            {!isLoading &&
              !error &&
              commits.length === 0 && (
                <div className="githubPatchWindow__status">
                  NO CHANGES FOUND.
                </div>
              )}

            {!isLoading &&
              !error &&
              commits.map((commit, index) => (
                <article
                  key={commit.sha}
                  className="githubPatchCard"
                >
                  <div className="githubPatchCard__visual">
                    <div className="githubPatchCard__index">
                      {(index + 1)
                        .toString()
                        .padStart(2, "0")}
                    </div>

                    <div className="githubPatchCard__visualLines">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <span className="githubPatchCard__sha">
                      {commit.shortSha}
                    </span>
                  </div>

                  <div className="githubPatchCard__body">
                    <div className="githubPatchCard__meta">
                      <span>{commit.author}</span>

                      <time dateTime={commit.date}>
                        {new Intl.DateTimeFormat(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        ).format(
                          new Date(commit.date)
                        )}
                      </time>
                    </div>

                    <h3>{commit.title}</h3>

                    <p>{commit.description}</p>

                    <button
                      type="button"
                      className="githubPatchCard__open"
                      onClick={() =>
                        openCommit(commit.url)
                      }
                    >
                      OPEN COMMIT
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </article>
              ))}
          </div>

          <footer className="githubPatchWindow__footer">
            <ActionKey
              keyLabel="ESC"
              label="Close"
              onClick={onClose}
              ariaLabel="Close repository changes"
            />

            <div className="githubPatchWindow__branch">
              <span>BRANCH</span>
              <strong>{branch}</strong>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}