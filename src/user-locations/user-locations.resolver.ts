import { Resolver, ResolveProperty, Mutation, Query, Args, Parent } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { UserLocation } from './user-location';
import { UserLocationsService } from './user-locations.service';

import { BuildingsService } from '../buildings/buildings.service';
import { Building } from '../buildings/building';
import { CreateBuildingInput } from '../buildings/dto/create-building.input';

import { User } from '../users/user';

@UseGuards(GqlAuthGuard)
@Resolver(of => UserLocation)
export class UserLocationsResolver {
  constructor(
    private readonly userLocationsService: UserLocationsService,
    private readonly buildingsService: BuildingsService,
  ) { }

  @Mutation(returns => String, { nullable: true })
  async createUserLocation(
    @CurrentUser() user: User,
    @Args('personal_name') personal_name: string,
    @Args('room_number') room_number: string,
    @Args('building_id') building_id: string,
  ): Promise <string> {
    var building = await this.buildingsService.findOneById(building_id);
    if(building != null && building.type != 'home')
    {
      return (await this.userLocationsService.createOne({
        personal_name: personal_name,
        room_number: room_number,
        user: user.id,
        building: building_id,
      })).id;
    }
    return null;
  }

  @ResolveProperty('building', () => Building, { nullable: true })
  async building(
    @Parent() userLocation: UserLocation,
  ): Promise<Building> {
    return await this.buildingsService.findOneById(userLocation.building);
  }
}
