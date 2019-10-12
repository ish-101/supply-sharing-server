import { Module } from '@nestjs/common';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Building } from './building';
import { BuildingsService } from './buildings.service';
import { BuildingsResolver } from './buildings.resolver';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        TypegooseModule.forFeature([
            Building,
        ]),
    ],
    providers: [BuildingsService, BuildingsResolver],
    exports: [BuildingsService],
})
export class BuildingsModule {}
