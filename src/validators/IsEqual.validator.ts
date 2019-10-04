import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "IsEqual", async: false })
export class IsEqual implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return (propertyValue == args.object[args.constraints[0]]);
    }
    defaultMessage(args: ValidationArguments) {
      return `${args.property} must be equal to ${args.constraints[0]}`;
    }
}