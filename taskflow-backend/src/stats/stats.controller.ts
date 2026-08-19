import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StatsService } from './stats.service';

@UseGuards(JwtAuthGuard)
@Controller('stats')
export class StatsController {
  constructor(private stats: StatsService) {}

  @Get('status')
  status(@Req() req: any) {
    return this.stats.statusOverview(req.user.id);
  }

  @Get('task-done')
  taskDone(@Req() req: any, @Query('period') period = 'monthly') {
    return this.stats.taskDone(req.user.id, period);
  }

  @Get('overview')
  overview(@Req() req: any) {
    return this.stats.overview(req.user.id);
  }

  @Get('productivity')
  productivity(@Req() req: any) {
    return this.stats.productivity(req.user.id);
  }

  @Get('deadlines')
  deadlines(@Req() req: any) {
    return this.stats.deadlines(req.user.id);
  }

  @Get('priorities')
  priorities(@Req() req: any) {
    return this.stats.priorities(req.user.id);
  }

  @Get('activity')
  activity(@Req() req: any) {
    return this.stats.recentActivity(req.user.id);
  }

  @Get('my-tasks')
  myTasks(@Req() req: any) {
    return this.stats.myTasks(req.user.id);
  }
}