"use client";

import { useEffect } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "flavors",
  "portfolio",
  "reviews",
  "faq",
  "order",
  "contact",
];

export default function SectionHashTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const newHash = id === "hero" ? "" : `#${id}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", newHash || window.location.pathname);
            }
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, []);

  return null;
}
