import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';

import { CratesService } from './crates.service';
import { Crate } from './crate';

@UseGuards(GqlAuthGuard)
@Resolver(of => Crate)
export class CratesResolver {
  constructor(
    private readonly cratesService: CratesService,
    private readonly productsService: ProductsService,
  ) {}

  @Mutation(returns => String, { nullable: true })
  async createCrate(
    @Args('product_id') product_id: string,
    @Args('quantity') quantity: number,
    @Args('default_average_price') default_average_price: number,
  ): Promise<string> {
    if(await this.productsService.findOneById(product_id) == null)
      return null;
    return (await this.cratesService.createOne({
      product: new ObjectID(product_id),
      quantity: quantity,
      default_average_price: default_average_price,
    })).id;
  }

  @Query(returns => Crate, { nullable: true })
  async getCrate(
    @Args('id') id: string,
  ): Promise<Crate> {
    return await this.cratesService.findOneById(id);
  }

  @Mutation(returns => Boolean, { nullable: false })
  async deleteCrate(
    @Args('id') id: string,
  ): Promise<boolean> {
    var crate = await this.cratesService.deleteOneById(id);
    return (crate != null);
  }

  @ResolveProperty(returns => Product, { nullable: false })
  async product(
    @Parent() crate: Crate
  ): Promise<Product> {
    return await this.productsService.findOneById(crate.product);
  }
}
