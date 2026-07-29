import {
  readdir,
  readFile,
  stat,
} from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, "src");
const publicRoot = path.join(projectRoot, "public");
const sourceExtensions = new Set([
  ".css",
  ".ts",
  ".tsx",
]);
const localAssetPattern =
  /\/(?:assets\/[^"'`)\s]+?\.(?:avif|gif|jpe?g|png|svg|webp)|resume\.pdf)/gi;

async function collectFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);

      return entry.isDirectory()
        ? collectFiles(entryPath)
        : [entryPath];
    })
  );

  return nestedFiles.flat();
}

const sourceFiles = (await collectFiles(sourceRoot)).filter(
  (file) => sourceExtensions.has(path.extname(file))
);
const sourceContents = await Promise.all(
  sourceFiles.map((file) => readFile(file, "utf8"))
);
const referencedAssets = new Set(
  sourceContents.flatMap(
    (source) => source.match(localAssetPattern) ?? []
  )
);
const missingAssets = [];

for (const asset of referencedAssets) {
  try {
    const assetStat = await stat(
      path.join(publicRoot, asset.slice(1))
    );

    if (!assetStat.isFile() || assetStat.size === 0) {
      missingAssets.push(asset);
    }
  } catch {
    missingAssets.push(asset);
  }
}

const [
  { projects },
  { journalEntries },
  { galleryRecords },
  { experienceRecords },
] = await Promise.all([
  import(
    pathToFileURL(
      path.join(sourceRoot, "data/projects.ts")
    ).href
  ),
  import(
    pathToFileURL(
      path.join(sourceRoot, "data/journal.ts")
    ).href
  ),
  import(
    pathToFileURL(
      path.join(sourceRoot, "data/gallery.ts")
    ).href
  ),
  import(
    pathToFileURL(
      path.join(sourceRoot, "data/experience.ts")
    ).href
  ),
]);

const projectIds = new Set(
  projects.map((project) => project.id)
);
const journalIds = new Set(
  journalEntries.map((entry) => entry.id)
);
const galleryIds = new Set(
  galleryRecords.map((record) => record.id)
);
const relationshipIssues = [];

for (const entry of journalEntries) {
  for (const galleryId of entry.relatedGalleryIds ?? []) {
    if (!galleryIds.has(galleryId)) {
      relationshipIssues.push(
        `journal:${entry.id} -> gallery:${galleryId}`
      );
    }
  }
}

for (const record of galleryRecords) {
  if (
    record.relatedProjectId &&
    !projectIds.has(record.relatedProjectId)
  ) {
    relationshipIssues.push(
      `gallery:${record.id} -> project:${record.relatedProjectId}`
    );
  }

  for (const journalId of record.relatedJournalIds ?? []) {
    if (!journalIds.has(journalId)) {
      relationshipIssues.push(
        `gallery:${record.id} -> journal:${journalId}`
      );
    }
  }
}

const externalLinks = [
  ...projects.flatMap((project) =>
    (project.links ?? []).map((link) => link.href)
  ),
  ...experienceRecords.flatMap((record) =>
    record.link ? [record.link.href] : []
  ),
];
const invalidExternalLinks = externalLinks.filter((href) => {
  try {
    const url = new URL(href);
    return url.protocol !== "https:";
  } catch {
    return true;
  }
});
const unpublishedJournalEntries = journalEntries.filter(
  (entry) => entry.status !== "PUBLISHED" || entry.body.length === 0
);
const projectsWithoutPrimaryAssets = projects.filter(
  (project) => !project.image
);
const failures = [
  ...missingAssets.map(
    (asset) => `Missing or empty asset: ${asset}`
  ),
  ...relationshipIssues.map(
    (issue) => `Broken archive relationship: ${issue}`
  ),
  ...invalidExternalLinks.map(
    (href) => `Invalid external link: ${href}`
  ),
  ...unpublishedJournalEntries.map(
    (entry) =>
      `Unfinished journal entry is included in production data: ${entry.id}`
  ),
  ...projectsWithoutPrimaryAssets.map(
    (project) =>
      `Project has no primary asset and would render a placeholder: ${project.id}`
  ),
];

console.log(
  `Referenced local assets: ${referencedAssets.size}`
);
console.log(
  `Archive relationships: ${relationshipIssues.length === 0 ? "valid" : relationshipIssues.length}`
);
console.log(
  `Typed external links: ${externalLinks.length}`
);
console.log(
  `Production content records: ${projects.length} projects, ${journalEntries.length} journal entries, ${galleryRecords.length} gallery records`
);

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}

console.log("Content integrity checks passed.");
