const codeRows = [
  [
    "FUNCTION GETQUOTE() {",
    "BACKGROUND: #0B1118;",
    "COLOR: #FF1838;",
  ],
  [
    "const RANDOM = Math.random();",
    "FONT-WEIGHT: 400;",
    "SYSTEM STATUS: ONLINE",
  ],
  [
    "BLACK ICE PROTOCOL ACTIVE",
    "TEXT-ALIGN: RIGHT;",
    "PADDING: 5% 10%;",
  ],
  [
    "BODY {",
    "OVERFLOW: HIDDEN;",
    "DISPLAY: GRID;",
  ],
];

export default function ScrollingText() {
  const repeatedRows = [...codeRows, ...codeRows];

  return (
    <div className="scrollWindow">
      <div className="scrollTrack">
        {repeatedRows.map((row, rowIndex) => (
          <div className="scrollRow" key={rowIndex}>
            {row.map((text, columnIndex) => (
              <span className="scrollCell" key={columnIndex}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}