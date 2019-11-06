import { Injectable, Query } from '@nestjs/common';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Order } from './order';
import { InjectModel } from 'nestjs-typegoose';
import { CratesService } from '../crates/crates.service';
import { Crate } from '../crates/crate';
import { ObjectID } from 'mongodb';

@Injectable()
export class OrdersService extends CrudService<Order> {
  constructor(
    @InjectModel(Order) private readonly ordersModel: ModelType<Order>,
    private readonly cratesService: CratesService,
  ) {
    super(ordersModel);
  }

  async findAveragePrice(crate_id: string): Promise<number> {
    const aggregate = await this.ordersModel.aggregate([{
      $match: {
        crate: new ObjectID(crate_id)
      }
    }, {
      $group: {
        _id:    null,
        average_price: {
          $avg: {
            $divide: [
              "$charge",
              "$quantity"
            ]
          }
        },
      }
    }]);
    if (aggregate && aggregate[0]) {
      return aggregate[0].average_price;
    } else {
      var crate: Crate = await this.cratesService.findOneById(crate_id);
      return crate.default_average_price;
    }
  }
}
