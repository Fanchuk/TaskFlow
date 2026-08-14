import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttachmentsService } from './attachments.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks/:taskId/attachments')
export class AttachmentsController {
  constructor(private attachments: AttachmentsService) {}

  @Post()
  create(@Param('taskId') taskId: string, @Body() body: { name: string; size: number; mime: string }) {
    return this.attachments.create(taskId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachments.remove(id);
  }
}