import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export enum UpdateQuantityType {
	decrease = "decrease",
	increase = "increase",
}

export class UpdateQuantityDto {
	@ApiProperty({ enum: UpdateQuantityType, description: "", example: UpdateQuantityType.increase })
	@IsNotEmpty({})
	@IsEnum(UpdateQuantityType)
	type: UpdateQuantityType;

	@ApiProperty({ type: "string", description: "Cart item ID", example: "nanoid" })
	@IsNotEmpty()
	@IsString({ message: "Cart item ID must be a string" })
	cartItemId: string;
}
