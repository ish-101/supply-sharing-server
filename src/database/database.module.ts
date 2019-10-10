import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DotenvService } from '../dotenv/dotenv.service';


@Module({
    imports: [
        ConfigModule,
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
            inject: [ConfigService]
          })
    ],
})
export class DatabaseModule {}