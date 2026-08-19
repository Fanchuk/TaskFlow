import {
  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody,
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: [
      'https://task-flow-bay-nu.vercel.app',
      'https://task-flow-git-main-fanfotballon-6003s-projects.vercel.app',
      'http://localhost:5173',
    ],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private chatService: ChatService,
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
      client.join(`user:${payload.sub}`);

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

  @SubscribeMessage('message:send')
  async onMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { text?: string; receiverId?: string; fileUrl?: string; fileType?: string; fileName?: string },
  ) {
    const senderId = client.data.userId;
    if (!senderId) return;

    const msg = await this.chatService.send(senderId, data);

    if (data.receiverId) {
      this.server.to(`user:${data.receiverId}`).to(`user:${senderId}`).emit('message:new', msg);
    } else {
      this.server.emit('message:new', msg);
    }
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