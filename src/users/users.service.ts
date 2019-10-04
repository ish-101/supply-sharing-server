import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { User } from './user';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(@InjectModel(User) private readonly usersModel: ModelType<User>) {
        super(usersModel);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.usersModel.findOne({ username });
    }
}
