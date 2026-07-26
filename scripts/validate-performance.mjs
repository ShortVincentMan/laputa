import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const nextRoot = path.join(projectRoot, ".next");
const homeManifestRoot = path.join(
  nextRoot,
  "server/app/home/page"
);

const MAX_INITIAL_JS_BYTES = 600 * 1024;
const MAX_PATCH_ART_BYTES = 200 * 1024;
const MIN_LAZY_CHUNKS = 10;
const REMOVED_ROOT_PACKAGES = [
  "@tailwindcss/postcss",
  "clsx",
  "framer-motion",
  "lucide-react",
  "motion",
  "tailwindcss",
];

function formatKiB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

async function totalBytes(files) {
  const sizes = await Promise.all(
    files.map(async (file) => {
      const result = await stat(path.join(nextRoot, file));
      return result.size;
    })
  );

  return sizes.reduce((total, size) => total + size, 0);
}

const [packageSource, buildManifestSource, clientManifestSource, lazySource] =
  await Promise.all([
    readFile(path.join(projectRoot, "package.json"), "utf8"),
    readFile(
      path.join(homeManifestRoot, "build-manifest.json"),
      "utf8"
    ),
    readFile(
      path.join(
        nextRoot,
        "server/app/home/page_client-reference-manifest.js"
      ),
      "utf8"
    ),
    readFile(
      path.join(homeManifestRoot, "react-loadable-manifest.json"),
      "utf8"
    ),
  ]);

const packageJson = JSON.parse(packageSource);
const buildManifest = JSON.parse(buildManifestSource);
const lazyManifest = JSON.parse(lazySource);
const dependencyNames = new Set([
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
]);
const unexpectedPackages = REMOVED_ROOT_PACKAGES.filter((packageName) =>
  dependencyNames.has(packageName)
);

const entryMatch = clientManifestSource.match(
  /"entryJSFiles":\{[\s\S]*?"\[project\]\/src\/app\/home\/page":(\[[^\]]*\])/
);

if (!entryMatch) {
  throw new Error("Unable to locate the /home entry chunks.");
}

const routeFiles = JSON.parse(entryMatch[1]);
const initialJsFiles = [
  ...new Set([
    ...buildManifest.rootMainFiles,
    ...routeFiles,
  ]),
].filter((file) => file.endsWith(".js"));
const initialJsBytes = await totalBytes(initialJsFiles);
const lazyChunkCount = Object.keys(lazyManifest).length;
const patchArtPath = path.join(
  projectRoot,
  "public/assets/pets/performative-jit-programming.webp"
);
const sourceArtPath = path.join(
  projectRoot,
  "public/assets/pets/performative-jit-programming.jpeg"
);
const [patchArt, sourceArt] = await Promise.all([
  stat(patchArtPath),
  stat(sourceArtPath),
]);
const artReduction = 1 - patchArt.size / sourceArt.size;

const failures = [];

if (initialJsBytes > MAX_INITIAL_JS_BYTES) {
  failures.push(
    `Initial /home JavaScript is ${formatKiB(initialJsBytes)}; budget is ${formatKiB(MAX_INITIAL_JS_BYTES)}.`
  );
}

if (lazyChunkCount < MIN_LAZY_CHUNKS) {
  failures.push(
    `Only ${lazyChunkCount} lazy chunks were emitted; expected at least ${MIN_LAZY_CHUNKS}.`
  );
}

if (patchArt.size > MAX_PATCH_ART_BYTES) {
  failures.push(
    `Patch artwork is ${formatKiB(patchArt.size)}; budget is ${formatKiB(MAX_PATCH_ART_BYTES)}.`
  );
}

if (unexpectedPackages.length > 0) {
  failures.push(
    `Unused root packages returned: ${unexpectedPackages.join(", ")}.`
  );
}

console.log(`Initial /home JS: ${formatKiB(initialJsBytes)}`);
console.log(`On-demand interface chunks: ${lazyChunkCount}`);
console.log(
  `Patch artwork: ${formatKiB(patchArt.size)} (${(artReduction * 100).toFixed(1)}% smaller)`
);
console.log("Unused root packages: none");

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}

console.log("Performance budgets passed.");
