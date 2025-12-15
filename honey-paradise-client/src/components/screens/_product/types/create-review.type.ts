import type { TCreateReviewSchema } from "@/shared/lib/schemas/create-review.schema";

export interface IRatingListData {
	text: string;
	field: keyof TCreateReviewSchema["rating"];
}
