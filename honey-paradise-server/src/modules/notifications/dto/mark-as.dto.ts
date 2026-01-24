import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class NotificationsIdsDto {
  @ApiProperty({
    type: "string",
    isArray: true,
    description: "",
    example: ["uuid-1", "uuid-2", "..."],
  })
  @ArrayNotEmpty({ message: "" })
  @IsNotEmpty({ message: "", each: true })
  @IsString({ message: "", each: true })
  @IsUUID(4, { message: "", each: true })
  ids: string[];

  @ApiProperty({
    type: "boolean",
    description: "",
    example: false,
    required: false,
  })
  @IsBoolean({ message: "" })
  @IsOptional()
  single?: boolean;
}
