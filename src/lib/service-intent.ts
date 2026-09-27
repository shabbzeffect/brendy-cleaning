export const SERVICE_INTENT_EVENT = "brendy:service-intent";

/**
 * Progressive-enhancement handoff between a server-rendered service card and the
 * client booking form. The anchor still navigates to #book without JS; the event
 * only lets the form pre-select the service so intent is never lost.
 */
export const dispatchServiceIntent = (slug: string): void => {
  window.dispatchEvent(new CustomEvent<string>(SERVICE_INTENT_EVENT, { detail: slug }));
};
