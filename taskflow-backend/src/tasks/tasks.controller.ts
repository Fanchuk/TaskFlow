import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, ReorderItemDto } from './dto/task.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get()
  byProject(@Query('projectId') projectId: string) {
    return this.tasks.findByProject(projectId);
  }

  @Get('project/:projectId/members')
  projectMembers(@Param('projectId') projectId: string) {
    return this.tasks.projectMembers(projectId);
  }

  @Get(':id')
  one(@Param('id') id: string) {
    return this.tasks.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasks.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() items: ReorderItemDto[]) {
    return this.tasks.reorder(items);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(id, dto);
  }

  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.tasks.setStatus(id, status);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body('assigneeId') assigneeId: string | null) {
    return this.tasks.assign(id, assigneeId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasks.remove(id);
  }
}