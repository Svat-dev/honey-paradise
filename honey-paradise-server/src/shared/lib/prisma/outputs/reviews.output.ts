import { reviewsUserOutput } from "./user.output";

// Prisma.ReviewSelect
export const reviewsOutput = {
	id: true,
	text: true,
	rating: true,
	user: { select: reviewsUserOutput },
	likes: true,
	dislikes: true,
	createdAt: true,
};
