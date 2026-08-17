import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class ChatController {
  constructor(private prisma: PrismaService) {}

  @Get()
  history() {
    return this.prisma.message.findMany({
      include: { sender: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: 'asc' },
      take: 100, // останні 100
    });
  }
}