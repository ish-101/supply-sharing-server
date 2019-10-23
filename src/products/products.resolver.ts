import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { OrdersService } from '../orders/orders.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Product } from './product';

@UseGuards(GqlAuthGuard)
@Resolver(of => Product)
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersService: OrdersService
    ) {}
    
    @Query(returns => Product)
    async getProductById(@Args('id') id: string): Promise<Product> {
        return await this.productsService.findOneById(id);
    }

    @ResolveProperty()
    async average_price(@Parent() product: Product): Promise<number> {
        return await this.ordersService.findAveragePrice(product.id);
    }
}