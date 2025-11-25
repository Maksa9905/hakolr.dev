import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Загрузка изображения
   * POST /api/file/image
   * Требует авторизации
   */
  @Post('image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const fileId = await this.fileService.uploadFile(file, 'images');

    return {
      success: true,
      id: fileId,
      message: 'Изображение успешно загружено',
    };
  }

  /**
   * Получение файла по ID
   * GET /api/file/:fileId
   * Публичный доступ
   */
  @Get(':folder/:fileId')
  async getFile(
    @Param('folder') folder: string,
    @Param('fileId') fileId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // fileId может быть в формате "images/uuid.jpg" или "uuid.jpg"
    // Декодируем на случай, если путь закодирован
    const decodedFileId = decodeURIComponent(fileId);

    const file = await this.fileService.getFile(`${folder}/${decodedFileId}`);

    res.set({
      'Content-Type': file.contentType,
      'Content-Length': file.contentLength,
      'Cache-Control': 'public, max-age=31536000', // Кэширование на год
    });

    return new StreamableFile(file.stream);
  }

  /**
   * Удаление файла
   * DELETE /api/file
   * Требует авторизации
   */
  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Body('url') fileUrl: string) {
    await this.fileService.deleteFile(fileUrl);

    return {
      success: true,
      message: 'Файл успешно удален',
    };
  }
}
