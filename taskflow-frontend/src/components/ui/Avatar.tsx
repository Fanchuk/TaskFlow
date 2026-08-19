const COLORS = [
  ['#6366f1', '#a855f7'],
  ['#ec4899', '#f43f5e'],
  ['#f59e0b', '#f97316'],
  ['#10b981', '#14b8a6'],
  ['#3b82f6', '#06b6d4'],
  ['#8b5cf6', '#6366f1'],
];

function initials(seed: string) {
  const parts = seed.trim().split(' ');
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export default function Avatar({
  seed,
  size = 32,
  className = '',
}: {
  seed: string;
  size?: number;
  className?: string;
}) {
  const idx = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length;
  const [from, to] = COLORS[idx];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-[#1f2937] ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {initials(seed).toUpperCase()}
    </span>
  );
}

export function AvatarStack({
  seeds,
  extra = 0,
  size = 26,
}: {
  seeds: string[];
  extra?: number;
  size?: number;
}) {
  const shown = seeds.slice(0, 3);
  const more = seeds.length - shown.length + extra;

  return (
    <div className="flex -space-x-2">
      {shown.map((s, i) => (
        <Avatar key={i} seed={s} size={size} />
      ))}
      {more > 0 && (
        <span
          className="flex items-center justify-center rounded-full bg-[#4f46e5] text-xs font-semibold text-white ring-2 ring-[#1f2937]"
          style={{ width: size, height: size }}
        >
          +{more}
        </span>
      )}
    </div>
  );
}