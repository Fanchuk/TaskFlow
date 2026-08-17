import { Body, Controller, Delete, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesService } from './files.service';

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private files: FilesService) {}

  @Get('folders')
  folders(@Req() req: any) {
    return this.files.folders(req.user.id);
  }

  @Get('recent')
  recent(@Req() req: any) {
    return this.files.recent(req.user.id);
  }

  @Get('storage')
  storage(@Req() req: any) {
    return this.files.storage(req.user.id);
  }

  @Post('folders')
  createFolder(@Req() req: any, @Body() body: { name: string; color?: string }) {
    return this.files.createFolder(req.user.id, body);
  }

  @Post()
  createFile(@Req() req: any, @Body() body: { name: string; size: number; mime: string; folderId?: string }) {
    return this.files.createFile(req.user.id, body);
  }

  @Delete(':id')
  deleteFile(@Param('id') id: string, @Req() req: any) {
    return this.files.deleteFile(id, req.user.id);
  }
}