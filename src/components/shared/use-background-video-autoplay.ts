import { useEffect, useRef } from "react";

export function useBackgroundVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const play = () => {
      void video.play().catch(() => {
        // Mobile browsers may still block autoplay in low-power or data-saver modes.
      });
    };

    // Only start (and download) the video once it scrolls into view. Above-fold
    // heroes intersect immediately; below-fold videos defer their download.
    if (typeof IntersectionObserver === "undefined") {
      play();
      video.addEventListener("loadedmetadata", play, { once: true });
      video.addEventListener("canplay", play, { once: true });
      return () => {
        video.removeEventListener("loadedmetadata", play);
        video.removeEventListener("canplay", play);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(video);
    video.addEventListener("canplay", play, { once: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", play);
    };
  }, []);

  return videoRef;
}
