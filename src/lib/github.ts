export type GitHubCommit = {
  sha: string;
  shortSha: string;
  title: string;
  description: string;
  author: string;
  avatarUrl: string | null;
  date: string;
  url: string;
};

type GitHubApiCommit = {
  sha: string;
  html_url: string;
  author: {
    avatar_url: string | null;
  } | null;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    } | null;
  };
};

function splitCommitMessage(message: string) {
  const [title = "Untitled update", ...bodyLines] =
    message.trim().split("\n");

  return {
    title,
    description:
      bodyLines
        .join("\n")
        .trim()
        .replace(/\n{3,}/g, "\n\n") ||
      "Repository files and project systems were updated.",
  };
}

export function normalizeGitHubCommit(
  commit: GitHubApiCommit
): GitHubCommit {
  const message = splitCommitMessage(commit.commit.message);

  return {
    sha: commit.sha,
    shortSha: commit.sha.slice(0, 7),
    title: message.title,
    description: message.description,
    author: commit.commit.author?.name ?? "Unknown developer",
    avatarUrl: commit.author?.avatar_url ?? null,
    date: commit.commit.author?.date ?? new Date().toISOString(),
    url: commit.html_url,
  };
}