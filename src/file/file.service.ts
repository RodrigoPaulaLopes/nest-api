import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async upload(photo: Express.Multer.File) {
    const result = await writeFile(
      join(__dirname, '..', '..', 'storage', 'photos', `photo.png`),
      photo.buffer,
    );

    return result
  }
}
