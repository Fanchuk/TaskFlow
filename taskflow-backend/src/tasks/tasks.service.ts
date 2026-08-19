import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, ReorderItemDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
      include: {
        assignee: { select: { id: true, fullName: true } },
        _count: { select: { comments: true, attachments: true } },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        comments: { include: { author: true }, orderBy: { createdAt: 'desc' } },
        attachments: { orderBy: { createdAt: 'desc' } },
        project: { select: { id: true, title: true } },
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(dto: CreateTaskDto) {
    const count = await this.prisma.task.count({
      where: { projectId: dto.projectId, status: dto.status ?? 'todo' },
    });
    return this.prisma.task.create({
      data: {
        title: dto.title,
        projectId: dto.projectId,
        priority: dto.priority ?? 'medium',
        status: dto.status ?? 'todo',
        startDate: dto.startDate ? new Date(dto.startDate) : new Date(),
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        order: count,
      },
    });
  }

  update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async setStatus(id: string, status: string) {
    const doneAt = status === 'done' ? new Date() : null;
    return this.prisma.task.update({ where: { id }, data: { status, doneAt } });
  }

  async reorder(items: ReorderItemDto[]) {
    await this.prisma.$transaction(
      items.map((it) =>
        this.prisma.task.update({
          where: { id: it.id },
          data: {
            status: it.status,
            order: it.order,
            doneAt: it.status === 'done' ? new Date() : null,
          },
        })
      ),
    );
    return { ok: true };
  }

  assign(id: string, assigneeId: string | null) {
    return this.prisma.task.update({ where: { id }, data: { assigneeId } });
  }

  projectMembers(projectId: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { ownedProjects: { some: { id: projectId } } },
          { memberships: { some: { projectId: projectId } } }
        ]
      },
      select: { id: true, fullName: true, email: true },
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}