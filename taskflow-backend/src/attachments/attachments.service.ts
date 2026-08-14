import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  create(taskId: string, data: { name: string; size: number; mime: string }) {
    return this.prisma.attachment.create({ data: { taskId, ...data } });
  }

  remove(id: string) {
    return this.prisma.attachment.delete({ where: { id } });
  }
}