import { Injectable, Query } from '@nestjs/common';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Order } from './order';
import { InjectModel } from 'nestjs-typegoose';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product';
import { ObjectID } from 'mongodb';

@Injectable()
export class OrdersService extends CrudService<Order> {
    constructor(
        @InjectModel(Order) private readonly ordersModel: ModelType<Order>,
        private readonly productsService: ProductsService
    ) {
        super(ordersModel);
    }

    async findAveragePrice(product_id: string): Promise<number> {
        const aggregate = await this.ordersModel.aggregate([
            { $match: {
                product: new ObjectID(product_id)
            }},
            { $group: {
                _id:    null,
                average_price: { $avg: { $divide: ["$total_price", "$quantity"] } },
            } }
        ]);
        console.log(aggregate);
        if (aggregate && aggregate[0]) {
            return aggregate[0].average_price;
        } else {
            const product: Product = await this.productsService.findOneById(product_id);
            return product.default_average_price;
        }
    }
}   