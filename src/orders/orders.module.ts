import { Module } from '@nestjs/common';
import { Order } from './order';
import { GraphqlModule } from '../graphql/graphql.module';
import { DatabaseModule } from '../database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { UserLocationModule } from '../user-locations/user-locations.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        UsersModule,
        ProductsModule,
        UserLocationModule,
        TypegooseModule.forFeature([
            Order,
        ]),
    ],
    providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
