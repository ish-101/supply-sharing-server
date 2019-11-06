import { Module, forwardRef } from '@nestjs/common';
import { Order } from './order';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { CratesModule } from '../crates/crates.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { UserLocationsModule } from '../user-locations/user-locations.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        forwardRef(() => CratesModule),
        forwardRef(() => ProductsModule),
        UserLocationsModule,
        UsersModule,
        TypegooseModule.forFeature([
            Order,
        ]),
    ],
    providers: [OrdersService, OrdersResolver],
    exports: [OrdersService]
})
export class OrdersModule {}
