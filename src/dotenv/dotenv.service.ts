import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DotenvService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = {};
    if (fs.existsSync(filePath)) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
  }

  get(key: string): string {
    return this.envConfig[key] || process.env[key];
  }
}