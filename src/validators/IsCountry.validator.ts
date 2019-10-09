import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "IsCountry", async: false })
export class IsCountry implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return (propertyValue == 'United States'); // ha ha
    }
    defaultMessage(args: ValidationArguments) {
      return `Value is not a country`;
    }
}
