import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';

@ObjectType()
export class Product extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field()
    @prop({ required: true })
    list_price: number;
  
    @prop()
    default_average_price: number;

    @Field({ nullable: true })
    average_price: number;
};