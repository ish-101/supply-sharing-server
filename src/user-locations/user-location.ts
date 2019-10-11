import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose } from '@hasezoey/typegoose';

@ObjectType()
export class UserLocation extends Typegoose {
    @Field(type => ID)
    id: string; 
};