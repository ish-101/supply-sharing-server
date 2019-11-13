import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';
import { Crate } from '../crates/crate';
import { UserLocation } from '../user-locations/user-location';
import { User } from '../users/user';

@ObjectType()
export class Order extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field(type => User)
    @prop({ ref: User, required: true })
    user: Ref<User>;

    @Field(type => UserLocation)
    @prop({ ref: UserLocation, required: true })
    user_location: Ref<UserLocation>;

    @Field(type => Crate)
    @prop({ ref: Crate, required: true })
    crate: Ref<Crate>;

    /*
    @Field(type => Delivery)
    @prop({ ref: Delivery, required: true})
    delivery: Ref<Delivery>;
    */

    @Field()
    @prop({ required: true })
    quantity: number;

    @Field()
    @prop({ required: true })
    charge: number;

    @Field()
    @prop({ required: true, default: Date.now() })
    date_created: Date;
};
