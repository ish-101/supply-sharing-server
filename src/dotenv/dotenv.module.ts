import { Module } from '@nestjs/common';
import { DotenvService } from './dotenv.service';

@Module({
  providers: [
    {
      provide: DotenvService,
      useValue: new DotenvService('.env')
    },
  ],
  exports: [DotenvService],
})
export class DotenvModule {}