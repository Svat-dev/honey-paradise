import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteProviderDto {
	@IsNotEmpty({ message: "" })
	@IsString({ message: "" })
	@IsUUID(4, { message: "" })
	pid: string;
}
