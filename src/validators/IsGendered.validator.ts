import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "IsGendered", async: false })
export class IsGendered implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return (propertyValue == null || (propertyValue.match(/male|female|gender-inclusive/g) != null));
    }
    defaultMessage(args: ValidationArguments) {
      return `Location must either not be gendered, or be the values `
        + `male', 'female, 'gender-inclusive'`;
    }
}
