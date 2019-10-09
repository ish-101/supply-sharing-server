import { Field, InputType } from "type-graphql";
import { Length, Validate } from "class-validator";
import { IsCountry } from "../../validators/IsCountry.validator";
import { Location } from "../location";

@InputType()
export class CreateLocationInput implements Partial<Location> {
  @Field()
  name: string;

  // for now, I'm not going to try to validate the following :'(

  @Field()
  street_address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Validate(IsCountry)
  @Field()
  country: string; // prolly USA for now :shrug:

  @Length(5, 5)
  @Field()
  zip_code: string;

  @Field({ nullable: true })
  gender: string;
}
