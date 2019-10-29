import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ObjectID } from 'mongodb';
import { UseGuards } from '@nestjs/common';

import { Product } from './product';
import { ProductsService } from './products.service';

import { Crate } from '../crates/crate';
import { CreateProductInput } from './dto/create-product.input';
import { CratesService } from '../crates/crates.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cratesService: CratesService,
  ) {}

  @Query(returns => Product, { nullable: true })
  async getProductById(
    @Args('id') id: string
  ): Promise<Product> {
    return await this.productsService.findOneById(id);
  }

  @Mutation(returns => String, { nullable: true })
  async createProduct(
    @Args('data', new ValidationPipe()) data: CreateProductInput,
  ): Promise<string> {
    return (await this.productsService.createOne(data)).id;
  }

  @Mutation(returns => Boolean, { nullable: false })
  async deleteProduct(
    @Args('product_id') product_id: string,
  ): Promise<boolean> {
    await this.cratesService.deleteByProduct(product_id);
    return (
      await this.productsService.deleteOneById(product_id) != null
    );
  }

  @ResolveProperty('crates', () => [Crate])
  async crates(
    @Parent() product: Product,
  ): Promise<Crate[]> {
    return await this.cratesService.findMultiple({
      product: new ObjectID(product.id),
    });
  }

  @ResolveProperty('average_price', () => Number)
  async average_price(
    @Parent() product: Product,
  ): Promise<number> {
    var crates = await this.cratesService.findMultiple({
      product: new ObjectID(product.id),
    });

    var sum = 0;
    var count = 0;
    for(var crate of crates)
    {
    }

    return 0;
  }
}
