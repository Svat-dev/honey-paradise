import { IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class GetProductsQueryDto {
	@IsString({ message: "" })
	@MaxLength(255, { message: "" })
	@IsOptional({ message: "" })
	@Matches(/^[a-zA-Zа-яА-Я0-9_(). ,-]*$/, {
		message: "Разрешены только буквы, цифры, а также символы: -, _, (, ), , и .",
	})
	q: string;
}

export class GetPresearchDataQueryDto {
	@IsString({ message: "" })
	@MaxLength(255, { message: "" })
	@Matches(/^[a-zA-Zа-яА-Я0-9_(). ,-]*$/, {
		message: "Разрешены только буквы, цифры, а также символы: -, _, (, ), , и .",
	})
	q: string;
}
