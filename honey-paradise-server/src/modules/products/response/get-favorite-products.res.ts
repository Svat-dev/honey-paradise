import { ApiProperty } from "@nestjs/swagger";
import { GetShortProductsResponse } from "./get-short-products.res";

export class GetFavoriteProductsResponse {
  @ApiProperty({
    type: "number",
    description: "Total number of favorite products",
    example: 100,
  })
  total: number;

  @ApiProperty({
    type: "number",
    description: "Number of favorite products returned",
    example: 10,
  })
  length: number;

  @ApiProperty({
    type: GetShortProductsResponse,
    description: "List of favorite products",
    isArray: true,
  })
  products: GetShortProductsResponse[];
}
