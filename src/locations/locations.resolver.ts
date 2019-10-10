import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { User } from '../users/user';
import { UsersService } from '../users/users.service';

import { Location } from './location';
import { LocationsService } from './locations.service';
import { CreateLocationInput } from './dto/createLocation.input';

@UseGuards(GqlAuthGuard)
@Resolver(of => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService,
  ) { }

  @Mutation(returns => Location, { nullable: true })
  async joinAptDormLocation(@CurrentUser() user: User,
    @Args('location_id') location_id: string): Promise<Location> {
    var location = await this.locationsService.findOneById(location_id);
    if(location != null)
    {
      await this.usersService.joinLocation(user.id, location);
    }
    return location;
  }

  @Mutation(returns => Location, { nullable: true })
  async createLocation(@Args('data', new ValidationPipe())
    data: CreateLocationInput): Promise<Location> {
    // literally no need to divy between home/apartment/dorm
    return await this.locationsService.createLocation(data);
  }

  /*
  // this function automatically joins the location when done creating
  @Mutation(returns => Location)
  async createHomeLocation(@CurrentUser() user: User,
    @Args('data', new ValidationPipe())
    data: CreateLocationInput): Promise<Location> {
    return null;
  }*/
}
