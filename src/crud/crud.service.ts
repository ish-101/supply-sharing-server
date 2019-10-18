import { Injectable } from '@nestjs/common';
import { ModelType } from '@hasezoey/typegoose';

@Injectable()
export class CrudService<modelType> {
    constructor(protected readonly model: ModelType<modelType>) {}

    async createOne(data: any): Promise<modelType> {
        const doc = new this.model(data);
        return await doc.save();
    }

    async findMultiple(where: any = {}): Promise<modelType[]> {
        return await this.model.find(where);
    }

    async findOneById(id: string): Promise<modelType> {
        return await this.model.findById(id);
    }

    async updateOneById(id: string, data: any): Promise<any> {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOneById(id: string): Promise<any> {
        return await this.model.findByIdAndDelete(id);
    }
}
