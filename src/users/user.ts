import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Name } from "./name";

@ObjectType()
export class User extends Typegoose {
    @Field( type => ID )
    id: string;

    @Field( type => Name, { nullable: true } )
    @prop({ _id: false })
    name: Name;

    @Field({ nullable: true })
    @prop()
    googleId: string;

    @Field({ nullable: true })
    @prop({ unique: true })
    username: string;

    @prop()
    password: string;
}