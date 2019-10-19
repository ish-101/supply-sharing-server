import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';

@ObjectType()
export class Product extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @prop({ required: true })
    quantity: number;

    @Field()
    avg_price: string;

    @Field()
    @prop({ required: true })
    list_price: string
};