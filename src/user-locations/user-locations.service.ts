import { Injectable } from '@nestjs/common';
import { UserLocation } from './user-location';
import { CrudService } from '../crud/crud.service';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from 'typegoose';

@Injectable()
export class UserLocationsService extends CrudService<UserLocation> {
  constructor(@InjectModel(UserLocation) private readonly userLocationsModel: ModelType<UserLocation>) {
    super(userLocationsModel);
  }

  async getByUser(
    user_id: string
  ): Promise<UserLocation[]> {
    return await this.findMultiple({
      user: user_id
    });
  }
}
