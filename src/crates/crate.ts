import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, Ref, prop } from '@hasezoey/typegoose';
import { Product } from "../products/product";

@ObjectType()
export class Crate extends Typegoose {
  @Field(type => ID)
  id: string;

  @Field(type => Product)
  @prop({ required: true, ref: Product })
  product: Ref<Product>;

  @Field()
  @prop({ required: true })
  quantity: number;

  @Field({ nullable: true })
  average_price: number;
}
