import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crate } from './crate';
import { ModelType } from 'typegoose';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class CratesService extends CrudService<Crate> {
  constructor(
    @InjectModel(Crate) private readonly cratesModel: ModelType<Crate>
  ) {
    super(cratesModel);
  }
}
