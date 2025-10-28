import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { getAssetsPath } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils/base";
import type { ICNProps } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";

interface IProps extends ICNProps {
  slug: string;
  images: string[];
  width?: number;
  height?: number;
}

const ProductCardImages: FC<IProps> = ({ images, slug, height, width, className }) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  const link = EnumAppRoute.PRODUCT + "/" + slug;

  return (
    <Link href={link} className={cn("relative block overflow-hidden", className)}>
      <div className="absolute left-0 top-0 z-10 w-full h-full flex">
        {images?.map((url, i) => (
          <div className="grow-[1] cursor-pointer" key={url} onMouseEnter={() => setPhotoIndex(i)} onMouseLeave={() => setPhotoIndex(0)}>
            <div
              className={cn(
                "absolute left-1/2 top-0 z-[2] w-full h-full transition-all -translate-x-1/2 pointer-events-none bg-white flex items-center justify-center rounded-md",
                { "opacity-0": i !== photoIndex },
              )}
            >
              <Image
                src={getAssetsPath(url)}
                alt={`Photo ${i + 1} of ${slug}`}
                className="w-full h-full rounded-md shadow-md transition-opacity will-change-auto"
                loading={i === 0 ? "eager" : "lazy"}
                loader={() => "/assets/some-image-icon.webp"}
                width={width || 300}
                height={height || 208}
              />
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
