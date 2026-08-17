import { Body, Controller, Get, Patch, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Patch('me')
  updateMe(@Req() req: any, @Body() body: { fullName?: string; email?: string }) {
    return this.users.updateMe(req.user.id, body);
  }

  @Patch('me/settings')
  updateSettings(@Req() req: any, @Body() settings: any) {
    return this.users.updateSettings(req.user.id, settings);
  }

  @Delete('me')
  deleteMe(@Req() req: any) {
    return this.users.deleteMe(req.user.id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/role')
  updateRole(@Req() req: any, @Param('id') id: string, @Body('role') role: string) {
    return this.users.updateRole(id, role, req.user.id);
  }
}