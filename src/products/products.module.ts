import { Module } from '@nestjs/common';
import { Product } from './product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { ProductsService } from './products.service';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        TypegooseModule.forFeature([
            Product,
        ]),
    ],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
