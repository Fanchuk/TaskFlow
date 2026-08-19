import { motion } from 'motion/react';

const VARIANTS = {
  // Primary neon-gradient button
  purpleSolid:
    'tf-neon-btn text-white rounded-full px-8 py-4 font-semibold border border-white/10 ' +
    '[background:linear-gradient(110deg,#22d3ee,#3b82f6_55%,#8b5cf6)]',
  // Ghost / outline neon
  purpleOutline:
    'tf-glass text-[#cfe0ff] rounded-full px-7 py-3.5 font-semibold border-white/15 ' +
    'hover:border-[#3b82f6]/60 hover:text-white transition-colors',
  // Orange accent
  orangeOutline:
    'tf-neon-btn text-white rounded-full px-7 py-3.5 font-semibold border border-white/10 ' +
    '[background:linear-gradient(110deg,#ff6b35,#ff8a5c)]',
  // Header pill
  outline:
    'tf-glass text-white rounded-full px-6 py-3 md:px-7 md:py-3.5 font-semibold border-white/15 ' +
    'hover:border-[#22d3ee]/60 transition-colors',
  // Small subscribe
  subscribe:
    'text-white rounded-xl px-6 py-3 font-semibold border border-white/10 ' +
    '[background:linear-gradient(110deg,#3b82f6,#8b5cf6)] hover:brightness-110 transition',
};

export default function Button({
  children,
  variant = 'purpleSolid',
  icon = false,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  icon?: boolean;
  className?: string;
} & React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`tf-focus inline-flex items-center justify-center gap-2.5 outline-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && (
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current/60">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </motion.button>
  );
}