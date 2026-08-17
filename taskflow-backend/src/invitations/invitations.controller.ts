import { Body, Controller, Get, Patch, Post, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationsService } from './invitations.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@UseGuards(JwtAuthGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(private invitations: InvitationsService) {}

  @Get()
  findAll() {
    return this.invitations.findAll();
  }

  @Post()
  create(@Body() body: CreateInvitationDto) {
    return this.invitations.create(body);
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string) {
    return this.invitations.accept(id);
  }
}