export interface IComment {
	id: string;

	text: string;
	likes: JSON; // {userIds: string[]}
	dislikes: JSON; // {userIds: string[]}

	userId: string;
	productId: string;

	createdAt: string;
	updatedAt: string;
}
