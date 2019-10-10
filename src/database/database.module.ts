import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';


@Module({
    imports: [
        ConfigModule,
        TypegooseModule.forRoot(
            (new ConfigService('.env')).get('MONGO_URI'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        ),
    ],
})
export class DatabaseModule {}