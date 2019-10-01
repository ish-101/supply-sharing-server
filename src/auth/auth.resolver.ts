import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { AuthService } from './auth.service';

@UseGuards(GqlAuthGuard)
@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService
	) { }

	@Query()
	async login(@Args('username') username: string, @Args('password') password: string) : Promise<any> {
		return await this.authService.validateLocalLogin(username, password);
	}

	@Mutation()
	async register() {

	}
}