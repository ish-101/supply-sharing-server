import { Module, forwardRef } from '@nestjs/common';
import { Crate } from './crate';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { CratesService } from './crates.service';
import { CratesResolver } from './crates.resolver';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    TypegooseModule.forFeature([
      Crate,
    ]),
  ],
  provide: [CratesService, CratessResolver],
  exports: [CratesService]
})
export class CratesModule {}
