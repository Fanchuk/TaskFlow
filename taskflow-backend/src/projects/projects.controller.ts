import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.projects.findAll(req.user.id);
  }

  @Get(':id/overview')
  overview(@Req() req: any, @Param('id') id: string) {
    return this.projects.overview(req.user.id, id);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.projects.findOne(req.user.id, id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateProjectDto) {
    return this.projects.create(req.user.id, dto);
  }
}