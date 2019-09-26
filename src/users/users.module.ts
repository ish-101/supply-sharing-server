import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    TypegooseModule.forFeature([
      User,
    ]),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
