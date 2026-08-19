import { useEffect } from 'react';

export default function Spinner({
  size = 40,
  stroke = 4,
  color = '#975bec',
}: {
  size?: number;
  stroke?: number;
  color?: string;
}) {
  useEffect(() => {
    import('ldrs').then(({ ring }) => ring.register());
  }, []);

  return (
    <l-ring size={size} stroke={stroke} bg-opacity="0" speed="2" color={color} />
  );
}