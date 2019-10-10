import { Resolver, ResolveProperty, Query, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { Order } from './order';
import { User } from 'src/users/user';
import { OrdersService } from './orders.service';

@Resolver(of => Order)
export class OrdersResolver {

    constructor(
        private readonly ordersService: OrdersService,
        private readonly usersService: UsersService
    ) {}

    @Query(returns => Order)
    async getOrderById(@Args('id') id: string): Promise<Order> {
        return await this.ordersService.findOneById(id);
    }

    @ResolveProperty('user')
    async user(@Parent() order) : Promise<User> {
        return await this.usersService.findOneById(order.user);
    }
}
