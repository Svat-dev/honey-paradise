import { Button, Separator } from "@/components/ui/common";

import { m } from "motion/react";
import type { FC } from "react";
import { useDeleteReviewToaster } from "../../../hooks/useDeleteReviewToaster";

interface IProps {
	removeToast: VoidFunction;
	setNotDeleted: VoidFunction;
	reviewId: string;
}

const DeleteReviewToaster: FC<IProps> = ({ removeToast, setNotDeleted, reviewId }) => {
	const { cancelDeleting, agreeWithDeleting, progressWidth } = useDeleteReviewToaster(setNotDeleted, removeToast, reviewId);

	return (
		<div className="flex items-center gap-3">
			<p>Ваш отзыв будет удален</p>

			<Separator orientation="vertical" className="h-full mx-3" />

			<Button variant="destructive" onClick={agreeWithDeleting} className="p-1.5 px-2.5">
				Ок
			</Button>

			<Button variant="outline" onClick={cancelDeleting}>
				Отменить
			</Button>

			<div className="absolute left-0 bottom-0 w-full h-1 bg-gray-400 rounded-full overflow-hidden">
				<m.div
					className="h-full bg-muted duration-500 ease-linear will-change-auto transition-all"
					style={{ width: `${progressWidth}%` }}
				/>
			</div>
		</div>
	);
};

export { DeleteReviewToaster };
