import {
  Module,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { ImagesController } from './images.controller';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    MulterModule.register({
      dest: './media',
    }),
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
