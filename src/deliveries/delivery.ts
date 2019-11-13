import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';
import { User } from "../users/user";
import { Crate } from "../crates/crate";
import { Order } from "../orders/order";

@ObjectType()
export class Delivery extends Typegoose {
  @Field(type => ID)
  id: string;

  @Field(type => User)
  @prop({ ref: User, required: true })
  driver: Ref<User>;

  @Field(type => Crate)
  @prop({ ref: Crate, required: true })
  crate: Ref<Crate>;

  @Field(type => [Order])
  orders: Order[];
}
