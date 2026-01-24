import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class DeleteProviderDto {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsUUID(4, { message: "" })
	pid: string
}
