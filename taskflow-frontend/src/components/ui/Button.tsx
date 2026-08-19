import { motion } from 'motion/react';

const VARIANTS = {
  purpleSolid:
    'bg-[#975bec] text-white border-[3px] border-[#7345b3] rounded-[59px] px-8 py-4 font-bold shadow-[5px_5px_0_0_#7345b3] hover:shadow-[3px_3px_0_0_#7345b3]',
  purpleOutline:
    'bg-white text-[#7345b3] border-2 border-[#975bec] rounded-[59px] px-7 py-3.5 font-bold hover:bg-[#975bec]/5',
  orangeOutline:
    'bg-[#e8582c] text-white border-[3px] border-[#c94418] rounded-[59px] px-7 py-3.5 font-bold shadow-[4px_4px_0_0_#c94418] hover:shadow-[2px_2px_0_0_#c94418]',
  outline:
    'bg-white text-black border-[3px] border-black rounded-[59px] px-6 py-3 md:px-7 md:py-3.5 font-bold shadow-[5px_5px_0_0_#000] hover:shadow-[3px_3px_0_0_#000]',
  subscribe:
    'bg-[#975bec] text-white border-2 border-[#7345b3] rounded-lg px-6 py-3 font-semibold hover:bg-[#8548d8]',
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97, y: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2.5 outline-none focus-visible:ring-4 focus-visible:ring-[#975bec]/40 transition-shadow ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {icon && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[2.5px] border-current" />
      )}
      {children}
    </motion.button>
  );
}