import { reviewsUserOutput } from "./user.output";

// Prisma.ReviewSelect
export const reviewsOutput = {
  id: true,
  text: true,
  rating: true,
  likes: true,
  dislikes: true,
  createdAt: true,
  user: { select: reviewsUserOutput },
};
