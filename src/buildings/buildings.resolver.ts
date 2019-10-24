import { Resolver, ResolveProperty, Mutation, Query, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

import { Building } from './building';
import { BuildingsService } from './buildings.service';
import { CreateBuildingInput } from './dto/create-building.input';

@UseGuards(GqlAuthGuard)
@Resolver(of => Building)
export class BuildingsResolver {
  constructor(
    private readonly buildingsService: BuildingsService,
  ) { }

  @Mutation(returns => String, { nullable: true })
  async createBuilding(
    @Args('data', new ValidationPipe()) data: CreateBuildingInput
  ): Promise<string> {
    var building = await this.buildingsService.createBuilding(data);
    if(building != null)
      return building.id;
    return null;
  }

  @Query(returns => [Building], { nullable: true })
  async getXNearestBuildingsByLocation(
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
    @Args('radius') radius: number,
    @Args('x') x: number,
  ): Promise<Building[]> {
    return await this.buildingsService.getXClosestBuildings(
      latitude, longitude, radius, x,
    );
  }
  @Query(returns => [Building], { nullable: true })
  async getXNearestBuildingsByBuilding(
    @Args('building_id') building_id: string,
    @Args('radius') radius: number,
    @Args('x') x: number,
  ): Promise<Building[]> {
    var building = await this.buildingsService.findOneById(
      new ObjectID(building_id)
    );
    return await this.buildingsService.getXClosestBuildings(
      building.latitude,
      building.longitude,
      radius, x,
    );
  }
}
