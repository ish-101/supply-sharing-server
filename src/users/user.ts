import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Name } from "./members/name";
import { Email } from "./members/email";
import { Location } from "../locations/location";

@ObjectType()
export class User extends Typegoose 
{
    @Field(type => ID)
    id: string;

    @Field(type => Name, { nullable: true })
    @prop({ _id: false, required: true })
    name: Name;

    // either sign in with the google tie in
    @Field({ nullable: true })
    @prop({ unique: true })
    googleId: string;

    // or with the user inputted email
    @Field(type => Email, { nullable: true })
    @prop({ unique: true })
    email: Email;

    @prop({})
    password: string;

    @prop({ ref: Location })
    location: Ref<Location>;
}