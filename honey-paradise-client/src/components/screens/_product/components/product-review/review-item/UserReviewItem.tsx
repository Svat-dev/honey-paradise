import { Button } from "@/components/ui/common";
import type { GetReviewsByPidResponseRating } from "@/shared/types/server";
import dynamic from "next/dynamic";
import type { FC } from "react";

const DynamicCreateReviewDialog = dynamic(() => import("../CreateReviewDialog").then(mod => mod.CreateReviewDialog), { ssr: false });

interface IProps {
	reviewId: string;
	rating: GetReviewsByPidResponseRating;
	comment: string;
}

const UserReviewItem: FC<IProps> = ({ reviewId, comment, rating }) => {
	return (
		<div className="flex justify-between items-center mb-4">
			<p className="text-xl font-medium">Ваш отзыв</p>

			<div className="flex items-center gap-3">
				<DynamicCreateReviewDialog type="edit" productId="" reviewId={reviewId} defaultValue={{ comment, rating }}>
					<Button variant="secondary" className="p-2">
						Редактировать
					</Button>
				</DynamicCreateReviewDialog>

				<Button variant="destructive" className="p-2">
					Удалить
				</Button>
			</div>
		</div>
	);
};

export { UserReviewItem };
