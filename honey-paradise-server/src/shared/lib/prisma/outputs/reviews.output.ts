import { userReviewsOutput } from "./user.output";

// Prisma.ReviewSelect
export const reviewsOutput = {
	id: true,
	text: true,
	rating: true,
	user: { select: userReviewsOutput },
	likes: true,
	dislikes: true,
	createdAt: true,
};
