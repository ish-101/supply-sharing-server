import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { google } from 'apollo-engine-reporting-protobuf';
import { bcryptConstants } from './constants';
import { hash as hashPassword, compare as comparePassword } from  'bcrypt';
import { User } from 'src/users/user';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateGoogleLogin(profile) {
        let user = await this.usersService.findOneByGoogleId(profile.id);
        const googleData = { googleId: profile.id, name: profile.name };
        if (user) {
            await this.usersService.updateOneById(user.id, googleData);        
        } else {
            user = await this.usersService.createOne({
                googleId: googleData.googleId,
                name: googleData.name,
            });
        }
        const payload = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateLocalLogin(username: string, password: string): Promise<string> {
        const user = await this.usersService.findOneByUsername(username);
        if (user) {
            const passwordsMatch = await comparePassword(password, user.password);
            if (passwordsMatch) {
                const payload = { id: user.id };
                return this.jwtService.sign(payload);
            }
        }
        return null;
    }

    async registerLocalUser(userData: User): Promise<any> {
        try {
            const hashResult = await hashPassword(userData.password, bcryptConstants.saltRounds);
            userData.password = hashResult;
            const user = await this.usersService.createOne(userData);
            return user.username;
        } catch(err) {
            return err;
        }
    }
}
