'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Only run on desktop (not mobile/tablet)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Skip Lenis entirely on mobile devices
    if (isMobile || hasTouch) {
      return; // Use native scrolling on mobile
    }

    // Desktop only: Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenis.start();

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.stop();
      lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
