'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Check mobile immediately (not in useState to avoid hydration delay)
  const checkMobile = () => {
    if (typeof window === 'undefined') return false;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return hasTouch || isMobileDevice;
  };

  useEffect(() => {
    const mobile = checkMobile();

    // Only initialize Lenis on desktop devices
    if (!mobile) {
      const lenis = new Lenis({
        duration: 0.8, // Reduced from 1.2 for faster response
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.5, // Increased for more responsive scrolling
        touchMultiplier: 2,
        infinite: false,
        syncTouch: false, // Prevent touch delay
        autoResize: true,
      });

      // Explicitly start Lenis
      lenis.start();

      // Animation frame loop
      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      // Start RAF immediately
      rafId = requestAnimationFrame(raf);

      // Cleanup
      return () => {
        lenis.stop();
        lenis.destroy();
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
    // On mobile, use native scrolling (no Lenis)
  }, []);

  return <>{children}</>;
}
