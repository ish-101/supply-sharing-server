import { Typegoose, prop } from "@hasezoey/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Name extends Typegoose {
    @Field()
    @prop({ required: true })
    familyName: string;

    @Field()
    @prop({ required: true })
    givenName: string;
}