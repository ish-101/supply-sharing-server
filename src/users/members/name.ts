import { Typegoose, prop } from "@hasezoey/typegoose";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType('Name')
@InputType('NameInput')
export class Name extends Typegoose {
    @Field()
    @prop({ required: true })
    familyName: string;

    @Field()
    @prop({ required: true })
    givenName: string;

    get fullName() : string {
    	return `${ this.givenName } ${ this.familyName }`;
    }
}
