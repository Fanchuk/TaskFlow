import { motion } from 'motion/react';
import { container, scaleIn } from '../../hooks/useScrollReveal';

export function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={scaleIn} className={className} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
      {children}
    </motion.div>
  );
}