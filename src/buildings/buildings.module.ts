import { Module, forwardRef } from '@nestjs/common';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { Building } from './building';
import { BuildingsService } from './buildings.service';
import { BuildingsResolver } from './buildings.resolver';
import { OrdersModule } from '../orders/orders.module';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
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
