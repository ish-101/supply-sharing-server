import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserInput } from '../users/dto/register-user.input';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService
	) { }

	@Query(returns => String, { nullable: true })
	async login(
		@Args('username') username: string,
		@Args('password') password: string
	): Promise<string> {
		return await this.authService.validateLocalLogin(username, password);
	}

	@Mutation(returns => String)
	async registerUser(
		@Args('data', new ValidationPipe())data: RegisterUserInput
	): Promise<string> {
		return await this.authService.registerLocalUser(data);
	}
}
