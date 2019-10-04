import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginData 
{
	@Field()
	username: string;

	@Field()
	password: string;
}