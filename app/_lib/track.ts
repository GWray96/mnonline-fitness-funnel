type EventName = "newsletter_subscribe" | "newsletter_submit_attempt";

type Gtag = (
  command: string,
  eventName: string,
  params?: Record<string, unknown>,
) => void;

type Fbq = (command: string, eventName: string) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

/**
 * Fires a conversion event into GA4 and Meta Pixel when available.
 * No-op when analytics IDs are not configured, so it is always safe to call.
 */
export function track(event: EventName): void {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event });
  window.gtag?.("event", event);

  if (event === "newsletter_subscribe") {
    window.fbq?.("track", "Lead");
  }
}
