import { Module, forwardRef } from '@nestjs/common';
import { Product } from './product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { CratesModule } from '../crates/crates.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        forwardRef(() => OrdersModule),
        forwardRef(() => CratesModule),
        TypegooseModule.forFeature([
            Product,
        ]),
    ],
    providers: [ProductsService, ProductsResolver],
    exports: [ProductsService]
})
export class ProductsModule {}
