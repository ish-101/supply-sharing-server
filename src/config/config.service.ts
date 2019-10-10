import { DotenvService } from "../dotenv/dotenv.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  constructor(private readonly dotenvService: DotenvService) {}

  get(key: string): string {
    return this.dotenvService.get(key);
  }
}