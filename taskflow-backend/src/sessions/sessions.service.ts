import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hashToken, parseUserAgent, getClientIp } from './session.utils';
import { Request } from 'express';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, token: string, req: Request) {
    const ua = parseUserAgent(req.headers['user-agent'] ?? '');
    return this.prisma.session.create({
      data: {
        userId,
        tokenHash: hashToken(token),
        device: ua.device,
        browser: ua.browser,
        os: ua.os,
        ip: getClientIp(req),
      },
    });
  }

  async list(userId: string, currentToken: string) {
    const currentHash = hashToken(currentToken);
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      orderBy: { lastActive: 'desc' },
    });
    return sessions.map((s) => ({
      id: s.id,
      device: s.device,
      browser: s.browser,
      os: s.os,
      ip: s.ip,
      lastActive: s.lastActive,
      current: s.tokenHash === currentHash,
    }));
  }

  async remove(id: string, userId: string) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');
    if (session.userId !== userId) throw new ForbiddenException('Not your session');
    return this.prisma.session.delete({ where: { id } });
  }

  async touch(tokenHash: string) {
    await this.prisma.session.updateMany({
      where: { tokenHash },
      data: { lastActive: new Date() },
    });
  }
}