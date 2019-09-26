import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service'
import { Injectable } from "@nestjs/common";
import { googleKey } from "../../keys/authKeys";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: googleKey.clientID,
            clientSecret: googleKey.clientSecret,
            callbackURL: googleKey.callbackURL,
            passReqToCallback: true,
            scope: ['profile'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            const jwt = await this.authService.validateGoogleLogin(profile);
            done(null, jwt);
        }
        catch(err) {
            done(err, false);
        }
    }
}