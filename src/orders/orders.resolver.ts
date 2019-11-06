import { Resolver, ResolveProperty, Query, Mutation, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { Order } from './order';
import { User } from '../users/user';
import { OrdersService } from './orders.service';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { CratesService } from '../crates/crates.service';
import { UserLocation } from '../user-locations/user-location';
import { UserLocationsService } from '../user-locations/user-locations.service';
import { CreateOrderInput } from './dto/create-order.input';
import { ValidationPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(of => Order)
export class OrdersResolver {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly usersService: UsersService,
        private readonly cratesService: CratesService,
        private readonly userLocationService: UserLocationsService,
    ) {}

    @Mutation(returns => String)
    async placeOrder(
      @CurrentUser() user: User,
      @Args('data', new ValidationPipe()) data: CreateOrderInput
    ): Promise<string> {
      var average_price = await this.ordersService.findAveragePrice(data.crate);

      return (await this.ordersService.createOne({
        ...data,
        user: user.id,
        charge: average_price,
      })).id;
    }

    @Query(returns => [Order], { nullable: true })
    async getMyOrders(@CurrentUser() user: User): Promise<Order[]> {
        return await this.ordersService.findMultiple({ user: user.id });
    }

    @Query(returns => Order, { nullable: true })
    async getOrderById(@Args('id') id: string): Promise<Order> {
        return await this.ordersService.findOneById(id);
    }

    @Query(returns => [Order], { nullable: true })
    async getOrdersByLocation(
      @Args('user_location_id') user_location_id: string,
      @Args('product_id') product_id: string
    ): Promise<Order[]> {
      // find user location by id
      // get the orders by the user_location
      // narrow it down by product_id, if provided
      return null;
    }

    @ResolveProperty('user')
    async user(@Parent() order) : Promise<User> {
        return await this.usersService.findOneById(order.user);
    }

    @ResolveProperty('user_location')
    async user_location(@Parent() order) : Promise<UserLocation> {
        return await this.userLocationService.findOneById(order.user_location);
    }
}
