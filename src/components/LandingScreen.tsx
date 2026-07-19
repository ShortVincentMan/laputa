import Image from "next/image";
import "./landing.css";
import ScrollingText from "./ScrollingText";

const ASSET_ROOT = "/assets/landing";

type LayerProps = {
  src: string;
  className: string;
};

function UiLayer({ src, className }: LayerProps) {
  return (
    <div className={`assetLayer ${className}`}>
      <Image
        src={`${ASSET_ROOT}/${src}`}
        alt=""
        fill
        sizes="100vw"
        draggable={false}
      />
    </div>
  );
}

export default function LandingScreen() {
  return (
    <main className="landing">
      <Image
        className="background"
        src={`${ASSET_ROOT}/bg.png`}
        alt=""
        fill
        priority
        sizes="100vw"
        draggable={false}
      />

      <div className="scene">
        <div className="scene perspectiveEnabled"> {/**/}
        <div className="uiStack">
          <Image
            className="staticUi"
            src={`${ASSET_ROOT}/screen4.png`}
            alt=""
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
            <ScrollingText />
          <UiLayer
            src="top-red-shape.png"
            className="topRedShape"
          />

          <UiLayer
            src="top-right.png"
            className="topRight"
          />

          <UiLayer
            src="scrolling-lines.png"
            className="scrollingLines"
          />

          <UiLayer
            src="pulse-red-bar.png"
            className="pulseRedBar"
          />

          <UiLayer
            src="blue-bar.png"
            className="blueBar"
          />

          <UiLayer
            src="bottom-grid.png"
            className="bottomGrid"
          />

          <UiLayer
            src="bottom-left.png"
            className="bottomLeftOne"
          />

          <UiLayer
            src="bottom-left-rectangle.png"
            className="bottomLeftTwo"
          />
        </div>
        </div>
      </div>
    </main>
  );
}