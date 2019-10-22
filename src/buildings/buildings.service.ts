import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Building } from './building';
import { CreateBuildingInput } from './dto/create-building.input';
import * as MapboxClient from 'mapbox';

@Injectable()
export class BuildingsService extends CrudService<Building> {
  mapboxClient: MapboxClient;

  constructor(@InjectModel(Building) private readonly buildingsModel: ModelType<Building>) {
    super(buildingsModel);
    this.mapboxClient = new MapboxClient('pk.eyJ1Ijoid2luZWNyYWZ0IiwiYSI6ImNrMjBtdTV4bDBxdTMzanBjeHR0cHJucWQifQ.pS7R2rywwooHRglHDDa86Q');
  }

  // what kind of services would we need?
  async createBuilding(buildingData: any): Promise<Building> {
    return await this.createOne(buildingData);
  }

  async geocodeForward(address_string: any): Promise<any> {
    var self = this;
    return (new Promise(function(resolve, reject) {
      self.mapboxClient.geocodeForward(address_string).then(function(res) {
        resolve({
          latitude: res.entity.features[0].center[1],
          longitude: res.entity.features[0].center[0],
        });
      }).catch(function(err) {
        reject(err);
      });
    }));
  }

  getAddressString(buildingData: any): string {
    return `${ buildingData.street_address }, ${ buildingData.city }, ${ buildingData.state } ${ buildingData.zip_code }, ${ buildingData.country }`;
  }
}
