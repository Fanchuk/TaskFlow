import {
  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody,
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token ||
      (client.handshake.query?.token as string) ||
      null;

    if (!token || token === 'null') {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET || 'secretKey',
      }) as { sub: string };

      client.data.userId = payload.sub;

      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { status: 'online' },
      });
      this.server.emit('user:status', { userId: payload.sub, status: 'online' });
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

    await this.prisma.user.update({
      where: { id: userId },
      data: { status: 'offline' },
    });
    this.server.emit('user:status', { userId, status: 'offline' });
  }

  @SubscribeMessage('message')
  async onMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { body: string },
  ) {
    const senderId = client.data.userId;
    if (!senderId) return;

    const msg = await this.prisma.message.create({
      data: { senderId, body: data.body },
      include: { sender: { select: { id: true, fullName: true } } },
    });

    this.server.emit('message', msg);
  }

  @SubscribeMessage('room:join')
  onJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { projectId: string }) {
    client.join(`project:${data.projectId}`);
  }

  @SubscribeMessage('room:leave')
  onLeave(@ConnectedSocket() client: Socket, @MessageBody() data: { projectId: string }) {
    client.leave(`project:${data.projectId}`);
  }
}