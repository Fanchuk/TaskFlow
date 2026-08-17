import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    return !!this.getUserId(client);
  }

  getUserId(client: Socket): string | null {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.query?.token;

      if (!token || token === 'null') return null;

      const payload = this.jwt.verify(token as string, {
        secret: process.env.JWT_SECRET || 'secretKey',
      }) as { sub: string };

      return payload.sub;
    } catch {
      return null;
    }
  }
}