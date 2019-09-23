import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationModule } from './location/location.module';
import { ProductModule } from './product/product.module';
import { LocationsModule } from './locations/locations.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, LocationModule, ProductModule, LocationsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
