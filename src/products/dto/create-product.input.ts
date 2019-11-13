import { Field, InputType } from "type-graphql";
import { Product } from "../product";

@InputType()
export class CreateProductInput implements Partial<Product> {
  @Field()
  name: string;

  @Field()
  description: string;

  // validate the image is an actual image (already uploaded)
  @Field()
  image_url: string;

  @Field()
  default_average_price: number;
}
