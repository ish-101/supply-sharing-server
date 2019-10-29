import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crate } from './crate';
import { ObjectID } from 'mongodb';
import { ModelType } from 'typegoose';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class CratesService extends CrudService<Crate> {
  constructor(
    @InjectModel(Crate) private readonly cratesModel: ModelType<Crate>
  ) {
    super(cratesModel);
  }

  async deleteByProduct(
    product_id: string
  ): Promise<boolean> {
    var crates = await this.findMultiple({
      product: new ObjectID(product_id),
    });

    if(crates != null) {
      for(var crate of crates) {
        await this.deleteOneById(crate.id);
      }
      return true;
    }
    return false;
  }
}
