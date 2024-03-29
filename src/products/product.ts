import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose, prop } from '@hasezoey/typegoose';
import { Crate } from "../crates/crate";

@ObjectType()
export class Product extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field()
    @prop({ required: true })
    name: string;

    @Field()
    @prop({ required: true })
    description: string;

    @Field({ nullable: true })
    @prop({ required: false })
    image_url: string;

    @Field()
    @prop({ required: true })
    default_average_price: number;

    @Field({ nullable: true })
    average_price: number;

    @Field(type => [Crate], { nullable: true })
    crates: Crate[];
};
