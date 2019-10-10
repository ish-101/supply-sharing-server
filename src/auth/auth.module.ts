import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GraphqlModule } from '../graphql/graphql.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { ConfigService } from 'nestjs-dotenv';
import { KeysModule } from '../keys/keys.module';

@Module({
  imports: [
    UsersModule,
    GraphqlModule,
    PassportModule,
    KeysModule,
    JwtModule.register({
      signOptions: { expiresIn: '15d' },
      secretOrPrivateKey: (new ConfigService).get('JWT_SECRET')
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
