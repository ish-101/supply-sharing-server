import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';
import { User } from '../users/user';

@ObjectType()
export class Order extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field(type => User)
    @prop({ ref: User })
    user: Ref<User>;
};
