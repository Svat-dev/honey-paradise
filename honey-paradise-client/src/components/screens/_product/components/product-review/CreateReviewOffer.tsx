import { Button, Title } from "@/components/ui/common";

import dynamic from "next/dynamic";
import type { FC } from "react";

const DynamicCreateReviewDialog = dynamic(() => import("./CreateReviewDialog").then(mod => mod.CreateReviewDialog), { ssr: false });

interface IProps {
	productId: string;
}

const CreateReviewOffer: FC<IProps> = ({ productId }) => {
	return (
		<div>
			<Title size="sm" className="font-medium whitespace-nowrap">
				Хотите поделиться мнением?
			</Title>

			<p className="text-sm mb-2">Оцените товар, ваш отзыв будет полезен</p>

			<DynamicCreateReviewDialog productId={productId}>
				<Button className="px-3 py-2">Добавить отзыв</Button>
			</DynamicCreateReviewDialog>
		</div>
	);
};

export { CreateReviewOffer };
