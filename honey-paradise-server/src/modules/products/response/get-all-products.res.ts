import type { Category, Product } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";
import { ApiJsonValue } from "src/shared/types/swagger.type";
import { GetProductResponse } from "./get-product.res";

export class GetAllCatsResponse implements Partial<Category> {
  @ApiProperty({ type: "string", description: "", example: "nanoid" })
  id: string;

  @ApiProperty({ type: ApiJsonValue, description: "" })
  title: JsonValue;

  @ApiProperty({ type: "string", description: "", example: "slugged-value" })
  slug: string;

  @ApiProperty({ type: "string", description: "", example: "image" })
  image: string;

  @ApiProperty({ type: GetProductResponse, description: "", isArray: true })
  products: GetProductResponse[];

  @ApiProperty({ type: "number", description: "", example: 10 })
  productsLength: number;
}

export class GetCatsWithProductsResponse {
  @ApiProperty({ type: GetAllCatsResponse, description: "", isArray: true })
  categories: GetAllCatsResponse[];

  @ApiProperty({ type: "number", description: "", example: 3 })
  categoriesLength: number;

  @ApiProperty({ type: "number", description: "", example: 20 })
  allProductsLength: number;
}
