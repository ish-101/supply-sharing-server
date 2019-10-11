import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from './product';
import { ModelType } from 'typegoose';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class ProductsService extends CrudService<Product> {
    constructor(@InjectModel(Product) private readonly productsModel: ModelType<Product>) {
        super(productsModel);
    }
}