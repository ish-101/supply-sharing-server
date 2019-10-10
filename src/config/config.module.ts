import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { DotenvModule } from '../dotenv/dotenv.module';
import { DotenvService } from '../dotenv/dotenv.service';

@Module({
  imports: [DotenvModule],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}