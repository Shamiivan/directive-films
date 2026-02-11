'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lerp } from '../utils/animations';

interface MagneticButtonArrowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * Enhanced Magnetic Button with Arrow Reveal
 * Magnetic effect + ripple + arrow reveal on hover
 */
export default function MagneticButtonArrow({
  children,
  className = '',
  onClick,
  href
}: MagneticButtonArrowProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setPosition({
      x: lerp(position.x, x * 0.3, 0.3),
      y: lerp(position.y, y * 0.3, 0.3),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
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

  const arrowElement = (
    <motion.span
      initial={{ x: -10, opacity: 0 }}
      animate={isHovered ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: 'inline-block',
        marginLeft: '8px',
      }}
    >
      →
    </motion.span>
  );

  const sharedProps = {
    className,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
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
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    style: {
      position: 'relative' as const,
      overflow: 'hidden' as const,
      display: 'inline-flex' as const,
      alignItems: 'center' as const,
    },
  };

  if (href) {
    return (
      <motion.a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
      >
        {rippleElements}
        {children}
        {arrowElement}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      {...sharedProps}
    >
      {rippleElements}
      {children}
      {arrowElement}
    </motion.button>
  );
}
