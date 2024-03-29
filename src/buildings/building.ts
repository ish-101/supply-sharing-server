import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';
import { Order } from "../orders/order";

@ObjectType()
export class Building extends Typegoose
{
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @prop({ _id: false })
    name: string

    @Field()
    @prop({ required: true })
    street_address: string;

    @Field()
    @prop({ required: true })
    city: string;

    @Field()
    @prop({ required: true })
    state: string;

    @Field()
    @prop({ required: true })
    country: string;

    @Field()
    @prop({ required: true })
    zip_code: string;

    @Field()
    @prop({ required: true })
    type: string;

    @Field()
    @prop({ required: true })
    outside_accessible: boolean;

    @Field({ nullable: true })
    @prop({ required: false })
    gender: string;

    @Field()
    @prop({ required: true })
    longitude: number;

    @Field()
    @prop({ required: true })
    latitude: number;
    // further research will have to be done to figure out how to store
    // the location, as generated from the address

    @Field(type => [Order], { nullable: true })
    orders: Order[];
};
