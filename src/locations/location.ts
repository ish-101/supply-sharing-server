import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';

@ObjectType()
export class Location extends Typegoose 
{
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @prop({ _id: false, required: true})
    name: string;

    @Field({ nullable: true })
    @prop({ unique: true, required: true })
    address: string

    @Field({ nullable: true })
    @prop({ required: true })
    city: string

    @Field({ nullable: true })
    @prop({ required: true })
    state: string



    // further research will have to be done to figure out how to store
    // the location, as generated from the address
};