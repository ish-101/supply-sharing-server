import { Module } from '@nestjs/common';
import { UserLocationService } from './user-locations.service';
import { Product } from '../products/product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { UserLocation } from './user-location';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    TypegooseModule.forFeature([
      UserLocation,
    ]),
  ],
  providers: [UserLocationService],
  exports: [UserLocationService]
})
export class UserLocationModule {}