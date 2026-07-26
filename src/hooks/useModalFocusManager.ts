"use client";

import { useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CLOSE_CONTROL_SELECTOR = [
  "[data-modal-close='true']",
  'button[aria-label^="Close"]',
  'button[aria-label^="Exit"]',
].join(",");

function isVisible(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const bounds = element.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    bounds.width > 0 &&
    bounds.height > 0
  );
}

function getTopDialog() {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[role="dialog"][aria-modal="true"]'
    )
  ).filter(isVisible);

  return dialogs.at(-1) ?? null;
}

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter(isVisible);
}

function closeTopDialog(dialog: HTMLElement) {
  const explicitCloseControl = Array.from(
    dialog.querySelectorAll<HTMLElement>(CLOSE_CONTROL_SELECTOR)
  ).find(isVisible);

  if (explicitCloseControl) {
    explicitCloseControl.click();
    return true;
  }

  const textCloseControl = Array.from(
    dialog.querySelectorAll<HTMLButtonElement>("button:not([disabled])")
  ).find((button) => {
    if (!isVisible(button)) {
      return false;
    }

    const text = button.textContent?.replace(/\s+/g, " ").trim().toUpperCase();

    return Boolean(
      text &&
        (text.includes("ESC CLOSE") ||
          text === "CLOSE" ||
          text === "BACK" ||
          text === "EXIT")
    );
  });

  if (textCloseControl) {
    textCloseControl.click();
    return true;
  }

  const backdrop = dialog.querySelector<HTMLElement>(
    '[data-backdrop="true"]'
  );

  if (backdrop) {
    backdrop.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    return true;
  }

  return false;
}

export default function useModalFocusManager(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    let focusedDialog: HTMLElement | null = null;
    let frame: number | null = null;

    function focusDialog() {
      const dialog = getTopDialog();

      if (!dialog || dialog === focusedDialog) {
        return;
      }

      focusedDialog = dialog;
      const focusableElements = getFocusableElements(dialog);

      if (!dialog.contains(document.activeElement)) {
        if (focusableElements.length > 0) {
          focusableElements[0].focus({ preventScroll: true });
        } else {
          dialog.tabIndex = -1;
          dialog.focus({ preventScroll: true });
        }
      }
    }

    function scheduleFocus() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(() => {
        frame = null;
        focusDialog();
      });
    }

    function handleKeyDownCapture(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      const dialog = getTopDialog();

      if (!dialog) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      closeTopDialog(dialog);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

      const dialog = getTopDialog();

      if (!dialog) {
        return;
      }

      const focusableElements = getFocusableElements(dialog);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus({ preventScroll: true });
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    }

    const observer = new MutationObserver(scheduleFocus);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("keydown", handleKeyDownCapture, true);
    window.addEventListener("keydown", handleKeyDown);
    scheduleFocus();

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDownCapture, true);
      window.removeEventListener("keydown", handleKeyDown);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [active]);
}
