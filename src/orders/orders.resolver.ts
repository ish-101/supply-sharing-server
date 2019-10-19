import { Resolver, ResolveProperty, Query, Mutation, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { Order } from './order';
import { User } from '../users/user';
import { OrdersService } from './orders.service';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
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
        private readonly productsService: ProductsService,
        private readonly userLocationService: UserLocationsService,
    ) {}

    @Mutation(returns => String)
    async placeOrder(
        @CurrentUser() user: User,
        @Args('data', new ValidationPipe()) dto: CreateOrderInput
    ): Promise<string> {
        return (await this.ordersService.createOne({ ...dto, user: user.id })).id;
    }

    @Mutation(returns => Boolean)
    async fulfillOrder(
        @Args('id') id: String,
        @Args('total_price') total_price: Number
    ): Promise<boolean> {
        const order: Order = await this.ordersService.findOneById(id);
        if (!order.fulfilled) {
            await this.ordersService.updateOneById(id, { total_price, fulfilled: true });
            return true;
        } else {
            return false;
        }
    }

    @Query(returns => [Order], { nullable: true })
    async getMyOrders(@CurrentUser() user: User): Promise<Order[]> {
        return await this.ordersService.findMultiple({ user: user.id });
    }

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
