import { Resolver, ResolveProperty, Query, Parent } from '@nestjs/graphql';
import { User } from './user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

import { UserLocation } from '../user-locations/user-location';
import { UserLocationsService } from '../user-locations/user-locations.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly userLocationsService: UserLocationsService,
    ){ }

    @Query(returns => User, { nullable: true })
    async me(
      @CurrentUser() user: User
    ): Promise<User> {
        return await this.usersService.findOneById(user.id);
    }

    @ResolveProperty('user_locations', () => [UserLocation])
    async getLocations(
      @Parent() user: User,
    ): Promise<UserLocation[]> {
      return await this.userLocationsService.getByUser(user.id);
    }
}
