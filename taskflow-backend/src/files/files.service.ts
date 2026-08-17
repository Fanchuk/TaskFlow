import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  private activityInclude = {
    owner: { select: { id: true, fullName: true } },
    shares: { include: { user: { select: { id: true, fullName: true } } } },
  };

  private log(userId: string, action: string, fileName: string) {
    return this.prisma.fileActivity.create({ data: { userId, action, fileName } });
  }

  async folders(userId: string) {
    const folders = await this.prisma.folder.findMany({
      where: { ownerId: userId },
      include: { _count: { select: { files: { where: { deletedAt: null } } } } },
      orderBy: { createdAt: 'desc' },
    });
    return folders.map((f) => ({
      id: f.id,
      name: f.name,
      color: f.color,
      fileCount: f._count.files,
    }));
  }

  recent(userId: string, folderId?: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId, deletedAt: null, ...(folderId ? { folderId } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: this.activityInclude,
    });
  }

  allFiles(userId: string, folderId?: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId, deletedAt: null, ...(folderId ? { folderId } : {}) },
      orderBy: { createdAt: 'desc' },
      include: this.activityInclude,
    });
  }

  folderFiles(userId: string, folderId: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId, folderId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: this.activityInclude,
    });
  }

  folderById(userId: string, folderId: string) {
    return this.prisma.folder.findFirst({
      where: { id: folderId, ownerId: userId },
      include: { _count: { select: { files: { where: { deletedAt: null } } } } },
    });
  }

  createFolder(userId: string, data: { name: string; color?: string }) {
    return this.prisma.folder.create({
      data: { name: data.name, color: data.color ?? 'blue', ownerId: userId },
    });
  }

  async createFile(userId: string, data: { name: string; size: number; mime: string; folderId?: string }) {
    const file = await this.prisma.file.create({
      data: { ...data, ownerId: userId },
    });
    await this.log(userId, 'uploaded', file.name);
    return file;
  }

  async deleteFile(id: string, userId: string) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    await this.log(userId, 'deleted', file.name);
    return this.prisma.file.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async toggleStar(id: string, userId: string) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    return this.prisma.file.update({ where: { id }, data: { isStarred: !file.isStarred } });
  }

  starred(userId: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId, isStarred: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: this.activityInclude,
    });
  }

  trash(userId: string) {
    return this.prisma.file.findMany({
      where: { ownerId: userId, deletedAt: { not: null } },
      orderBy: { deletedAt: 'desc' },
      include: this.activityInclude,
    });
  }

  async restore(id: string, userId: string) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    await this.log(userId, 'restored', file.name);
    return this.prisma.file.update({ where: { id }, data: { deletedAt: null } });
  }

  async permanentDelete(id: string, userId: string) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    return this.prisma.file.delete({ where: { id } });
  }

  async emptyTrash(userId: string) {
    return this.prisma.file.deleteMany({ where: { ownerId: userId, deletedAt: { not: null } } });
  }

  async renameFile(id: string, userId: string, name: string) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    await this.log(userId, 'renamed', name);
    return this.prisma.file.update({ where: { id }, data: { name }, include: this.activityInclude });
  }

  async moveFile(id: string, userId: string, folderId: string | null) {
    const file = await this.prisma.file.findFirst({ where: { id, ownerId: userId } });
    if (!file) throw new NotFoundException('File not found');
    
    return this.prisma.file.update({ where: { id }, data: { folderId }, include: this.activityInclude });
  }

  activity(userId: string) {
    return this.prisma.fileActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 15,
      include: { user: { select: { fullName: true } } },
    });
  }

  async stats(userId: string) {
    const files = await this.prisma.file.findMany({
      where: { ownerId: userId, deletedAt: null },
      select: { name: true, size: true, mime: true, createdAt: true, shares: { select: { id: true } } },
    });
    
    const folders = await this.prisma.folder.count({ where: { ownerId: userId } });
    const totalFiles = files.length;
    const shared = files.filter((f) => f.shares.length > 0).length;
    const used = files.reduce((s, f) => s + f.size, 0);

    const byMonth: Record<string, number> = {};
    for (const f of files) {
      const key = f.createdAt.toISOString().slice(0, 7);
      byMonth[key] = (byMonth[key] || 0) + 1;
    }

    const byType = { image: 0, video: 0, document: 0, other: 0 };
    for (const f of files) {
      if (f.mime.startsWith('image/')) byType.image++;
      else if (f.mime.startsWith('video/') || f.mime.startsWith('audio/')) byType.video++;
      else if (f.mime.includes('pdf') || f.mime.includes('doc') || f.mime.includes('text')) byType.document++;
      else byType.other++;
    }

    const topFiles = [...files]
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .map((f) => ({ name: f.name, size: f.size }));

    return { totalFiles, folders, shared, used, byMonth, byType, topFiles };
  }

  async storage(userId: string) {
    const files = await this.prisma.file.findMany({
      where: { ownerId: userId, deletedAt: null },
      select: { size: true, mime: true },
    });

    const used = files.reduce((sum, f) => sum + f.size, 0);
    const byType = { image: 0, video: 0, document: 0, other: 0 };
    for (const f of files) {
      if (f.mime.startsWith('image/')) byType.image += f.size;
      else if (f.mime.startsWith('video/') || f.mime.startsWith('audio/')) byType.video += f.size;
      else if (f.mime.includes('pdf') || f.mime.includes('doc') || f.mime.includes('text')) byType.document += f.size;
      else byType.other += f.size;
    }

    const TOTAL = 512 * 1024 * 1024 * 1024;
    return { used, total: TOTAL, byType };
  }

  async shareFile(fileId: string, ownerId: string, userId: string) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    if (file.ownerId !== ownerId) throw new ForbiddenException('Not your file');

    await this.log(ownerId, 'shared', file.name); 

    return this.prisma.fileShare.create({
      data: { fileId, userId },
      include: { user: { select: { id: true, fullName: true } } },
    });
  }

  async unshareFile(fileId: string, ownerId: string, userId: string) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    if (file.ownerId !== ownerId) throw new ForbiddenException('Not your file');

    return this.prisma.fileShare.deleteMany({
      where: { fileId, userId },
    });
  }
}