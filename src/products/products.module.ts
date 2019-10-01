import { Module } from '@nestjs/common';
import { Product } from './product';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from 'src/database/database.module';
import { GraphqlModule } from 'src/graphql/graphql.module';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        TypegooseModule.forFeature([
            Product,
        ]),
    ],
})
export class ProductsModule {}
