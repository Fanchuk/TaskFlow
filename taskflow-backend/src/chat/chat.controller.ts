import { Controller, Get, Post, Delete, Body, Query, Param, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chat: ChatService) {}

  @Get()
  messages(@Req() req: any, @Query('receiverId') receiverId?: string) {
    return this.chat.messages(req.user.id, receiverId);
  }

  @Post()
  send(@Req() req: any, @Body() body: { text?: string; receiverId?: string; fileUrl?: string; fileType?: string; fileName?: string }) {
    return this.chat.send(req.user.id, body);
  }

  @Delete()
  clear(@Req() req: any, @Query('receiverId') receiverId?: string) {
    return this.chat.clear(req.user.id, receiverId);
  }

  @Delete(':id')
  deleteMessage(@Req() req: any, @Param('id') id: string) {
    return this.chat.deleteMessage(id, req.user.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('✅ Файл збережено:', file.path);
    return { url: `http://localhost:3001/uploads/${file.filename}` };
  }
}