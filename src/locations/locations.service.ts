import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Location } from './location';
import { CreateLocationInput } from './dto/createLocation.input';

@Injectable()
export class LocationsService extends CrudService<Location> {
  constructor(@InjectModel(Location) private readonly locationsModel: ModelType<Location>) {
    super(locationsModel);
  }

  // what kind of services would we need?
  async createLocation(locationData: CreateLocationInput): Promise<Location> {
    return await this.createOne(locationData);
  }
}
