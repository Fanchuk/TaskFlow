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
      where: { project: { ownerId: userId }, doneAt: { not: null } },
      select: { doneAt: true },
      orderBy: { doneAt: 'asc' },
    });

    const fmt = (d: Date) => {
      if (period === 'daily')  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
      if (period === 'weekly') return `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleDateString('en', { month: 'short' })}`;
      return d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
    };

    const counts: Record<string, number> = {};
    for (const t of tasks) {
      const key = fmt(new Date(t.doneAt!));
      counts[key] = (counts[key] ?? 0) + 1;
    }

    const limit = period === 'daily' ? 7 : period === 'weekly' ? 8 : 6;
    return Object.entries(counts).slice(-limit).map(([label, value]) => ({ label, value }));
  }

  async overview(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { ownerId: userId },
      include: { tasks: { select: { status: true } } },
    });
    const allTasks = projects.flatMap((p) => p.tasks);
    const done = allTasks.filter((t) => t.status === 'done').length;
    const active = projects.filter((p) => p.status === 'active').length;
    const overdue = await this.prisma.task.count({
      where: { project: { ownerId: userId }, status: { not: 'done' }, dueDate: { lt: new Date() } },
    });
    return {
      projects: projects.length,
      activeProjects: active,
      tasks: allTasks.length,
      doneTasks: done,
      progress: allTasks.length ? Math.round((done / allTasks.length) * 100) : 0,
      overdue,
    };
  }

  async productivity(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { project: { ownerId: userId }, doneAt: { not: null } },
      select: { doneAt: true },
    });
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    for (const t of tasks) counts[new Date(t.doneAt!).getDay()]++;
    return days.map((label, i) => ({ label, value: counts[i] }));
  }

  async deadlines(userId: string) {
    return this.prisma.task.findMany({
      where: { project: { ownerId: userId }, status: { not: 'done' }, dueDate: { not: null } },
      orderBy: { dueDate: 'asc' },
      take: 6,
      select: { id: true, title: true, dueDate: true, priority: true, projectId: true },
    });
  }

  async priorities(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { project: { ownerId: userId }, status: { not: 'done' } },
      select: { priority: true },
    });
    return {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
    };
  }

  async recentActivity(userId: string) {
    return this.prisma.task.findMany({
      where: { project: { ownerId: userId }, doneAt: { not: null } },
      orderBy: { doneAt: 'desc' },
      take: 8,
      include: {
        project: { select: { title: true } },
        assignee: { select: { fullName: true } },
      },
    });
  }

  async myTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        OR: [{ assigneeId: userId }, { project: { ownerId: userId } }],
        status: { not: 'done' },
      },
      orderBy: { dueDate: 'asc' },
      include: { project: { select: { id: true, title: true } } },
    });
  }
}