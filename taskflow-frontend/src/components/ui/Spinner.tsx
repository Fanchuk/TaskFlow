import { useEffect } from 'react';

export default function Spinner({
  size = 34,
  stroke = 3.5,
  color = '#22d3ee',
}: {
  size?: number;
  stroke?: number;
  color?: string;
}) {
  useEffect(() => {
    import('ldrs').then(({ ring }) => ring.register());
  }, []);

  return <l-ring size={size} stroke={stroke} bg-opacity="0" speed="2" color={color} />;
}