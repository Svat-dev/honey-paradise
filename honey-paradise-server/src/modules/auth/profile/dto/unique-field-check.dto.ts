import { IsNotEmpty, IsString } from "class-validator";

export class UniqueFieldCheckDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	fieldValue: string;
}
