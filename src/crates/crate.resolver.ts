import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { OrdersService } from '../orders/orders.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Product } from './product';

@UseGuards(GqlAuthGuard)
@Resolver(of => Crate)
export class CratesResolver {
  constructor(
    private readonly productsService: ProductsService,
  ) {}
}
