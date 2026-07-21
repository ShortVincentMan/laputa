import "./asset-placeholder.css";
type AssetPlaceholderProps = {
  label?: string;
  className?: string;
};

export default function AssetPlaceholder({
  label = "PLACEHOLDER",
  className = "",
}: AssetPlaceholderProps) {
  return (
    <div
      className={`assetPlaceholder ${className}`}
      aria-label={label}
    >
      <span className="assetPlaceholder__corner assetPlaceholder__corner--tl" />
      <span className="assetPlaceholder__corner assetPlaceholder__corner--tr" />
      <span className="assetPlaceholder__corner assetPlaceholder__corner--bl" />
      <span className="assetPlaceholder__corner assetPlaceholder__corner--br" />

      <div className="assetPlaceholder__grid" />

      <div className="assetPlaceholder__content">
        <span>ASSET SLOT</span>
        <strong>{label}</strong>
        <small>REPLACE WITH EXTRACTED OR RECREATED UI ASSET</small>
      </div>
    </div>
  );
}