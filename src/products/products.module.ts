import { Module, forwardRef } from '@nestjs/common';
import { Product } from './product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        forwardRef(() => OrdersModule),
        TypegooseModule.forFeature([
            Product,
        ]),
    ],
    providers: [ProductsService, ProductsResolver],
    exports: [ProductsService]
})
export class ProductsModule {}
