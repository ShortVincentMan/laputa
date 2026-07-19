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

const ROW_COUNT = 10;

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

function ScrollGroup() {
  return (
    <div className="scrollGroup">
      {rows.map((row, rowIndex) => (
        <div className="scrollRow" key={rowIndex}>
          {row.map((text, blockIndex) => (
            <span
              className={`scrollBlock ${
                blockIndex % 2 === 0 ? "scrollBlockLong" : "scrollBlockShort"
              }`}
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
    <div className="scrollWindow" aria-hidden="true">
      <div className="verticalTrack">
        <ScrollGroup />
        <ScrollGroup />
      </div>
    </div>
  );
}
