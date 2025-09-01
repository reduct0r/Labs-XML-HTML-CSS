import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService<T> {
  private readonly filePath: string = 'src/assets/dataBase.json';

  public read(): T {
    if (!fs.existsSync(this.filePath)) {
      // Если файл не существует, возвращаем пустую структуру
      return { attributes: [], complexities: [], characters: [] } as unknown as T;
    }
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as T;
  }

  public write(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}