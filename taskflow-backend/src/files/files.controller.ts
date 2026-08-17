import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Req } from '@nestjs/common';
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
  recent(@Req() req: any, @Query('folderId') folderId?: string) {
    return this.files.recent(req.user.id, folderId);
  }

  @Get('storage')
  storage(@Req() req: any) {
    return this.files.storage(req.user.id);
  }

  @Get('all')
  allFiles(@Req() req: any, @Query('folderId') folderId?: string) {
    return this.files.allFiles(req.user.id, folderId);
  }

  @Get('starred')
  starred(@Req() req: any) {
    return this.files.starred(req.user.id);
  }

  @Get('trash')
  trash(@Req() req: any) {
    return this.files.trash(req.user.id);
  }

  @Get('activity')
  activity(@Req() req: any) {
    return this.files.activity(req.user.id);
  }

  @Get('stats')
  stats(@Req() req: any) {
    return this.files.stats(req.user.id);
  }

  @Get('folder/:folderId')
  folderFiles(@Param('folderId') folderId: string, @Req() req: any) {
    return this.files.folderFiles(req.user.id, folderId);
  }

  @Get('folder/:folderId/info')
  folderInfo(@Param('folderId') folderId: string, @Req() req: any) {
    return this.files.folderById(req.user.id, folderId);
  }

  @Post('folders')
  createFolder(@Req() req: any, @Body() body: { name: string; color?: string }) {
    return this.files.createFolder(req.user.id, body);
  }

  @Post()
  createFile(@Req() req: any, @Body() body: { name: string; size: number; mime: string; folderId?: string }) {
    return this.files.createFile(req.user.id, body);
  }

  @Post(':id/share')
  share(@Param('id') id: string, @Body('userId') userId: string, @Req() req: any) {
    return this.files.shareFile(id, req.user.id, userId);
  }

  @Patch(':id/star')
  toggleStar(@Param('id') id: string, @Req() req: any) {
    return this.files.toggleStar(id, req.user.id);
  }

  @Patch(':id/rename')
  rename(@Param('id') id: string, @Body('name') name: string, @Req() req: any) {
    return this.files.renameFile(id, req.user.id, name);
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @Body('folderId') folderId: string | null, @Req() req: any) {
    return this.files.moveFile(id, req.user.id, folderId);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string, @Req() req: any) {
    return this.files.restore(id, req.user.id);
  }

  @Delete('trash/empty')
  emptyTrash(@Req() req: any) {
    return this.files.emptyTrash(req.user.id);
  }

  @Delete(':id/share/:userId')
  unshare(@Param('id') id: string, @Param('userId') userId: string, @Req() req: any) {
    return this.files.unshareFile(id, req.user.id, userId);
  }

  @Delete(':id/permanent')
  permanentDelete(@Param('id') id: string, @Req() req: any) {
    return this.files.permanentDelete(id, req.user.id);
  }

  @Delete(':id')
  deleteFile(@Param('id') id: string, @Req() req: any) {
    return this.files.deleteFile(id, req.user.id);
  }
}