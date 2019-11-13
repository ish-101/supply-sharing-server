import {
  Module,
} from '@nestjs/common';
import { ImagesController } from './images.controller';

import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
  ],
  controllers: [ImagesController],
})
export class ImagesModule {}
