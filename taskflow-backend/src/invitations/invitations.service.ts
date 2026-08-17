import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInvitationDto) {
    const existing = await this.prisma.invitation.findFirst({
      where: { email: data.email, status: 'pending' },
    });

    if (existing) {
      throw new ConflictException('Invitation for this email already exists');
    }

    return this.prisma.invitation.create({
      data: {
        email: data.email,
        role: data.role,
        message: data.message,
        projects: data.projects.join(','),
      },
    });
  }

  async accept(id: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { id },
    });

    if (!invitation) {
      throw new BadRequestException('Invitation not found');
    }

    if (invitation.status === 'accepted') {
      throw new BadRequestException('Invitation has already been accepted');
    }

    return this.prisma.invitation.update({
      where: { id },
      data: { status: 'accepted' },
    });
  }

  findAll() {
    return this.prisma.invitation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}