<div align="center">

# TaskFlow

**A full-stack project management SaaS — Kanban boards, AI-powered task generation, real-time team chat, and a complete file management system.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=flat-square)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat-square)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square)](https://www.postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=white&style=flat-square)](https://socket.io)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=googlegemini&logoColor=white&style=flat-square)](https://ai.google.dev)

[Live Demo](https://taskflow-YOUR-DEPLOY-ID.vercel.app) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## About

TaskFlow is a complete task and project management platform built to mirror what a real SaaS product looks like end-to-end: a NestJS + PostgreSQL backend, a React + TypeScript frontend, JWT authentication with session tracking, AI-assisted planning, live team chat, and a Google-Drive-style file manager — all wired together with a real database, not mock data.

**Why it's worth a look:**

- 🧩 Full CRUD across every module — projects, tasks, files, chat, sessions — backed by a real PostgreSQL schema, not static JSON
- 🤖 AI task generation & progress summaries via the Google Gemini API
- ⚡ Real-time chat (group + DMs) with images, video, files, and voice messages
- 🖱️ Drag-and-drop Kanban board built with `dnd-kit`
- 🔐 JWT auth with device/browser/IP session tracking and role-based guards
- 🗂️ File manager with folders, sharing, starring, and a soft-delete trash system
- 📊 A dashboard with live charts, deadlines, priority breakdowns, and an activity feed

---

## Screenshots

> Save your screenshots into `taskflow-frontend/public/` at the project root using the exact filenames below — this README references them directly and they'll render automatically on GitHub.

| | |
|---|---|
| **Landing Page** <br> `taskflow-frontend/public/landing.png` | **Login** <br> `taskflow-frontend/public/login.png` |
| ![Landing](taskflow-frontend/public/landing.png) | ![Login](taskflow-frontend/public/login.png) |
| **Dashboard** <br> `taskflow-frontend/public/dashboard.png` | **Projects List** <br> `taskflow-frontend/public/projects-list.png` |
| ![Dashboard](taskflow-frontend/public/dashboard.png) | ![Projects List](taskflow-frontend/public/projects-list.png) |
| **Kanban Board** <br> `taskflow-frontend/public/project-kanban.png` | **Timeline View** <br> `taskflow-frontend/public/project-timeline.png` |
| ![Kanban](taskflow-frontend/public/project-kanban.png) | ![Timeline](taskflow-frontend/public/project-timeline.png) |
| **AI Task Generator** <br> `taskflow-frontend/public/ai-task-generator.png` | **Files** <br> `taskflow-frontend/public/files.png` |
| ![AI Task Generator](taskflow-frontend/public/ai-task-generator.png) | ![Files](taskflow-frontend/public/files.png) |
| **Team Chat** <br> `taskflow-frontend/public/team-chat.png` | **Settings** <br> `taskflow-frontend/public/settings-account.png` |
| ![Team Chat](taskflow-frontend/public/team-chat.png) | ![Settings](taskflow-frontend/public/settings-account.png) |

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)

---

## Features

### Authentication & Security
- Register / login with JWT-based authentication
- Session tracking on every login — device, browser, OS, and IP parsed via `ua-parser-js`
- View and revoke active sessions from Settings, with the current device flagged
- Role-based route guards (`admin` vs `member`) protecting sensitive endpoints
- Two-factor authentication toggle and account deletion with confirmation modal

### Dashboard & Analytics
- Live metric cards — total projects, tasks, completion %, overdue count
- Task completion chart (Daily / Weekly / Monthly) rendered with Recharts
- Task status donut chart (To Do / In Progress / Done)
- Upcoming deadlines widget with overdue highlighting
- Open tasks by priority breakdown
- Recent team activity feed
- Dedicated `/analytics` page and a personal `/tasks/my` view

### Project Management
- Kanban board with drag-and-drop (`@dnd-kit`), search, and priority filters
- List, Calendar, Timeline (Gantt-style), and Overview views for every project
- Task drawer with comments, file attachments, and shareable links
- Assign tasks to teammates directly from the board
- Project overview tab with progress, status breakdown, members, and recent completions

### AI Integration
- **AI Task Generator** — describe a project, get 5–7 concrete suggested tasks (Google Gemini), review and add them in one click
- **AI Progress Summary** — generates a short natural-language status update for any project based on its current tasks

### Team Collaboration
- General team chat plus one-on-one private messages
- Send text, images, video, files, and voice messages (recorded in-browser via the MediaRecorder API)
- Clear chat history per conversation
- Online/offline presence and role badges per member

### File Management
- Folders with custom colors, nested file organization, and per-folder views
- Upload with folder selection, storage usage broken down by file type
- Starred files, a soft-delete trash (restore or permanently delete), and a full activity log
- File sharing — grant or revoke teammate access per file
- Dedicated file statistics page (totals, largest files, uploads by month)

### Settings
- Profile editing synced instantly across the whole app (sidebar, topbar, avatar)
- Preferences — theme, language, notifications, default task view — persisted as JSON
- Team & permissions management with role changes and invitations

---

## Tech Stack

### Frontend

| Category | Technology |
|---|---|
| Framework | React 19, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router |
| Data fetching / caching | TanStack Query |
| Global state | Zustand |
| Forms & validation | React Hook Form, Zod |
| Animation | Motion (Framer Motion) |
| Drag & drop | dnd-kit |
| Charts | Recharts |
| Real-time | Socket.io Client |
| HTTP client | Axios |
| Internationalization | i18next, react-i18next |
| Notifications | React Hot Toast |
| Payments | Stripe |
| Icons | Lucide React |

### Backend

| Category | Technology |
|---|---|
| Framework | NestJS |
| ORM | Prisma |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT, Passport |
| Validation | class-validator |
| Real-time | Socket.io (WebSocket Gateway) |
| AI | Google Gemini API |
| Session parsing | ua-parser-js |

---

## Architecture

```
┌─────────────────┐        REST + WebSocket        ┌──────────────────┐
│                  │ ───────────────────────────▶  │                  │
│   React SPA      │                                │     NestJS       │
│  (Vite + TS)      │ ◀───────────────────────────  │   REST API +     │
│                  │        JSON / JWT               │  Socket Gateway  │
└─────────────────┘                                └────────┬─────────┘
                                                              │ Prisma ORM
                                                              ▼
                                                     ┌──────────────────┐
                                                     │   PostgreSQL      │
                                                     │   (Neon)          │
                                                     └──────────────────┘

                        ┌──────────────────┐
                        │  Google Gemini AI │  ← task generation & summaries
                        └──────────────────┘
```

The frontend and backend are separate applications communicating over a REST API, with a dedicated WebSocket gateway handling live chat. Every feature — auth, projects, files, chat — is its own NestJS module with its own Prisma-backed service, keeping the backend modular and easy to extend.

---

## Project Structure

```
taskflow-frontend/
├── src/
│   ├── components/
│   │   ├── dashboard/      # Metrics, charts, activity feed, project cards
│   │   ├── project/        # Kanban, List, Calendar, Timeline, Task Drawer, AI panel
│   │   ├── files/          # Folder cards, file rows, upload/share/preview modals
│   │   ├── settings/       # Profile, Preferences, Account, Team tabs
│   │   ├── layout/         # AppLayout, Sidebar, Topbar
│   │   └── ui/             # Modal, Avatar, Spinner, ConfirmModal, buttons
│   ├── pages/               # Route-level pages (Dashboard, Projects, Files, Team, Settings...)
│   ├── services/            # Axios API clients, grouped by domain
│   ├── stores/               # Zustand stores (auth, theme)
│   ├── hooks/                # Shared hooks (e.g. task filters)
│   └── types.ts
└── public/
    └── screenshots/          # README screenshots

taskflow-backend/
├── src/
│   ├── auth/                 # Register, login, JWT strategy
│   ├── users/                 # Profile, settings, roles, admin guard
│   ├── sessions/               # Device/session tracking
│   ├── projects/               # Projects + overview stats
│   ├── tasks/                   # Tasks, assignment, reordering
│   ├── comments/ attachments/    # Task sub-resources
│   ├── files/                     # Folders, files, sharing, trash, stats
│   ├── chat/                       # WebSocket gateway + REST history
│   ├── invitations/                 # Team invites
│   ├── ai/                           # Gemini task generation & summaries
│   ├── stats/                         # Dashboard analytics endpoints
│   └── prisma/                         # PrismaService
└── prisma/
    ├── schema.prisma
    └── migrations/
```

---

## Database Schema

| Model | Purpose |
|---|---|
| `User` | Accounts, role, JSON preferences |
| `Session` | Login sessions — device, browser, OS, IP, hashed token |
| `Project` / `ProjectMember` | Projects and their team membership |
| `Task` | Kanban tasks — status, priority, due date, assignee |
| `Comment` / `Attachment` | Task-level discussion and files |
| `Message` | Chat messages — group or private, supports file/media payloads |
| `Folder` / `File` / `FileShare` | File manager, ownership, and sharing |
| `FileActivity` | Audit log of file actions (upload, delete, restore, rename) |
| `Invitation` | Pending team invitations |
| `Subscription` | Billing plan status |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database (this project uses [Neon](https://neon.tech))
- A [Google Gemini API key](https://ai.google.dev)

### 1. Clone the repository

```bash
git clone https://github.com/Fanchuk/TaskFlow.git
cd TaskFlow
```

### 2. Backend setup

```bash
cd taskflow-backend
npm install
# create a .env file — see Environment Variables below
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

### 3. Frontend setup

```bash
cd taskflow-frontend
npm install
# create a .env file — see Environment Variables below
npm run dev
```

The app will be available at `http://localhost:5173`, with the API running on `http://localhost:3001`.

---

## Environment Variables

**`taskflow-backend/.env`**

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-jwt-secret"
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=3001
```

**`taskflow-frontend/.env`**

```env
VITE_API_URL="http://localhost:3001"
```

> Check `src/lib/axios.ts` to confirm the exact variable name your Axios instance reads.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

---

## Roadmap

- [ ] Real file storage (S3 / object storage) instead of metadata-only uploads
- [ ] Push notifications for mentions, assignments, and deadlines
- [ ] Full mobile-responsive redesign
- [ ] Automated tests (Jest / Vitest + Playwright)
- [ ] Dockerized deployment

---

## Author

**Nazar Fan**
[GitHub](https://github.com/Fanchuk) · [LinkedIn](#) · [Email](#)

---

<div align="center">

If you found this project interesting, consider giving it a ⭐

</div>