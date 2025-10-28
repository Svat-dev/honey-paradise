import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";

export class GetShortProductsResponse {
  @ApiProperty({ type: "string", description: "", example: "uuid" })
  id: string;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  title: JsonValue;

  @ApiProperty({ type: "string", description: "", example: "slugged-value" })
  slug: string;

  @ApiProperty({
    type: "string",
    description: "",
    example: ["image1", "image2"],
    isArray: true,
  })
  images: string[];

  @ApiProperty({ type: "number", description: "", example: 10 })
  priceInUsd: number;
}
