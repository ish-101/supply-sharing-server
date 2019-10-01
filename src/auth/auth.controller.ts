import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/user';
import { googleConstants } from './constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('google'))
    @Get('google')
    googleLogin() {
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    googleLoginCallback(@Req() req, @Res() res) {
        const access_token = req.user.access_token;
        if (access_token) {
            res.redirect(googleConstants.successURL + '/' + access_token);
        }
        else {
            res.redirect(googleConstants.failureURL);
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        return this.authService.validateLocalLogin(req.body.username, req.body.password);
    }

    @Post('register')
    async register(@Req() req) {
        return this.authService.registerLocalUser(req.body);
    }
}
