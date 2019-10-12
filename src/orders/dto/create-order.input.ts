import { InputType, Field } from "type-graphql";

@InputType('CreateOrderInput')
export class CreateOrderInput {
    @Field()
    product: string;

    @Field()
    quantity: number;

    @Field()
    user_location: string;
}