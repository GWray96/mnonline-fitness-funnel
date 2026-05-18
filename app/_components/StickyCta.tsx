"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky bar that appears after the hero scrolls out of view,
 * keeping the conversion action one tap away. Smooth-scrolls to the hero form.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 p-4 backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#hero"
        className="block w-full rounded-xl bg-brand px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-brand/25"
      >
        Get the Weekly Email — Free
      </a>
    </div>
  );
}
