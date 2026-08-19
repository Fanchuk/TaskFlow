import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  constructor(private prisma: PrismaService) {}

  async generateTasks(title: string, desc: string): Promise<string[]> {
    try {
      const res = await this.ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: `Project: "${title}". Description: "${desc}". Generate 5-7 concrete tasks. Return ONLY a JSON array of strings, no other text. Example: ["Task 1", "Task 2"]`,
      });
      const text = (res.text ?? '[]').replace(/```json|```/g, '').trim();
      return JSON.parse(text);
    } catch {
      return [
        'Define requirements',
        'Setup environment',
        'Create initial structure',
        'Implement core features',
        'Testing and deployment'
      ];
    }
  }

  async summarizeProgress(projectId: string): Promise<string> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });
    
    if (!project) return 'Project not found';

    const done = project.tasks.filter((t) => t.status === 'done').length;
    const total = project.tasks.length;

    try {
      const res = await this.ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: `Project "${project.title}": ${done} of ${total} tasks done. Tasks: ${project.tasks.map((t) => `${t.title} (${t.status})`).join(', ')}. Write a short 2-3 sentence progress summary for the team.`,
      });
      return res.text ?? '';
    } catch {
      return `Project "${project.title}" is ${total ? Math.round((done / total) * 100) : 0}% complete. ${done} of ${total} tasks are done.`;
    }
  }
}