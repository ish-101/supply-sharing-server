import { Injectable, Query } from '@nestjs/common';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Order } from './order';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class OrdersService extends CrudService<Order> {
    constructor(@InjectModel(Order) private readonly ordersModel: ModelType<Order>) {
        super(ordersModel);
    }
}