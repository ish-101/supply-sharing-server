import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user';
import { UsersResolver } from './users.resolver';

import { UserLocationsModule } from '../user-locations/user-locations.module';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    UserLocationsModule,
    TypegooseModule.forFeature([
      User,
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
