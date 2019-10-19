import { ObjectType, Field, ID } from 'type-graphql';
import { Typegoose } from '@hasezoey/typegoose';

@ObjectType()
export class Product extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field({ nullable: true })
    @prop({ required: true })
    quantity: number;

    @Field()
    avg_price: string;

    @Field()
    @prop({nullable:true})
    market_price: string

};
