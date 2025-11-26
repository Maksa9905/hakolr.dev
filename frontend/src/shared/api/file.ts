import { cookies } from '../lib'
import { ApiController, BASE_URL } from './ApiController'

export interface UploadImageResponse {
  success: boolean
  id: string
  message: string
}

export class FileApi {
  /**
   * Загрузка изображения на сервер
   * @param file - файл изображения
   * @returns URL загруженного изображения
   */
  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await ApiController.call<UploadImageResponse>(
      'file/image',
      {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies().get('token')}`,
        },
      },
    )

    return `${BASE_URL}/file/images/${response.id}.jpg`
  }

  /**
   * Удаление файла с сервера
   * @param url - URL файла для удаления
   */
  static async deleteFile(url: string): Promise<void> {
    await ApiController.call('file', {
      method: 'DELETE',
      data: { url },
      headers: {
        Authorization: `Bearer ${cookies().get('token')}`,
      },
    })
  }
}
