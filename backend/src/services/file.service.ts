import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { createS3Client, s3Config } from '../config/s3.config';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private s3Client = createS3Client();

  /**
   * Загружает файл в S3 хранилище
   * @param file - файл для загрузки (из multer)
   * @param folder - папка в bucket (опционально)
   * @returns ID загруженного файла
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('Файл не предоставлен');
    }

    // Проверка типа файла (только изображения)
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Неподдерживаемый тип файла. Разрешены только изображения.',
      );
    }

    // Проверка размера файла (макс 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Размер файла превышает 5MB');
    }

    // Генерация уникального имени файла
    const fileId = uuidv4();

    const fileExtension = this.getFileExtension(file.originalname);
    const fileName = `${folder}/${fileId}${fileExtension}`;

    try {
      // Загрузка файла в S3
      const command = new PutObjectCommand({
        Bucket: s3Config.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Публичный доступ к файлу (если поддерживается)
      });

      await this.s3Client.send(command);

      return fileId;
    } catch (error) {
      console.error('Ошибка загрузки файла в S3:', error);
      throw new BadRequestException('Ошибка при загрузке файла');
    }
  }

  /**
   * Удаляет файл из S3 хранилища
   * @param fileUrl - URL файла для удаления
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Извлечение ключа файла из URL
      const fileName = this.extractFileKeyFromUrl(fileUrl);

      if (!fileName) {
        throw new BadRequestException('Некорректный URL файла');
      }

      const command = new DeleteObjectCommand({
        Bucket: s3Config.bucket,
        Key: fileName,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.error('Ошибка удаления файла из S3:', error);
      throw new BadRequestException('Ошибка при удалении файла');
    }
  }

  /**
   * Получает расширение файла
   */
  private getFileExtension(filename: string): string {
    const match = filename.match(/\.[^.]+$/);
    return match ? match[0] : '';
  }

  /**
   * Получает файл из S3 по его ключу
   * @param fileKey - ключ файла в S3 (например, "images/uuid.jpg")
   * @returns объект с потоком данных и метаданными
   */
  async getFile(
    fileKey: string,
  ): Promise<{ stream: Readable; contentType: string; contentLength: number }> {
    try {
      const command = new GetObjectCommand({
        Bucket: s3Config.bucket,
        Key: fileKey,
      });

      const response = await this.s3Client.send(command);

      if (!response.Body) {
        throw new NotFoundException('Файл не найден');
      }

      return {
        stream: response.Body as Readable,
        contentType: response.ContentType || 'application/octet-stream',
        contentLength: response.ContentLength || 0,
      };
    } catch (error) {
      console.error('Ошибка получения файла из S3:', error);
      throw new NotFoundException('Файл не найден');
    }
  }

  /**
   * Извлекает ключ файла из URL
   */
  private extractFileKeyFromUrl(fileUrl: string): string | null {
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/').filter((part) => part);

      // Удаляем bucket из пути, если он есть
      if (pathParts[0] === s3Config.bucket) {
        pathParts.shift();
      }

      return pathParts.join('/');
    } catch {
      return null;
    }
  }
}
