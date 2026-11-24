const ACTIVATABLE =
  'button, a[href], summary, [role="button"], [role="menuitem"], [role="tab"]';

/**
 * Windows listen for Enter on `window` to open the selected record. When the
 * keyboard focus is on some other control (top nav, close button, a link),
 * Enter should activate that control instead, like it does everywhere else.
 */
export function isNativeActivationTarget(
  target: EventTarget | null,
  listSelector: string
): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (!target.matches(ACTIVATABLE)) return false;
  return !target.closest(listSelector);
}

/**
 * Move DOM focus to the newly selected item after arrow-key navigation, so the
 * focus ring and the selection never point at different things.
 */
export function focusSelectedAfterRender(selector: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(selector)?.focus();
    });
  });
}
