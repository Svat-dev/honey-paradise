import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { getAssetsPath } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils/base";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";

interface IProps {
	slug: string;
	images: string[];
}

const ProductCardImages: FC<IProps> = ({ images, slug }) => {
	const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
	const [photoIndex, setPhotoIndex] = useState<number>(0);

	const link = EnumAppRoute.PRODUCT + "/" + slug;

	return (
		<Link href={link} className="relative block h-52 overflow-hidden mb-1">
			<div className="absolute left-0 top-0 z-10 w-full h-full flex">
				{images?.map((url, i) => (
					<div className="grow-[1] cursor-pointer" key={url} onMouseEnter={() => setPhotoIndex(i)} onMouseLeave={() => setPhotoIndex(0)}>
						<div
							className={cn(
								"absolute left-1/2 top-0 z-[2] w-full h-full transition-all -translate-x-1/2 pointer-events-none bg-white flex items-center justify-center rounded-md",
								{ "opacity-0": i !== photoIndex }
							)}
						>
							<Image
								src={getAssetsPath(url)}
								alt={`Photo ${i + 1} of ${slug}`}
								className={cn("w-full h-full rounded-md shadow-md transition-opacity will-change-auto", {
									"opacity-0": isImgLoading,
								})}
								loading="lazy"
								width={300}
								height={208}
								onLoad={() => setIsImgLoading(false)}
							/>
							{isImgLoading && (
								<img src="/assets/some-image-icon.webp " alt="" className="absolute top-0 left-0 w-full h-full" aria-hidden />
							)}
						</div>
					</div>
				))}
			</div>
			<ul className="absolute z-10 left-0 bottom-0 py-1 w-full flex justify-center bg-muted/30 rounded-b-md" aria-hidden="true">
				{images.map((_, i) => (
					<li
						key={_}
						className={cn("block w-2 h-2 mx-1 shadow-lg rounded-full transition-colors bg-secondary will-change-auto", {
							"!bg-primary": i === photoIndex,
						})}
					></li>
				))}
			</ul>
		</Link>
	);
};

export { ProductCardImages };
