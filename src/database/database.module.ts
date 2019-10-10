import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigService } from 'nestjs-dotenv';
import { KeysModule } from '../keys/keys.module';

@Module({
    imports: [
        KeysModule,
        TypegooseModule.forRoot(
            process.env.MONGO_URI || (new ConfigService).get('MONGO_URI'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        ),
    ],
})
export class DatabaseModule {}
