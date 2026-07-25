"use client";

import { useEffect, useRef } from "react";

const DEFAULT_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
] as const;

type UseKonamiCodeOptions = {
  onSuccess: () => void;
  enabled?: boolean;
  sequence?: readonly string[];
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"]'
    )
  );
}

export default function useKonamiCode({
  onSuccess,
  enabled = true,
  sequence = DEFAULT_SEQUENCE,
}: UseKonamiCodeOptions) {
  const progressRef = useRef(0);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!enabled) {
      progressRef.current = 0;
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (
        isEditableTarget(event.target) ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      ) {
        return;
      }

      const normalizedKey = event.key.toLowerCase();
      const expectedKey = sequence[progressRef.current]?.toLowerCase();

      if (normalizedKey === expectedKey) {
        progressRef.current += 1;

        if (progressRef.current === sequence.length) {
          progressRef.current = 0;
          onSuccessRef.current();
        }

        return;
      }

      progressRef.current =
        normalizedKey === sequence[0]?.toLowerCase() ? 1 : 0;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      progressRef.current = 0;
    };
  }, [enabled, sequence]);
}
