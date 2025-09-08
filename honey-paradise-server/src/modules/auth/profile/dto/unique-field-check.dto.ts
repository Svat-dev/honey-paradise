import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UniqueFieldCheckDto {
	@ApiProperty({ type: "string", description: "", example: "username", required: true })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	fieldValue: string;
}
