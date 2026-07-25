import { galleryRecords } from "@/data/gallery";
import { journalEntries } from "@/data/journal";
import { projects } from "@/data/projects";

export type ArchiveRelationshipIssue = {
  source: string;
  target: string;
};

export function validateArchiveRelationships(): ArchiveRelationshipIssue[] {
  const projectIds = new Set(projects.map((project) => project.id));
  const journalIds = new Set(journalEntries.map((entry) => entry.id));
  const galleryIds = new Set(galleryRecords.map((record) => record.id));
  const issues: ArchiveRelationshipIssue[] = [];

  for (const entry of journalEntries) {
    for (const galleryId of entry.relatedGalleryIds ?? []) {
      if (!galleryIds.has(galleryId)) {
        issues.push({
          source: `journal:${entry.id}`,
          target: `gallery:${galleryId}`,
        });
      }
    }
  }

  for (const record of galleryRecords) {
    if (
      record.relatedProjectId &&
      !projectIds.has(record.relatedProjectId)
    ) {
      issues.push({
        source: `gallery:${record.id}`,
        target: `project:${record.relatedProjectId}`,
      });
    }

    for (const journalId of record.relatedJournalIds ?? []) {
      if (!journalIds.has(journalId)) {
        issues.push({
          source: `gallery:${record.id}`,
          target: `journal:${journalId}`,
        });
      }
    }
  }

  return issues;
}

if (process.env.NODE_ENV === "development") {
  for (const issue of validateArchiveRelationships()) {
    console.warn(
      `[Laputa archive] Missing relationship target: ${issue.source} -> ${issue.target}`
    );
  }
}
