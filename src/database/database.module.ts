import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { mongoKey } from '../keys/databaseKeys';

@Module({
    imports: [
        TypegooseModule.forRoot(
            mongoKey.uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        ),
    ],
})
export class DatabaseModule {}
