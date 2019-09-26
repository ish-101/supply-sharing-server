import { Resolver, ResolveProperty, Parent, Root, Query } from '@nestjs/graphql';
import { User } from './user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Query(returns => User, { nullable: true })
    async me(@CurrentUser() user: User): Promise<User> {
        return await this.usersService.findOneById(user.id);
    }
}