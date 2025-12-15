import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";

export class GetProductsRatingResponseCount {
	@ApiProperty({ type: "number", example: 1 })
	"1": number;

	@ApiProperty({ type: "number", example: 0 })
	"2": number;

	@ApiProperty({ type: "number", example: 1 })
	"3": number;

	@ApiProperty({ type: "number", example: 5 })
	"4": number;

	@ApiProperty({ type: "number", example: 7 })
	"5": number;
}

export class GetProductsRatingResponseExtra {
	@ApiProperty({ type: "number", example: 4.67 })
	taste: number;

	@ApiProperty({ type: "number", example: 4.49 })
	aroma: number;

	@ApiProperty({ type: "number", example: 4.33 })
	packaging: number;
}

export class GetProductsRatingResponse {
	@ApiProperty({ type: "number", example: 4.21 })
	rating: number;

	@ApiProperty({ type: GetProductsRatingResponseExtra })
	extraRating: JsonValue;

	@ApiProperty({ type: GetProductsRatingResponseCount })
	count: Record<string, number>;
}
