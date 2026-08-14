import { Body, Controller, Delete, Param, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private comments: CommentsService) {}

  @Post()
  create(@Param('taskId') taskId: string, @Req() req: any, @Body('body') body: string) {
    return this.comments.create(taskId, req.user.id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comments.remove(id);
  }
}