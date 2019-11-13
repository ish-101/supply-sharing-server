import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { CratesModule } from './crates/crates.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UserLocationsModule } from './user-locations/user-locations.module';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BuildingsModule,
    OrdersModule,
    UserLocationsModule,
    CratesModule,
    ProductsModule,
  ],
})
export class AppModule {}
