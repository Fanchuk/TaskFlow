import { Body, Controller, Post, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private ai: AiService) {}

  @Post('generate-tasks')
  generateTasks(@Body() body: { title: string; desc: string }) {
    return this.ai.generateTasks(body.title, body.desc);
  }

  @Post('summarize/:projectId')
  summarize(@Param('projectId') projectId: string) {
    return this.ai.summarizeProgress(projectId);
  }
}