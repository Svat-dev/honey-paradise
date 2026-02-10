import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { m } from "motion/react"
import Image from "next/image"
import type { FC } from "react"

import { Button, Separator, Skeleton } from "@/components/ui/common"
import { getAssetsPath } from "@/shared/lib/utils"
import { cn } from "@/shared/lib/utils/base"

import { useProductImage } from "../hooks/useProductImage"

interface IProps {
	isLoading: boolean
	images: string[]
}

const ProductImage: FC<IProps> = ({ isLoading, images }) => {
	const {
		imageUrl,
		imageIndex,
		isImageLoading,
		handleMouseEnter,
		handleMouseLeave,
		handleNextClick,
		handlePrevClick
	} = useProductImage(images)

	return (
		<section className="relative flex gap-7 p-6">
			<div className="flex flex-col gap-4">
				{images.map((url, i) => (
					<m.div
						key={url}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, type: "tween", delay: 0.3 * i }}
						className="relative h-fit w-20 overflow-hidden rounded-md bg-secondary"
						onMouseEnter={() => handleMouseEnter(i)}
						onMouseLeave={handleMouseLeave}
					>
						<div
							className={cn(
								"pointer-events-none absolute h-full w-1 bg-muted opacity-0 transition-opacity",
								{
									"opacity-100": imageIndex === i
								}
							)}
						/>
						<Image
							src={getAssetsPath(url)}
							alt=""
							width={80}
							height={60}
							aria-hidden
						/>
					</m.div>
				))}

				<Separator orientation="horizontal" className="-mb-1 mt-2" />

				<div className="flex w-full items-center gap-2">
					<Button
						variant="ghost"
						className="p-2 hover:!bg-muted/20"
						onClick={handlePrevClick}
						disabled={isImageLoading}
					>
						<ChevronLeftIcon size={24} />
					</Button>

					<Button
						variant="ghost"
						className="p-2 hover:!bg-muted/20"
						onClick={handleNextClick}
						disabled={isImageLoading}
					>
						<ChevronRightIcon size={24} />
					</Button>
				</div>
			</div>

			<div
				className={cn(
					"h-[25rem] overflow-hidden opacity-100 transition-opacity will-change-auto",
					{
						"pointer-events-none opacity-0": isImageLoading
					}
				)}
			>
				{isLoading ? (
					<Skeleton className="h-[20rem] w-[28rem]" />
				) : (
					<Image
						className="rounded-md"
						src={getAssetsPath(imageUrl)}
						alt=""
						width={448}
						height={320}
					/>
				)}
			</div>
		</section>
	)
}

export { ProductImage }
