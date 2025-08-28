import { ArrayNotEmpty, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class NotificationsIdsDto {
	@ArrayNotEmpty({ message: "" })
	@IsNotEmpty({ message: "", each: true })
	@IsString({ message: "", each: true })
	@IsUUID(4, { message: "", each: true })
	ids: string[];

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	single?: boolean;
}
