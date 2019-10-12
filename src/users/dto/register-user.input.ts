import { Field, InputType } from "type-graphql";
import { Name } from "../members/name";
import { User } from "../user";
import { IsEmail, Validate } from "class-validator";
import { IsEqual } from "../../validators/IsEqual.validator";

@InputType()
export class RegisterUserInput implements Partial<User> {
    @Field(type => Name)
    name: Name;

    @IsEmail()
    @Field()
    email: string;

    @Validate(IsEqual, ['email'])
    @Field()
    confirm_email: string;

    @Field()
    username: string;

    // maybe add a length validator
    @Field()
    password: string;
}
