import { Field, InputType } from "type-graphql";
import { Product } from "../product";

@InputType()
export class CreateProductInput implements Partial<Product> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  default_average_price: number;
}
