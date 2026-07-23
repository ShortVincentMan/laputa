import { NextResponse } from "next/server";

import {
  normalizeGitHubCommit,
  type GitHubCommit,
} from "@/lib/github";

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const branch = process.env.GITHUB_BRANCH ?? "main";
const token = process.env.GITHUB_TOKEN;

export async function GET() {
  if (!owner || !repo) {
    return NextResponse.json(
      {
        error:
          "Missing GITHUB_OWNER or GITHUB_REPO environment variables.",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}&per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();

      console.error("GitHub API error:", response.status, message);

      return NextResponse.json(
        {
          error: "Unable to load repository changes.",
        },
        {
          status: response.status,
        }
      );
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      return NextResponse.json(
        {
          error: "GitHub returned an unexpected response.",
        },
        {
          status: 502,
        }
      );
    }

    const commits: GitHubCommit[] = result.map(
      normalizeGitHubCommit
    );

    return NextResponse.json({
      repository: `${owner}/${repo}`,
      branch,
      commits,
    });
  } catch (error) {
    console.error("GitHub request failed:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to GitHub.",
      },
      {
        status: 500,
      }
    );
  }
}