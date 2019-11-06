import { InputType, Field } from "type-graphql";

@InputType('CreateOrderInput')
export class CreateOrderInput {
    //@IsValidCrate
    @Field()
    crate: string;

    //@IsPositiveNumber
    @Field()
    quantity: number;

    //@IsValidLocation
    @Field()
    user_location: string;

    // have more stuff here such as stripe key etc
}
