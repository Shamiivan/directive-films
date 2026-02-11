'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { lerp } from '../utils/animations';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const sharedProps = {
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
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
  };

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      {...sharedProps}
    >
      {children}
    </motion.button>
  );
}
