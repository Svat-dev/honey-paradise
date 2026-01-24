import { ApiProperty } from "@nestjs/swagger";
import type { JsonValue } from "@prisma/client/runtime/library";

export class GetReviewsByPidResponseUser {
  @ApiProperty({ type: "string", example: "uuid" })
  id: string;

  @ApiProperty({ type: "string", example: "username" })
  username: string;

  @ApiProperty({
    type: "string",
    description: "",
    example: "https://example.com/avatar.webp",
  })
  avatarPath: string;

  @ApiProperty({
    type: "string",
    description: "",
    example: "https://example.com/frame.webp",
    nullable: true,
  })
  framePath?: string;
}

export class GetReviewsByPidResponseRating {
  @ApiProperty({ type: "number", example: 5 })
  common: number;

  @ApiProperty({ type: "number", example: 5 })
  taste: number;

  @ApiProperty({ type: "number", example: 5 })
  aroma: number;

  @ApiProperty({ type: "number", example: 5 })
  packaging: number;
}

export class GetReviewsByPidResponseReview {
  @ApiProperty({ type: "string", example: "uuid" })
  id: string;

  @ApiProperty({ type: GetReviewsByPidResponseRating })
  rating: JsonValue;

  @ApiProperty({ type: "string", example: "Some text" })
  text: string;

  @ApiProperty({ type: GetReviewsByPidResponseUser })
  user: GetReviewsByPidResponseUser;

  @ApiProperty({ type: "number", example: 10, nullable: true })
  likes: number | null;

  @ApiProperty({ type: "number", example: 10, nullable: true })
  dislikes: number | null;

  @ApiProperty({ type: "boolean", example: false })
  isLiked: boolean;

  @ApiProperty({ type: "boolean", example: false })
  isDisliked: boolean;

  @ApiProperty({ type: Date, example: new Date() })
  createdAt: Date;
}

export class GetReviewsByPidResponse {
  @ApiProperty({ type: GetReviewsByPidResponseReview, isArray: true })
  reviews: GetReviewsByPidResponseReview[];

  @ApiProperty({ type: GetReviewsByPidResponseReview, nullable: true })
  mostPopularReview?: GetReviewsByPidResponseReview;

  @ApiProperty({ type: GetReviewsByPidResponseReview, nullable: true })
  userReview?: GetReviewsByPidResponseReview;
}
