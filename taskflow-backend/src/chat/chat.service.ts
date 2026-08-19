import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  messages(userId: string, receiverId?: string) {
    if (receiverId) {
      return this.prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        },
        orderBy: { createdAt: 'asc' },
        include: { sender: { select: { id: true, fullName: true, role: true } } },
      });
    }

    return this.prisma.message.findMany({
      where: { receiverId: null },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { id: true, fullName: true, role: true } } },
    });
  }

  send(senderId: string, data: { text?: string; receiverId?: string; fileUrl?: string; fileType?: string; fileName?: string }) {
    return this.prisma.message.create({
      data: {
        senderId,
        text: data.text,
        receiverId: data.receiverId || null,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        fileName: data.fileName,
      },
      include: { sender: { select: { id: true, fullName: true, role: true } } },
    });
  }

  async clear(userId: string, receiverId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    
    const isAdmin = user?.role === 'admin';

    if (receiverId) {
      return this.prisma.message.deleteMany({
        where: {
          OR: [
            { senderId: userId, receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        },
      });
    }

    if (isAdmin) {
      return this.prisma.message.deleteMany({ where: { receiverId: null } });
    } else {
      return this.prisma.message.deleteMany({
        where: {
          receiverId: null,
          senderId: userId, 
        },
      });
    }
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user?.role === 'admin' || message.senderId === userId) {
      return this.prisma.message.delete({
        where: { id: messageId },
      });
    } else {
      throw new ForbiddenException('No permission to delete this message');
    }
  }
}