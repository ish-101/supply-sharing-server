import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { ConfigInjection, ConfigService } from "nestjs-dotenv";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @ConfigInjection() private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return payload;
    }
}