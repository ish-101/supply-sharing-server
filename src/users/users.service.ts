import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { User } from './user';
import { Location } from '../locations/location';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@InjectModel(User) private readonly usersModel: ModelType<User>) {
        super(usersModel);
    }

    async joinLocation(user_id: string, location: Location): Promise<User> {
      return await this.updateOneById(user_id, {
        location: location,
      });
    }

    async findOneByUsername(username: string): Promise<User> {
      return await this.usersModel.findOne({ username });
    }
}
