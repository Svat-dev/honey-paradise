import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from "class-validator"

// Интерфейс для опций
interface NumberArrayOptions {
	allowedValues?: string[]
	minLength?: number
	maxLength?: number
	unique?: boolean
}

// Валидатор с встроенной трансформацией
@ValidatorConstraint({ name: "isNumberArrayString", async: false })
export class IsNumberArrayStringConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		// Если уже массив чисел - пропускаем
		if (Array.isArray(value) && value.every(item => typeof item === "number")) {
			return this.validateArray(value, args)
		}

		// Если строка - преобразуем и валидируем
		if (typeof value === "string") {
			// Проверяем формат строки
			const numberArrayRegex = /^(\d+)(,\d+)*$/
			if (!numberArrayRegex.test(value)) {
				return false
			}

			// Преобразуем строку в массив чисел
			const numbers = value.split(",").map(Number)

			// Сохраняем преобразованный массив в объект (через мутацию)
			;(args.object as any)[args.property] = numbers

			// Валидируем полученный массив
			return this.validateArray(numbers, args)
		}

		return false
	}

	private validateArray(numbers: number[], args: ValidationArguments): boolean {
		const options = (args.constraints[0] as NumberArrayOptions) || {}

		// Проверяем allowedValues
		if (options.allowedValues) {
			const allowedNumbers = options.allowedValues.map(Number)
			if (!numbers.every(num => allowedNumbers.includes(num))) {
				return false
			}
		}

		// Проверяем minLength
		if (options.minLength !== undefined && numbers.length < options.minLength) {
			return false
		}

		// Проверяем maxLength
		if (options.maxLength !== undefined && numbers.length > options.maxLength) {
			return false
		}

		// Проверяем unique
		if (options.unique === true) {
			if (new Set(numbers).size !== numbers.length) {
				return false
			}
		}

		return true
	}

	defaultMessage(args: ValidationArguments) {
		const options = (args.constraints[0] as NumberArrayOptions) || {}
		let message =
			'Неверный формат. Ожидается строка с числами через запятую (например: "1,2,3") или массив чисел'

		if (options.allowedValues) {
			message += `. Разрешены только значения: ${options.allowedValues.join(", ")}`
		}

		if (options.minLength !== undefined) {
			message += `. Минимум ${options.minLength} элементов`
		}

		if (options.maxLength !== undefined) {
			message += `. Максимум ${options.maxLength} элементов`
		}

		if (options.unique === true) {
			message += `. Значения должны быть уникальными`
		}

		return message
	}
}

export function IsNumberArrayString(
	options?: NumberArrayOptions,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [options],
			validator: IsNumberArrayStringConstraint
		})
	}
}
