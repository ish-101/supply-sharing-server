import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Building } from './building';
import { CreateBuildingInput } from './dto/createBuilding.input';

@Injectable()
export class BuildingsService extends CrudService<Building> {
  constructor(@InjectModel(Building) private readonly buildingsModel: ModelType<Building>) {
    super(buildingsModel);
  }

  // what kind of services would we need?
  async createBuilding(buildingData: CreateBuildingInput): Promise<Building> {
    return await this.createOne(buildingData);
  }
}
