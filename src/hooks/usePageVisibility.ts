"use client";

import { useEffect } from "react";

const HIDDEN_PAGE_CLASS = "laputa-page-hidden";
const MOBILE_ZOOM_CLASS = "laputa-mobile-zooming";

export default function usePageVisibility() {
  useEffect(() => {
    const root = document.documentElement;
    const visualViewport = window.visualViewport;

    function syncVisibility() {
      root.classList.toggle(HIDDEN_PAGE_CLASS, document.hidden);
    }

    function syncZoom() {
      root.classList.toggle(
        MOBILE_ZOOM_CLASS,
        Boolean(
          visualViewport &&
            window.matchMedia("(pointer: coarse)").matches &&
            visualViewport.scale > 1.01
        )
      );
    }

    syncVisibility();
    syncZoom();
    document.addEventListener("visibilitychange", syncVisibility);
    visualViewport?.addEventListener("resize", syncZoom);
    visualViewport?.addEventListener("scroll", syncZoom);

    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
      visualViewport?.removeEventListener("resize", syncZoom);
      visualViewport?.removeEventListener("scroll", syncZoom);
      root.classList.remove(HIDDEN_PAGE_CLASS);
      root.classList.remove(MOBILE_ZOOM_CLASS);
    };
  }, []);
}
