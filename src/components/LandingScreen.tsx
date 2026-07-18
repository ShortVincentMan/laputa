import "./landing.css";
import ScrollingText from "./ScrollingText";

export default function Landing() {
  return (
    <main className="landing">
      <div className="scene">
        <div className="uiStack">
            <img
                className="staticUi"
                src="/assets/landing/static-ui.png"
                alt=""
                draggable={false}
            />

            <img
                className="assetLayer topRedShape"
                src="/assets/landing/top-red-shape.png"
                alt=""
            />

            <img
                className="assetLayer topRight"
                src="/assets/landing/top-right.png"
                alt=""
            />

            <img
                className="assetLayer scrollingLines"
                src="/assets/landing/scrolling-lines.png"
                alt=""
            />

            <img
                className="assetLayer pulseRedBar"
                src="/assets/landing/pulse-red-bar.png"
                alt=""
            />

            <img
                className="assetLayer blueBar"
                src="/assets/landing/blue-bar.png"
                alt=""
            />

            <img
                className="assetLayer bottomGrid"
                src="/assets/landing/bottom-grid.png"
                alt=""
            />

            <img
                className="assetLayer bottomLeftOne"
                src="/assets/landing/bottom-left.png"
                alt=""
            />

            <img
                className="assetLayer bottomLeftTwo"
                src="/assets/landing/bottom-left-rectangles.png"
                alt=""
            />

            <ScrollingText />
</div>
      </div>
    </main>
  );
}