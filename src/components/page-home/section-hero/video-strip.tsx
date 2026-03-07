import styles from './video-strip.module.css';

const THUMBNAILS = [
  { src: '/images/strip/1-camera-setup.jpg', alt: 'Professional cinema camera setup' },
  { src: '/images/strip/2-outdoor-crew.jpg', alt: 'Film crew on outdoor set' },
  { src: '/images/strip/3-silhouette.jpg', alt: 'Cinematographer silhouette' },
  { src: '/images/strip/4-adjusting-camera.jpg', alt: 'Adjusting video camera' },
  { src: '/images/strip/5-filming-band.jpg', alt: 'Filming live performance' },
  { src: '/images/strip/6-red-camera-street.jpg', alt: 'RED camera street shoot' },
  { src: '/images/strip/7-woman-camera.jpg', alt: 'Camera operator at work' },
  { src: '/images/strip/8-night-filming.jpg', alt: 'Night event filming' },
];

// Triplicate for seamless loop when starting from the middle
const slides = [...THUMBNAILS, ...THUMBNAILS, ...THUMBNAILS];

export default function VideoStrip({ className }: { className?: string }) {
  return (
    <div className={`${styles.stripWrapper} ${className ?? ''}`}>
      <div className={styles.stripTrack}>
        {slides.map((thumb, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={thumb.src}
              alt={thumb.alt}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
