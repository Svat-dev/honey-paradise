import { IsEnum, IsOptional, IsString } from "class-validator";

export enum EnumNotificationsSort {
	OLDEST = "OLDEST",
	NEWEST = "NEWEST",
}

export class GetAllQueryDto {
	@IsOptional({ message: "" })
	@IsEnum(EnumNotificationsSort, { message: "" })
	sort?: EnumNotificationsSort;

	@IsOptional({ message: "" })
	@IsString({ message: "" })
	is_read?: string;

	@IsOptional({ message: "" })
	@IsString({ message: "" })
	types?: string;

	@IsOptional({ message: "" })
	@IsString({ message: "" })
	page?: string;

	@IsOptional({ message: "" })
	@IsString({ message: "" })
	per_page?: string;
}
