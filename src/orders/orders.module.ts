import { Module } from '@nestjs/common';
import { Order } from './order';
import { GraphqlModule } from 'src/graphql/graphql.module';
import { DatabaseModule } from 'src/database/database.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        GraphqlModule,
        DatabaseModule,
        TypegooseModule.forFeature([
            Order,
        ]),
    ],
})
export class OrdersModule {}
