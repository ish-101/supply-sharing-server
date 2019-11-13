import { Resolver, ResolveProperty, Query, Mutation, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { Order } from './order';
import { User } from '../users/user';
import { OrdersService } from './orders.service';
import { ObjectID } from 'mongodb';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { CratesService } from '../crates/crates.service';
import { Crate } from '../crates/crate';
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
        user_location: new ObjectID(data.user_location),
        user: new ObjectID(user.id),
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
    async getOrdersByBuilding(
      @Args('building_id') building_id: string,
    ): Promise<Order[]> {
      return await this.ordersService.getOrdersByBuilding(building_id);
    }

    @ResolveProperty('user')
    async user(@Parent() order) : Promise<User> {
        return await this.usersService.findOneById(order.user);
    }

    @ResolveProperty('user_location')
    async user_location(@Parent() order) : Promise<UserLocation> {
        return await this.userLocationService.findOneById(order.user_location);
    }

    @ResolveProperty('crate')
    async crate(@Parent() order: Order): Promise<Crate> {
      return await this.cratesService.findOneById(order.crate);
    }
}
