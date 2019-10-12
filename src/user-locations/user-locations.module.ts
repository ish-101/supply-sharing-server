import { Module } from '@nestjs/common';
import { UserLocationsService } from './user-locations.service';
import { UserLocationsResolver } from './user-locations.resolver';
import { Product } from '../products/product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { BuildingsModule } from '../buildings/buildings.module';
import { UserLocation } from './user-location';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    TypegooseModule.forFeature([
      UserLocation,
    ]),
    BuildingsModule,
  ],
  providers: [UserLocationsService, UserLocationsResolver],
  exports: [UserLocationsService]
})
export class UserLocationModule {}
