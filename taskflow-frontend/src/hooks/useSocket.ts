import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    let token: string | null = null;
    try {
      const raw = localStorage.getItem('auth');
      if (raw) token = JSON.parse(raw)?.state?.token ?? null;
    } catch {
      token = null;
    }

    socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:3000', {
      auth: { token },
      query: token ? { token } : {},
      extraHeaders: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }
  return socket;
}

export function useSocketEvent<T>(event: string, handler: (data: T) => void) {
  const ref = useRef(handler);

  useEffect(() => {
    ref.current = handler;
  });

  useEffect(() => {
    const s = getSocket();
    const fn = (data: T) => ref.current(data);
    s.on(event, fn);
    return () => {
      s.off(event, fn);
    };
  }, [event]);
}