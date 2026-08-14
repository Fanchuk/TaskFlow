import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async statusOverview(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { project: { ownerId: userId } },
      select: { status: true },
    });

    return {
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };
  }

  async taskDone(userId: string, period: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        project: { ownerId: userId },
        status: 'done',
        doneAt: { not: null },
      },
      select: { doneAt: true },
    });

    const buckets = new Map<string, number>();
    for (const t of tasks) {
      const key = this.bucketKey(t.doneAt!, period);
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }

    return [...buckets.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  private bucketKey(date: Date, period: string): string {
    const d = new Date(date);
    if (period === 'daily') {
      return d.toISOString().slice(0, 10);
    }
    if (period === 'weekly') {
      const week = Math.ceil(d.getDate() / 7);
      return `${d.getFullYear()}-W${week}`;
    }
    return d.toISOString().slice(0, 7); 
  }
}