import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';

import { User } from '../users/user'

import { Building } from '../buildings/building'

@ObjectType()
export class UserLocation extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field()
    @prop({ _id: false, required: true })
    personal_name: string;

    @Field({ nullable: true })
    @prop({ _id: false, required: false })
    room_number: string;

    @Field(type => User)
    @prop({ required: true, ref: User })
    user: Ref<User>;

    @Field(type => Building)
    @prop({ required: true, ref: User })
    building: Ref<Building>;
};
