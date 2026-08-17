// prisma/seed.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString:
    'postgresql://neondb_owner:npg_ixe1yz8vQZmN@ep-mute-mouse-asq2zfj9-pooler.c-4.eu-central-1.aws.neon.tech/saas_auth?sslmode=require&channel_binding=require',
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // знаходимо юзера
  const user = await prisma.user.findFirst();
  if (!user) throw new Error('No user found — register first');

  // 3 проєкти
  await Promise.all([
    prisma.project.upsert({
      where: { id: 'seed-project-1' },
      update: {},
      create: {
        id: 'seed-project-1',
        title: 'TaskFlow Workspace',
        desc: 'Full-stack task management app',
        color: 'indigo',
        status: 'active',
        ownerId: user.id,
      },
    }),
    prisma.project.upsert({
      where: { id: 'seed-project-2' },
      update: {},
      create: {
        id: 'seed-project-2',
        title: 'Fintask Landing',
        desc: 'Marketing landing page',
        color: 'purple',
        status: 'active',
        ownerId: user.id,
      },
    }),
    prisma.project.upsert({
      where: { id: 'seed-project-3' },
      update: {},
      create: {
        id: 'seed-project-3',
        title: 'Habit Tracker',
        desc: 'Daily habits tracking app',
        color: 'green',
        status: 'active',
        ownerId: user.id,
      },
    }),
  ]);

  // задачі з doneAt по різних днях для графіку
  const now = new Date();
  const day = (n: number) => new Date(now.getFullYear(), now.getMonth(), n);

  const tasksData = [
    // Project 1
    { id: 'st1', title: 'Setup NestJS', projectId: 'seed-project-1', status: 'done', priority: 'high', order: 0, doneAt: day(1) },
    { id: 'st2', title: 'Prisma schema', projectId: 'seed-project-1', status: 'done', priority: 'high', order: 1, doneAt: day(3) },
    { id: 'st3', title: 'Auth module', projectId: 'seed-project-1', status: 'done', priority: 'medium', order: 2, doneAt: day(5) },
    { id: 'st4', title: 'Kanban DnD', projectId: 'seed-project-1', status: 'done', priority: 'high', order: 3, doneAt: day(7) },
    { id: 'st5', title: 'Dashboard charts', projectId: 'seed-project-1', status: 'in_progress', priority: 'medium', order: 0, doneAt: null },
    { id: 'st6', title: 'Task Drawer', projectId: 'seed-project-1', status: 'todo', priority: 'low', order: 0, doneAt: null },
    // Project 2
    { id: 'st7', title: 'Wireframes', projectId: 'seed-project-2', status: 'done', priority: 'high', order: 0, doneAt: day(2) },
    { id: 'st8', title: 'Hero section', projectId: 'seed-project-2', status: 'done', priority: 'medium', order: 1, doneAt: day(6) },
    { id: 'st9', title: 'Animations', projectId: 'seed-project-2', status: 'in_progress', priority: 'medium', order: 0, doneAt: null },
    { id: 'st10', title: 'SEO meta', projectId: 'seed-project-2', status: 'todo', priority: 'low', order: 0, doneAt: null },
    // Project 3
    { id: 'st11', title: 'DB design', projectId: 'seed-project-3', status: 'done', priority: 'high', order: 0, doneAt: day(4) },
    { id: 'st12', title: 'Streak logic', projectId: 'seed-project-3', status: 'done', priority: 'high', order: 1, doneAt: day(8) },
    { id: 'st13', title: 'Notifications', projectId: 'seed-project-3', status: 'todo', priority: 'medium', order: 0, doneAt: null },
  ];

  for (const t of tasksData) {
    await prisma.task.upsert({
      where: { id: t.id },
      update: {},
      create: t,
    });
  }

  console.log('✅ Seed done');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());