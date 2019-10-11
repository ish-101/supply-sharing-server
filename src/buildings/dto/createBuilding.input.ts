import { Field, InputType } from "type-graphql";
import { Length, Validate, Matches } from "class-validator";
import { IsCountry } from "../../validators/IsCountry.validator";
import { IsGendered } from "../../validators/IsGendered.validator";
import { Building } from "../building";

@InputType()
export class CreateBuildingInput implements Partial<Building> {

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

  @Field()
  @Matches(/home|apartment|dorm/g)
  type: string;

  @Validate(IsGendered)
  @Field({ nullable: true })
  gender: string;
}
