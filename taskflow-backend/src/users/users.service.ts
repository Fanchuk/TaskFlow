import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, fullName: true, email: true, status: true, role: true },
      orderBy: { fullName: 'asc' },
    });
  }

  setStatus(id: string, status: string) {
    return this.prisma.user.update({
      where: { id },
      data: { status },
    });
  }

  async updateMe(id: string, data: { fullName?: string; email?: string }) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, fullName: true, email: true },
    });
  }

  async updateSettings(id: string, settings: any) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User not found');
    const user = await this.prisma.user.update({
      where: { id },
      data: { settings },
      select: { settings: true },
    });
    return user.settings;
  }

  async updateRole(id: string, role: string, requesterId: string) {
    if (id === requesterId) throw new ForbiddenException('Cannot change your own role');
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, role: true },
    });
  }

  async deleteMe(id: string) {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('User not found');
    return this.prisma.user.delete({ where: { id } });
  }
}