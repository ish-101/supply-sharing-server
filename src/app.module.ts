import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { DotenvModule } from './dotenv/dotenv.module';
import { OrdersModule } from './orders/orders.module';
import { UserLocationsModule } from './user-locations/user-locations.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BuildingsModule,
    OrdersModule,
    UserLocationsModule,
  ],
})
export class AppModule {}
