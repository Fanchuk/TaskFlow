import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppLayout from './components/layout/AppLayout';
import RequireAuth from './components/RequireAuth';
import { Backdrop } from './components/motion/Decor';

import Landing from './pages/Landing';
import Download from './pages/Download';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

import DashboardPage from './pages/DashboardPage';
import NewProject from './pages/NewProject';
import ProjectsListPage from './pages/ProjectsListPage';
import ProjectLayout from './pages/Projects';
import TeamPage from './pages/TeamPage';
import SettingsPage from './pages/SettingsPage';
import FilesPage from './pages/FilesPage';
import AllFilesPage from './pages/AllFilesPage';
import FolderPage from './pages/FolderPage';
import StarredPage from './pages/StarredPage';
import TrashPage from './pages/TrashPage';
import FileStatsPage from './pages/FileStatsPage';
import MyTasksPage from './pages/MyTasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AiTasksPage from './pages/AiTasksPage';

import OverviewView from './components/project/OverviewView';
import KanbanView from './components/project/KanbanView';
import ListView from './components/project/ListView';
import CalendarView from './components/project/CalendarView';
import TimelineView from './components/project/TimelineView';
import TaskDrawer from './components/project/TaskDrawer';

const HIDDEN_CHROME = [
  '/login',
  '/register',
  '/checkout',
  '/dashboard',
  '/projects',
  '/team',
  '/settings',
  '/files',
  '/tasks',
  '/analytics'
];

function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const bare = HIDDEN_CHROME.some((p) => pathname.startsWith(p));

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <Backdrop />
      {!bare && <Header />}
      <main>{children}</main>
      {!bare && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects" element={<ProjectsListPage />} />
            <Route path="/projects/:id" element={<ProjectLayout />}>
              <Route index element={<Navigate to="kanban" replace />} />
              <Route path="overview" element={<OverviewView />} />
              <Route path="kanban" element={<KanbanView />}>
                <Route path="tasks/:taskId" element={<TaskDrawer />} />
              </Route>
              <Route path="list" element={<ListView />} />
              <Route path="calendar" element={<CalendarView />} />
              <Route path="timeline" element={<TimelineView />} />
              <Route path="ai-tasks" element={<AiTasksPage />} />
            </Route>

            <Route path="/team" element={<TeamPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/files" element={<FilesPage />} />
            <Route path="/files/all" element={<AllFilesPage />} />
            <Route path="/files/folder/:id" element={<FolderPage />} />
            <Route path="/files/starred" element={<StarredPage />} />
            <Route path="/files/trash" element={<TrashPage />} />
            <Route path="/files/stats" element={<FileStatsPage />} />

            <Route path="/tasks/my" element={<MyTasksPage />} />
            <Route path="/tasks" element={<Navigate to="/tasks/my" replace />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </BrowserRouter>
  );
}