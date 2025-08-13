import { ArrayNotEmpty, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class MarkAsDto {
	@ArrayNotEmpty({ message: "" })
	@IsNotEmpty({ message: "", each: true })
	@IsString({ message: "", each: true })
	@IsUUID(4, { message: "", each: true })
	ids: string[];
}
