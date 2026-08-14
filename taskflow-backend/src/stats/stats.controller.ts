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
}