import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, plan: string) {
    return this.prisma.subscription.upsert({
      where: { userId },
      update: { plan, status: 'trialing' },
      create: { userId, plan, status: 'trialing' },
    });
  }
}
