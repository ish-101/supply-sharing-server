import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';
import { User } from '../users/user';
import { Product } from '../products/product';
import { UserLocation } from '../user-locations/user-location';

@ObjectType()
export class Order extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field(type => User)
    @prop({ ref: User, required: true })
    user: Ref<User>;

    @Field(type => Product)
    @prop({ ref: Product, required: true })
    product: Ref<Product>;

    @Field({ nullable: true })
    @prop({ required: true })
    quantity: number;

    @Field(type => UserLocation)
    @prop({ ref: UserLocation, required: true })
    user_location: Ref<UserLocation>;

    @Field()
    @prop({ default: Date.now() })
    date_created: Date;

    @Field()
    @prop({ default: false })
    is_fulfilled: boolean;

    @Field({ nullable: true })
    @prop()
    total_price: number;

    @Field({ nullable: true })
    @prop()
    date_fulfilled: Date;
};