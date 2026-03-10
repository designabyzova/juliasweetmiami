"use client";

import { useEffect, useRef, useCallback } from "react";

// Phone number stored as char codes — never appears as plain text in HTML or JS bundle
// Display: +1(305)481-5910
const _d = [43, 49, 40, 51, 48, 53, 41, 52, 56, 49, 45, 53, 57, 49, 48];
// Tel URI: 13054815910
const _t = [49, 51, 48, 53, 52, 56, 49, 53, 57, 49, 48];

export function usePhone() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String.fromCharCode(..._d);
    }
  }, []);

  const call = useCallback(() => {
    window.location.href = "tel:+" + String.fromCharCode(..._t);
  }, []);

  return { ref, call };
}
