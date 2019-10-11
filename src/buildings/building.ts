import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';

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

    @Field({ nullable: true })
    @prop({ required: false })
    gender: string;

    // further research will have to be done to figure out how to store
    // the location, as generated from the address
};
