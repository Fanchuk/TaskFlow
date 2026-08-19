import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      select: { id: true, fullName: true, email: true, role: true, status: true },
    });
  }

  async updateMe(
    id: string,
    data: { fullName?: string; email?: string; currentPassword?: string; newPassword?: string },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const { currentPassword, newPassword, ...rest } = data;
    const updateData: any = { ...rest };

    if (newPassword) {
      if (!currentPassword) throw new BadRequestException('Current password required');
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) throw new BadRequestException('Current password is incorrect');
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, fullName: true, email: true },
    });
  }

  async deleteMe(id: string) {
    return this.prisma.user.delete({ where: { id } });
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
}