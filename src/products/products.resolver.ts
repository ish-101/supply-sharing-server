import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CratesService } from '../crates/crates.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ObjectID } from 'mongodb';
import { UseGuards } from '@nestjs/common';
import { Product } from './product';
import { Crate } from '../crates/crate';

@UseGuards(GqlAuthGuard)
@Resolver(of => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cratesService: CratesService,
  ) {}

  @Query(returns => Product)
  async getProductById(
    @Args('id') id: string
  ): Promise<Product> {
    return await this.productsService.findOneById(id);
  }

  @ResolveProperty('crates', () => [Crate])
  async crates(
    @Parent product: Product,
  ): Promise<Crate[]> {
    return await this.cratesService.findMultiple({
      product: new ObjectID(product.id),
    });
  }

  @ResolveProperty('average_price', () => Number)
  async average_price(
    @Parent product: Product,
  ): Promise<number> {
    var crates = await this.cratesService.findMultiple({
      product: new ObjectID(product.id),
    });

    var sum = 0;
    var count = 0;
    for(var crate of crates)
    {
      this.cratesServic
    }

    return 0;
  }
}
