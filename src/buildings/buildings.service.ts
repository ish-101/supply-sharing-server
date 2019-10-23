import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@hasezoey/typegoose';
import { CrudService } from '../crud/crud.service';
import { Building } from './building';
import { CreateBuildingInput } from './dto/create-building.input';
import * as MapboxClient from 'mapbox';
import * as LatLongDistance from 'lat-long-distance';

@Injectable()
export class BuildingsService extends CrudService<Building> {
  mapboxClient: MapboxClient;
  converter: LatLongDistance;

  constructor(
    @InjectModel(Building) private readonly buildingsModel: ModelType<Building>
  ) {
    super(buildingsModel);
    this.mapboxClient = new MapboxClient('pk.eyJ1Ijoid2luZWNyYWZ0IiwiYSI6ImNrMjBtdTV4bDBxdTMzanBjeHR0cHJucWQifQ.pS7R2rywwooHRglHDDa86Q');
    this.converter = new LatLongDistance();
  }

  // what kind of services would we need?
  async createBuilding(buildingData: any): Promise<Building> {
    return await this.createOne(buildingData);
  }

  async geocodeForward(address_string: string): Promise<any> {
    var self = this;
    return (new Promise(function(resolve, reject) {
      self.mapboxClient.geocodeForward(address_string).then(function(res) {
        resolve({
          latitude: res.entity.features[0].center[1],
          longitude: res.entity.features[0].center[0],
        });
      }).catch(function(err) {
        resolve(null);
      });
    }));
  }

  getAddressString(buildingData: any): string {
    return `${ buildingData.street_address }, ${ buildingData.city }, ${ buildingData.state } ${ buildingData.zip_code }, ${ buildingData.country }`;
  }

  getDistanceBetween(from_building: Building, to_building: Building): number {
    this.converter.setPoint('from', {
      latitude: from_building.latitude,
      longitude: from_building.longitude,
    });
    this.converter.setPoint('to', {
      latitude: to_building.latitude,
      longitude: to_building.longitude,
    })
    return this.converter.distanceInKm();
  }
}
