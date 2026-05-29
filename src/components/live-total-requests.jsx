"use client";

import { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { usePlatformStats } from "@/hooks/use-platform-stats";

const LS_KEY = "csc_total_requests";

function readCache() {
  try {
    const s = localStorage.getItem(LS_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function writeCache(val) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(val)); } catch {}
}

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// Inline animated ticker for total API requests.
// On first load starts from the localStorage-cached value (or fallback),
// so the counter never resets to 0 on page refresh.
export default function LiveTotalRequests({ className = "" }) {
  const { totalRequests, loading } = usePlatformStats();
  const [ref, inView] = useInView();

  // Seed the start value from localStorage so refresh shows last known value instantly
  const [startFrom] = useState(() => {
    if (typeof window === "undefined") return totalRequests.value;
    return readCache()?.value ?? totalRequests.value;
  });

  const { number } = useSpring({
    from: { number: startFrom },
    to: { number: inView ? totalRequests.value : startFrom },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  // Persist the latest fetched value so next page load starts from here
  useEffect(() => {
    if (!loading) writeCache(totalRequests);
  }, [loading, totalRequests]);

  return (
    <span ref={ref} className={className}>
      <animated.span>
        {number.to((n) => `${n.toFixed(totalRequests.decimals)}${totalRequests.suffix}`)}
      </animated.span>
    </span>
  );
}
