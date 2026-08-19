import { Controller, Get, Patch, Delete, Req, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from './admin.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  getAll() {
    return this.users.getAll();
  }

  @Patch('me')
  updateMe(
    @Req() req: any,
    @Body() body: { fullName?: string; email?: string; currentPassword?: string; newPassword?: string }
  ) {
    return this.users.updateMe(req.user.id, body);
  }

  @Delete('me')
  deleteMe(@Req() req: any) {
    return this.users.deleteMe(req.user.id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/role')
  updateRole(@Req() req: any, @Param('id') id: string, @Body() body: { role: string }) {
    return this.users.updateRole(id, body.role, req.user.id);
  }
}