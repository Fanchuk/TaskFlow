import { UAParser } from 'ua-parser-js';
import { createHash } from 'crypto';
import { Request } from 'express';

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function parseUserAgent(ua: string) {
  const parser = new UAParser(ua);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  return {
    browser: browser.name ? `${browser.name} ${browser.version ?? ''}`.trim() : 'Unknown',
    os: os.name ? `${os.name} ${os.version ?? ''}`.trim() : 'Unknown',
    device: device.model ?? device.type ?? 'Desktop',
  };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd)) return fwd[0];
  return req.ip ?? 'Unknown';
}