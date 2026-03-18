export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function event(action: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

// ─── CTA clicks ───
export function trackOrderClick(location: string) {
  event("cta_click", { event_category: "engagement", event_label: `order_${location}` });
}

export function trackFlavorsClick() {
  event("cta_click", { event_category: "engagement", event_label: "see_fillings" });
}

// ─── Order form funnel ───
export function trackFormStep(step: number) {
  event("form_step", { event_category: "order_form", step });
}

export function trackFormSubmit(filling: string, weight: string) {
  event("generate_lead", {
    event_category: "order_form",
    event_label: `${filling} ${weight}`,
    value: 1,
  });
}

// ─── Contact / social clicks ───
export function trackContact(platform: string, location: string) {
  event("contact_click", {
    event_category: "contact",
    event_label: platform,
    location,
  });
}

// ─── Email subscription ───
export function trackEmailSubscribe() {
  event("email_subscribe", { event_category: "engagement", value: 1 });
}
