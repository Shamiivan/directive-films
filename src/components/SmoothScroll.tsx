'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if it's a touch device
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return hasTouch || isMobileDevice;
    };

    const mobile = checkMobile();
    setIsMobile(mobile);

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
      });

      // Animation frame loop
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup
      return () => {
        lenis.destroy();
      };
    }
    // On mobile, use native scrolling (no Lenis)
  }, []);

  return <>{children}</>;
}
