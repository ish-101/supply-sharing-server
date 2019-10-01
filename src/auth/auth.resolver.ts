import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService
	) { }
	
    @UseGuards(AuthGuard('local'))
	@Query(returns => String, { nullable: true })
	async login(@Args('username') username: string, @Args('password') password: string) : Promise<string> {
		return await this.authService.validateLocalLogin(username, password);
	}

	/* @Mutation()
	async register() {

	} */
}