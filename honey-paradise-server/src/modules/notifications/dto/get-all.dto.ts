import { IsEnum, IsOptional, IsString } from "class-validator";

export enum EnumNotificationsSort {
	OLDEST = "OLDEST",
	NEWEST = "NEWEST",
}

export class GetAllQueryDto {
	@IsOptional()
	@IsEnum(EnumNotificationsSort, { message: "" })
	sort?: EnumNotificationsSort;

	@IsOptional()
	@IsString({ message: "" })
	is_read?: string;

	@IsOptional()
	@IsString({ message: "" })
	types?: string;

	@IsOptional()
	@IsString({ message: "" })
	page?: string;

	@IsOptional()
	@IsString({ message: "" })
	per_page?: string;
}
