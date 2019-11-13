import { Injectable, Query } from '@nestjs/common';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { ObjectID } from 'mongodb';
import { Order } from './order';
import { InjectModel } from 'nestjs-typegoose';
import { CratesService } from '../crates/crates.service';
import { UserLocationsService } from '../user-locations/user-locations.service';
import { Crate } from '../crates/crate';

@Injectable()
export class OrdersService extends CrudService<Order> {
  constructor(
    @InjectModel(Order) private readonly ordersModel: ModelType<Order>,
    private readonly cratesService: CratesService,
    private readonly userLocationsService: UserLocationsService,
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

  async getOrdersByBuilding(
    building_id: string
  ): Promise<Order[]> {
    var user_locations = await this.userLocationsService.findMultiple({
      building: new ObjectID(building_id),
    });

    var orders = [];
    for(var location of user_locations)
    {
      var location_orders = await this.findMultiple({
        user_location: new ObjectID(location.id),
      });
      for(var order of location_orders)
      {
        orders.push(order);
      }
    }
    if(orders.length == 0)
      return null;
    return orders;
  }
}
