import { Contains, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateAvatarFrameDto {
	@ApiProperty({ type: "string", example: "https://example.com/frame.webp", required: false })
	@IsString({ message: "" })
	@IsNotEmpty({ message: "" })
	@Contains("/frames/", { message: "" })
	@IsOptional()
	framePath: string | null;
}
