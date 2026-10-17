/**
 * True when the event target is (or sits inside) an interactive control, so a
 * page-wide "tap to continue" handler can ignore taps meant for its controls.
 */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest(
      'button, a, input, textarea, select, [contenteditable="true"], [data-no-advance]',
    ),
  )
}
