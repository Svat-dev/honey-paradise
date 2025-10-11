import { Button, Title } from "@/components/ui/common";
import { useAddCartItemS } from "@/services/hooks/cart";
import { useAuth, useMyAccount } from "@/shared/lib/hooks/auth";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { convertPrice, getAssetsPath } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils/base";
import type { ApiJsonValue, GetAllProductsResponse } from "@/shared/types/server";
import { HeartIcon, StarIcon } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import toast from "react-hot-toast";

interface IProps extends GetAllProductsResponse {}

const ProductCard: FC<IProps> = ({ id, _count, description, priceInUsd, rating, title, images, slug }) => {
	const { locale } = useLanguage();

	const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
	const [photoIndex, setPhotoIndex] = useState<number>(0);

	const { user } = useMyAccount();
	const { isAuthenticated } = useAuth();
	const { addCartItemAsync, isAddingCartItem } = useAddCartItemS();

	const onClick = async () => {
		try {
			await addCartItemAsync({ productId: id, quantity: 1, priceInUSD: priceInUsd });
		} catch (error) {
			toast.error("Произошла ошибка при добавлении товара в корзину");
		}
	};

	useEffect(() => {
		if (isAddingCartItem) toast.loading("Добавление товара в корзину...", { id: "add-to-cart" });
		else toast.remove("add-to-cart");
	}, [isAddingCartItem]);

	return (
		<m.article
			initial={{ opacity: 0, scale: 0.95, y: 10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="tw-grid tw-rounded-md tw-bg-primary tw-p-5 tw-pt-4 tw-w-[350px]"
		>
			<a href={`#${slug}`} className="tw-relative tw-block tw-h-52 tw-overflow-hidden tw-mb-1">
				<div className="tw-absolute tw-left-0 tw-top-0 tw-z-20 tw-w-full tw-h-full tw-flex">
					{images?.map((url, i) => (
						<div
							className="tw-grow-[1] tw-cursor-pointer"
							key={url}
							onMouseEnter={() => setPhotoIndex(i)}
							onMouseLeave={() => setPhotoIndex(0)}
						>
							<div
								className={cn(
									"tw-absolute tw-left-1/2 tw-top-0 tw-z-[2] tw-w-full tw-h-full tw-transition-all -tw-translate-x-1/2 tw-pointer-events-none tw-bg-white tw-flex tw-items-center tw-justify-center tw-rounded-md",
									{ "tw-opacity-0": i !== photoIndex }
								)}
							>
								<Image
									src={getAssetsPath(url)}
									alt={`Photo ${i + 1} of ${slug}`}
									className={cn("tw-w-full tw-h-full tw-rounded-md tw-shadow-md tw-transition-opacity tw-will-change-auto", {
										"tw-opacity-0": isImgLoading,
									})}
									loading="lazy"
									width={300}
									height={208}
									onLoad={() => setIsImgLoading(false)}
								/>
								{isImgLoading && (
									<img
										src="/assets/some-image-icon.webp "
										alt=""
										className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full"
										aria-hidden
									/>
								)}
							</div>
						</div>
					))}
				</div>
				<ul
					className="tw-absolute tw-z-30 tw-left-0 tw-bottom-0 tw-py-1 tw-w-full tw-flex tw-justify-center tw-bg-muted/30 tw-rounded-b-md"
					aria-hidden="true"
				>
					{images.map((_, i) => (
						<li
							key={_}
							className={cn(
								"tw-block tw-w-2 tw-h-2 tw-mx-1 tw-shadow-lg tw-rounded-full tw-transition-colors tw-bg-secondary tw-will-change-auto",
								{
									"!tw-bg-primary": i === photoIndex,
								}
							)}
						></li>
					))}
				</ul>
			</a>

			<Title size="md" className="tw-mb-1 tw-font-medium">
				{title[locale as keyof ApiJsonValue]}
			</Title>

			{description && <p className="tw-text-muted tw-mb-4">{description[locale as keyof ApiJsonValue]}</p>}

			<div className="tw-flex tw-items-center tw-gap-3 tw-mb-3 tw-text-muted">
				<span className="tw-inline-flex tw-items-center">
					<StarIcon size={24} className="tw-mr-1" />
					{rating}
				</span>
				<span>{_count.comments} отзыва</span>
			</div>

			<div className="tw-flex tw-items-center tw-mb-3">
				<span className="tw-mr-3 tw-text-lg">{convertPrice(priceInUsd, "USD")}</span>
				<span className="tw-pt-1 tw-line-through tw-text-base tw-text-muted">
					{convertPrice(priceInUsd + (priceInUsd / 100) * 10, "USD")}
				</span>
			</div>

			<div className="tw-flex tw-items-center tw-gap-3">
				<Button variant="secondary" title={"Добавить в корзину"} className="tw-py-2 tw-w-full" onClick={onClick}>
					Добавить в корзину
				</Button>
				{isAuthenticated && (
					<Button
						variant="ghost"
						title={"В избранное"}
						className="tw-relative tw-p-1 [&_>_svg]:hover:tw-fill-red-500 [&_>_div]:hover:tw-w-10"
					>
						<div className="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-h-0.5 tw-bg-red-500 -tw-rotate-45 tw-w-0 tw-transition-all" />
						<HeartIcon
							size={24}
							className={cn("tw-stroke-red-500 tw-fill-transparent tw-transition-colors tw-will-change-auto", {
								"tw-fill-red-500": "user.favorites",
							})}
						/>
					</Button>
				)}
			</div>
		</m.article>
	);
};

export { ProductCard };
