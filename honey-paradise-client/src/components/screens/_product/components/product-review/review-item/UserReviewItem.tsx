import { Button } from "@/components/ui/common";

const UserReviewItem = () => {
	return (
		<div className="flex justify-between items-center mb-4">
			<p className="text-xl font-medium">Ваш отзыв</p>

			<div className="flex items-center gap-3">
				<Button variant="secondary" className="p-2">
					Редактировать
				</Button>

				<Button variant="destructive" className="p-2">
					Удалить
				</Button>
			</div>
		</div>
	);
};

export { UserReviewItem };
