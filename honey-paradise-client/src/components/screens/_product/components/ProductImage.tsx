import { Button, Separator, Skeleton } from "@/components/ui/common";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { getAssetsPath } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils/base";
import { m } from "motion/react";
import Image from "next/image";
import type { FC } from "react";
import { useProductImage } from "../hooks/useProductImage";

interface IProps {
	isLoading: boolean;
	images: string[];
}

const ProductImage: FC<IProps> = ({ isLoading, images }) => {
	const { imageUrl, imageIndex, isImageLoading, handleMouseEnter, handleMouseLeave, handleNextClick, handlePrevClick } =
		useProductImage(images);

	return (
		<section className="relative flex gap-7 p-6">
			<div className="flex flex-col gap-4">
				{images.map((url, i) => (
					<m.div
						key={url}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, type: "tween", delay: 0.3 * i }}
						className="relative w-20 h-fit bg-secondary rounded-md overflow-hidden"
						onMouseEnter={() => handleMouseEnter(i)}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className={cn("absolute w-1 h-full bg-muted opacity-0 pointer-events-none transition-opacity", {
								"opacity-100": imageIndex === i,
							})}
						/>
						<Image src={getAssetsPath(url)} alt="" width={80} height={60} aria-hidden />
					</m.div>
				))}

				<Separator orientation="horizontal" className="mt-2 -mb-1" />

				<div className="flex items-center gap-2 w-full">
					<Button variant="ghost" className="p-2 hover:!bg-muted/20" onClick={handlePrevClick} disabled={isImageLoading}>
						<ChevronLeftIcon size={24} />
					</Button>

					<Button variant="ghost" className="p-2 hover:!bg-muted/20" onClick={handleNextClick} disabled={isImageLoading}>
						<ChevronRightIcon size={24} />
					</Button>
				</div>
			</div>

			<div
				className={cn("overflow-hidden h-[25rem] opacity-100 will-change-auto transition-opacity", {
					"opacity-0 pointer-events-none": isImageLoading,
				})}
			>
				{isLoading ? (
					<Skeleton className="w-[28rem] h-[20rem]" />
				) : (
					<Image className="rounded-md" src={getAssetsPath(imageUrl)} alt="" width={448} height={320} />
				)}
			</div>
		</section>
	);
};

export { ProductImage };
