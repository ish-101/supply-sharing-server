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

  // here's a plan, we narrow down buildings by a 50 mile radius through clever
  // querying of the database, then sort those buildings...
  async getXClosestBuildings(
    latitude: number,
    longitude: number,
    x: number
  ): Promise<Building[]> {
    // here, we should query in a 50 mile radius or something
    var searchBuildings = await this.findAll();

    var self = this;
    searchBuildings.sort(function(a_building, b_building) {
      var a_distance = self.getDistanceBetween(
        latitude, longitude, a_building,
      );
      var b_distance =  self.getDistanceBetween(
        latitude, longitude, b_building,
      );
      if(a_distance > b_distance) return 1;
      if(a_distance < b_distance) return -1;
      return 0;
    });
    return searchBuildings.slice(0, x);
  }

  getAddressString(buildingData: any): string {
    return `${ buildingData.street_address }, ${ buildingData.city }, ${ buildingData.state } ${ buildingData.zip_code }, ${ buildingData.country }`;
  }

  getDistanceBetween(latitude: number, longitude: number, to_building: Building): number {
    this.converter.setPoint('from', {
      latitude: latitude,
      longitude: longitude,
    });
    this.converter.setPoint('to', {
      latitude: to_building.latitude,
      longitude: to_building.longitude,
    })
    return this.converter.distanceInKm();
  }
}
