import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-dotenv';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ]
})
export class KeysModule {}