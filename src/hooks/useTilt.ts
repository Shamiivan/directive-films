import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface UseTiltOptions {
  maxRotation?: number;
  scale?: number;
  perspective?: number;
}

export function useTilt({
  maxRotation = 7.5,
  scale = 1.02,
  perspective = 1000,
}: UseTiltOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [`${maxRotation}deg`, `-${maxRotation}deg`]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [`-${maxRotation}deg`, `${maxRotation}deg`]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = {
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d' as const,
    perspective,
  };

  return { ref, style, onMouseMove, onMouseLeave, scale };
}
