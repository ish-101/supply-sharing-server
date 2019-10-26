import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { Product } from '../products/product';

import { CratesService } from './crates.service';
import { Crate } from './crate';

@UseGuards(GqlAuthGuard)
@Resolver(of => Crate)
export class CratesResolver {
  constructor(
    private readonly cratesService: CratesService,
  ) {}

  @Mutation(returns => String, { nullable: true })
  async createCrate(
    @Args('product_id') product_id: string,
    @Args('quantity') quantity: number,
  ): Promise<string> {
    return (await this.cratesService.createOne({
      product: new ObjectID(product_id),
      quantity: quantity,
    })).id;
  }
}
