import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<string> {
		const jwt = await this.authService.validateLocalLogin(username, password);
		if (!jwt) {
    		throw new UnauthorizedException();
    	}
   		return jwt;
  	}
}
