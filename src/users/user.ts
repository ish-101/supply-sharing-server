import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Name } from "./members/name";
import { Location } from "../locations/location";

@ObjectType()
export class User extends Typegoose {
    @Field(type => ID)
    id: string;

    @Field(type => Name)
    @prop({ _id: false, required: true })
    name: Name;

    @Field()
    @prop({ unique: true, required: true })
    email: string;

    @Field()
    @prop({ unique: true, required: true })
    username: string;

    @prop({ required: true})
    password: string;

    @Field(type => Location, { nullable: true })
    @prop()
    location: Location

    @Field()
    @prop()
    room_number: string;

    @prop({ required: true, default: false })
    verified: boolean;
}
