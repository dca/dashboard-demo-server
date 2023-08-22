import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsEqualToConstraint implements ValidatorConstraintInterface {
  validate (propertyValue: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return propertyValue === relatedValue
  }

  defaultMessage (args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints
    return `${relatedPropertyName as string} and ${args.property} don't match.`
  }
}

export function IsEqualTo (property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsEqualToConstraint
    })
  }
}

@ValidatorConstraint({ async: false })
export class IsNotEqualToConstraint implements ValidatorConstraintInterface {
  validate (propertyValue: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints
    const relatedValue = (args.object as any)[relatedPropertyName]
    return propertyValue !== relatedValue
  }

  defaultMessage (args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints
    return `${relatedPropertyName as string} and ${args.property} are the same.`
  }
}

export function IsNotEqualTo (property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isNotEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsNotEqualToConstraint
    })
  }
}
