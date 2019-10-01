import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Name } from "./members/name";
import { IsEmail } from "class-validator";

@ObjectType()
export class User extends Typegoose 
{
    @Field(type => ID)
    id: string;

    @Field(type => Name)
    @prop({ _id: false, required: true })
    name: Name;

    // or with the user inputted email
    @Field()
    @prop({ unique: true, required: true })
    @IsEmail()
    email: string;

    @Field()
    @prop({ unique: true, required: true })
    username: string;

    @prop({ required: true})
    password: string;
}