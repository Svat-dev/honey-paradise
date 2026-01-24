import { ApiProperty } from "@nestjs/swagger";
import { type Discount, EnumDiscountType, type Product } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";

export class GetProductResponse implements Partial<Product> {
  @ApiProperty({ type: "string", description: "", example: "uuid" })
  id: string;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  title: JsonValue;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  description: JsonValue;

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

  @ApiProperty({ type: "number", description: "", example: 0.25 })
  totalDiscount: number;

  @ApiProperty({ type: "number", description: "", example: 9.3 })
  rating: number;

  @ApiProperty({
    type: "object",
    properties: { reviews: { type: "number", description: "" } },
    description: "",
    example: { reviews: 100 },
  })
  _count: {
    reviews: number;
  };

  @ApiProperty({ type: "boolean", description: "" })
  isLiked: boolean;
}

class GetProductBySlugResponseCategory {
  @ApiProperty({ type: "string", description: "", example: "nanoid" })
  id: string;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  title: JsonValue;

  @ApiProperty({ type: "string", description: "", example: "slugged-value" })
  slug: string;
}

export class GetProductBySlugResponseDiscount implements Partial<Discount> {
  @ApiProperty({ type: "string", description: "", example: "uuid" })
  id: string;

  @ApiProperty({ enum: EnumDiscountType, example: EnumDiscountType.SELLOUT })
  type: EnumDiscountType;

  @ApiProperty({ type: "number", description: "", example: 0.25 })
  discount: number;
}

export class GetProductBySlugResponse
  implements Omit<GetProductResponse, "totalDiscount">
{
  @ApiProperty({ type: GetProductBySlugResponseCategory })
  category: GetProductBySlugResponseCategory;

  @ApiProperty({ type: "string", description: "", example: "uuid" })
  id: string;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  title: JsonValue;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  description: JsonValue;

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

  @ApiProperty({ type: "number", description: "", example: 9.3 })
  rating: number;

  @ApiProperty({ type: GetProductBySlugResponseDiscount, isArray: true })
  discounts: GetProductBySlugResponseDiscount[];

  @ApiProperty({
    type: "object",
    properties: { reviews: { type: "number", description: "" } },
    description: "",
    example: { reviews: 100 },
  })
  _count: {
    reviews: number;
  };

  @ApiProperty({ type: "boolean", description: "" })
  isLiked: boolean;
}
