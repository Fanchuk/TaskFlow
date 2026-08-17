import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async folders(userId: string) {
    const folders = await this.prisma.folder.findMany({
      where: { ownerId: userId },
      include: { _count: { select: { files: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return folders.map((f) => ({
      id: f.id, name: f.name, color: f.color, fileCount: f._count.files,
    }));
  }

  recent(userId: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  createFolder(userId: string, data: { name: string; color?: string }) {
    return this.prisma.folder.create({
      data: { name: data.name, color: data.color ?? 'blue', ownerId: userId },
    });
  }

  createFile(userId: string, data: { name: string; size: number; mime: string; folderId?: string }) {
    return this.prisma.file.create({ data: { ...data, ownerId: userId } });
  }

  deleteFile(id: string) {
    return this.prisma.file.delete({ where: { id } });
  }

  async storage(userId: string) {
    const files = await this.prisma.file.findMany({
      where: { ownerId: userId },
      select: { size: true, mime: true },
    });

    const used = files.reduce((sum, f) => sum + f.size, 0);
    const byType = { image: 0, document: 0, other: 0 };
    for (const f of files) {
      if (f.mime.startsWith('image/')) byType.image += f.size;
      else if (f.mime.includes('pdf') || f.mime.includes('doc')) byType.document += f.size;
      else byType.other += f.size;
    }

    const TOTAL = 512 * 1024 * 1024 * 1024; 
    return { used, total: TOTAL, byType };
  }
}