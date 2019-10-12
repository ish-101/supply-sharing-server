import { Resolver, ResolveProperty, Query, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { Order } from './order';
import { User } from '../users/user';
import { OrdersService } from './orders.service';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { UserLocation } from '../user-locations/user-location';
import { UserLocationsService } from '../user-locations/user-locations.service';

@Resolver(of => Order)
export class OrdersResolver {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        private readonly userLocationService: UserLocationsService,
    ) {}

    @Query(returns => Order, { nullable: true })
    async getOrderById(@Args('id') id: string): Promise<Order> {
        return await this.ordersService.findOneById(id);
    }

    @ResolveProperty('user')
    async user(@Parent() order) : Promise<User> {
        return await this.usersService.findOneById(order.user);
    }

    @ResolveProperty('product')
    async product(@Parent() order) : Promise<Product> {
        return await this.productsService.findOneById(order.product);
    }

    @ResolveProperty('user_location')
    async user_location(@Parent() order) : Promise<UserLocation> {
        return await this.userLocationService.findOneById(order.user_location);
    }
}