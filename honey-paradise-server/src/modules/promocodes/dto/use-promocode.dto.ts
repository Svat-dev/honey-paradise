import { IsString, Length, Matches } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UsePromoCodeDto {
	@ApiProperty({ type: "string", description: "", example: "PROMOCODE" })
	@IsString({ message: "" })
	@Length(3, 50, { message: "" })
	@Matches(/^[a-zA-Z0-9_-]+$/)
	code: string;
}
