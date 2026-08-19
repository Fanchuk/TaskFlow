import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        _count: { select: { members: true } },
        tasks: { select: { status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return projects.map((p) => {
      const total = p.tasks.length;
      const done = p.tasks.filter((t) => t.status === 'done').length;
      const progress = total === 0 ? 0 : Math.round((done / total) * 100);

      return {
        id: p.id,
        title: p.title,
        desc: p.desc,
        status: p.status,
        color: p.color,
        members: p._count.members,
        progress,
      };
    });
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
      include: {
        tasks: { orderBy: { createdAt: 'asc' } },
        members: { include: { user: true } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async overview(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId },
      include: {
        tasks: { select: { status: true, priority: true, doneAt: true } },
        members: { include: { user: { select: { id: true, fullName: true } } } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');

    const tasks = project.tasks;
    const done = tasks.filter((t) => t.status === 'done').length;
    const byStatus = {
      todo: tasks.filter((t) => t.status === 'todo').length,
      in_progress: tasks.filter((t) => t.status === 'in_progress').length,
      done,
    };
    const recent = await this.prisma.task.findMany({
      where: { projectId: id, doneAt: { not: null } },
      orderBy: { doneAt: 'desc' },
      take: 5,
      include: { assignee: { select: { fullName: true } } },
    });

    return {
      title: project.title,
      desc: project.desc,
      total: tasks.length,
      progress: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
      byStatus,
      members: project.members.map((m) => m.user),
      recent,
    };
  }

  create(userId: string, data: { title: string; desc: string; color?: string }) {
    return this.prisma.project.create({
      data: { ...data, ownerId: userId },
    });
  }
}