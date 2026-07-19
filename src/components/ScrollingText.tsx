import "./ScrollingText.css";

const longBlocks = [
  "BLACK ICE PROTOCOL ACTIVE · SYSTEM STATUS ONLINE",
  "MEMORY BLOCK VERIFIED · AUTH TOKEN ACCEPTED",
  "NETWATCH CHANNEL ACTIVE · DATA STREAM NOMINAL",
  "NEURAL LINK STABLE · BUFFER SYNC COMPLETE",
  "ENCRYPTION ENABLED · KERNEL CHECK PASSED",
  "REMOTE HOST VERIFIED · SIGNAL LOCKED",
  "VIRTUAL GRID ENABLED · SECTOR MAP LOADED",
  "BIO-SIGNAL DETECTED · FIREWALL LAYER ACTIVE",
  "TRACE ROUTE ACTIVE · UPLINK ESTABLISHED",
];

const shortBlocks = [
  "SYS ONLINE",
  "ICE ACTIVE",
  "NODE READY",
  "SYNC LOCK",
  "LINK OPEN",
  "AUTH PASS",
  "GRID LIVE",
  "CORE OK",
  "PORT OPEN",
];

const ROW_COUNT = 18;

const rows = Array.from({ length: ROW_COUNT }, (_, rowIndex) => [
  longBlocks[rowIndex % longBlocks.length],
  shortBlocks[rowIndex % shortBlocks.length],

  longBlocks[(rowIndex + 2) % longBlocks.length],
  shortBlocks[(rowIndex + 2) % shortBlocks.length],

  longBlocks[(rowIndex + 4) % longBlocks.length],
  shortBlocks[(rowIndex + 4) % shortBlocks.length],

  longBlocks[(rowIndex + 6) % longBlocks.length],
  shortBlocks[(rowIndex + 6) % shortBlocks.length],
]);
function ScrollGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className="scrollGroup"
      aria-hidden={duplicate ? true : undefined}
    >
      {rows.map((row, rowIndex) => (
        <div
          className="scrollRow"
          key={`${duplicate ? "copy" : "original"}-${rowIndex}`}
        >
          {row.map((text, blockIndex) => (
            <span
              className={
                blockIndex % 2 === 0
                  ? "scrollBlock scrollBlockLong"
                  : "scrollBlock scrollBlockShort"
              }
              key={blockIndex}
            >
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ScrollingText() {
  return (
    <div className="scrollWindow">
      <div className="verticalTrack">
        <ScrollGroup />
        <ScrollGroup duplicate />
        <ScrollGroup duplicate />
      </div>
    </div>
  );
}