import { Module, forwardRef } from '@nestjs/common';
import { Crate } from './crate';
import { TypegooseModule } from 'nestjs-typegoose';
import { DatabaseModule } from '../database/database.module';
import { ProductsModule } from '../products/products.module';
import { GraphqlModule } from '../graphql/graphql.module';
import { CratesService } from './crates.service';
import { CratesResolver } from './crates.resolver';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    forwardRef(() => ProductsModule),
    TypegooseModule.forFeature([
      Crate,
    ]),
  ],
  providers: [CratesService, CratesResolver],
  exports: [CratesService]
})
export class CratesModule {}
