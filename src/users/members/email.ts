import { Typegoose, prop, staticMethod } from "@hasezoey/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Email extends Typegoose 
{
    @Field()
    @prop({ 
        required: true, 
        validate: val => Email.validateEmail(val)
    })
    email_address: string;

    @staticMethod
    static validateEmail(email: string) : boolean
    {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
}