import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';

import { Location } from './location';
import { LocationsService } from './locations.service';
import { CreateLocationInput } from './dto/createLocation.input';

@Resolver(of => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
  ) { }

  /*@Mutation(returns => Boolean)
  async joinApartmentLocation(@Args('location_id')
    id: string): Promise<Boolean> {

  }*/

  @Mutation(returns => Location)
  async createApartmentLocation(@Args('data', new ValidationPipe())
    data: CreateLocationInput): Promise<Location> {
    return await this.locationsService.createApartmentLocation(data);
  }

  @Mutation(returns => Location)
  async createDormLocation(@Args('data', new ValidationPipe())
    data: CreateLocationInput): Promise<Location> {
    return await this.locationsService.createDormLocation(data);
  }

  /*@Mutation(returns => Number)
  async createHomeLocation(@Args('data', new ValidationPipe())
    data: CreateLocation): Promise<Number> {
    return await this.locationsService.createHomeLocation();
  }*/
  // what kind of resolvers would we need for location?
}
