import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  constructor(private prisma: PrismaService) {}

  async generateTasks(title: string, desc: string): Promise<string[]> {
    const res = await this.ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: `Project: "${title}". Description: "${desc}".
Generate 5-7 concrete tasks. Return ONLY a JSON array of strings, no other text. Example: ["Task 1", "Task 2"]`,
    });
    const text = (res.text ?? '[]').replace(/```json|```/g, '').trim();
    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  }

  async summarizeProgress(projectId: string): Promise<string> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });
    if (!project) return 'Project not found';

    const done = project.tasks.filter(t => t.status === 'done').length;
    const total = project.tasks.length;

    try {
      const res = await this.ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: `Project "${project.title}": ${done} of ${total} tasks done.
Tasks: ${project.tasks.map(t => `${t.title} (${t.status})`).join(', ')}.
Write a short 2-3 sentence progress summary for the team.`,
      });
      return res.text ?? '';
    } catch {
      return 'AI is busy right now, please try again in a moment.';
    }
  }
}