import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedNavProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedNav({ children, className }: AnimatedNavProps) {
  return (
    <motion.nav
      className={className}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.nav>
  );
}
