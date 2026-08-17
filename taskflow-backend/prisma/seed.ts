// prisma/seed.ts
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Знаходимо конкретного юзера (або першого доступного)
  const user =
    (await prisma.user.findUnique({
      where: { email: 'mostafa@test.com' }, // вкажіть ваш робочий email
    })) ?? (await prisma.user.findFirst());

  if (!user) {
    throw new Error('No user found — register in the app first');
  }

  console.log(`🌱 Seeding data for user: ${user.email} (${user.id})`);

  // 3 проєкти
  const projects = [
    {
      id: 'seed-project-1',
      title: 'TaskFlow Workspace',
      desc: 'Full-stack task management app',
      color: 'indigo',
      status: 'active',
      ownerId: user.id,
    },
    {
      id: 'seed-project-2',
      title: 'Fintask Landing',
      desc: 'Marketing landing page',
      color: 'purple',
      status: 'active',
      ownerId: user.id,
    },
    {
      id: 'seed-project-3',
      title: 'Habit Tracker',
      desc: 'Daily habits tracking app',
      color: 'green',
      status: 'active',
      ownerId: user.id,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: { ownerId: user.id },
      create: project,
    });
  }

  // Задачі з датами виконання для аналітики
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

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });