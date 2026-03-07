import { useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lerp } from '../utils/animations';
import { useLocalePath } from '../hooks/useLocalePath';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const l = useLocalePath();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Use lerp for smooth magnetic effect
    setPosition({
      x: lerp(position.x, x * 0.3, 0.3),
      y: lerp(position.y, y * 0.3, 0.3),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!elementRef.current) return;

    // Create ripple effect
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Call original onClick handler
    if (onClick) onClick();
  };

  const sharedProps = {
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    animate: {
      x: position.x,
      y: position.y,
    },
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.95 },
    style: {
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
  };

  const rippleElements = (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </AnimatePresence>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={l(href)}
        {...sharedProps}
      >
        {rippleElements}
        {children}
      </motion.a>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      {...sharedProps}
    >
      {rippleElements}
      {children}
    </motion.button>
  );
}
