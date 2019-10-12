import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { google } from 'apollo-engine-reporting-protobuf';
import { bcryptConstants } from './constants';
import { hash as hashPassword, compare as comparePassword } from 'bcrypt';
import { User } from '../users/user';
import { RegisterUserInput } from '../users/dto/register-user.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateLocalLogin(username: string, password: string): Promise<string> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.verified) {
            const passwordsMatch = await comparePassword(password, user.password);
            if (passwordsMatch) {
                const payload = { id: user.id };
                return this.jwtService.sign(payload);
            }
        }
        return null;
    }

    async registerLocalUser(userData: RegisterUserInput): Promise<string> {
        const hashResult = await hashPassword(userData.password, bcryptConstants.saltRounds);
        userData.password = hashResult;
        const createdUser = await this.usersService.createOne(userData);
        return createdUser.id;
    }
}
