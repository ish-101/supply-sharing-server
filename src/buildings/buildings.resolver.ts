import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { Building } from './building';
import { BuildingsService } from './buildings.service';
import { CreateBuildingInput } from './dto/createBuilding.input';

@UseGuards(GqlAuthGuard)
@Resolver(of => Building)
export class BuildingsResolver {
  constructor(
    private readonly buildingsService: BuildingsService,
  ) { }

  @Mutation(returns => Building, { nullable: true })
  async createBuilding(@Args('data', new ValidationPipe())
    data: CreateBuildingInput): Promise<Building> {
    // literally no need to divy between home/apartment/dorm
    return await this.buildingsService.createBuilding(data);
  }
}
