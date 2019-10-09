import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LocationsModule,
  ],
})
export class AppModule {}
