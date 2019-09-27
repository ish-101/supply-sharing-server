import { Module } from '@nestjs/common';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Location } from './location';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        TypegooseModule.forFeature([
            Location,
        ]),
    ],
    providers: [],
    exports: [],
})
export class LocationsModule {}
