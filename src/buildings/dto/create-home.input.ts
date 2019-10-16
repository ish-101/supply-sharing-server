import { Field, InputType } from "type-graphql";
import { Length, Validate, Matches } from "class-validator";
import { IsCountry } from "../../validators/IsCountry.validator";
import { IsGendered } from "../../validators/IsGendered.validator";
import { Building } from "../building";

@InputType()
export class CreateHomeInput implements Partial<Building> {
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
}
