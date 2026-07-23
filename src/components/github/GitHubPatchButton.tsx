"use client";

import {
  useEffect,
  useState,
} from "react";

import type { GitHubCommit } from "@/lib/github";

import "./github-patch-button.css";

type GitHubPatchButtonProps = {
  onOpen: () => void;
};

type GitHubResponse = {
  repository: string;
  branch: string;
  commits: GitHubCommit[];
};

export default function GitHubPatchButton({
  onOpen,
}: GitHubPatchButtonProps) {
  const [latestCommit, setLatestCommit] =
    useState<GitHubCommit | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadLatestCommit() {
      try {
        const response = await fetch("/api/github", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data =
          (await response.json()) as GitHubResponse;

        setLatestCommit(data.commits[0] ?? null);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Failed to load latest commit:", error);
      }
    }

    void loadLatestCommit();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <button
      type="button"
      className="githubPatchButton"
      onClick={onOpen}
      aria-label="Open latest repository changes"
    >
      <span className="githubPatchButton__key">P</span>

      <span className="githubPatchButton__version">
        {latestCommit?.shortSha ?? "--"}
      </span>

      <span
        className="githubPatchButton__separator"
        aria-hidden="true"
      />

      <span className="githubPatchButton__label">
        LATEST CHANGES
      </span>

      <span
        className="githubPatchButton__decoration"
        aria-hidden="true"
      >
        ▦
      </span>
    </button>
  );
}