import { Module } from '@nestjs/common';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Location } from './location';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        UsersModule,
        TypegooseModule.forFeature([
            Location,
        ]),
    ],
    providers: [LocationsService, LocationsResolver],
    exports: [LocationsService],
})
export class LocationsModule {}
