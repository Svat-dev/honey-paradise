import { useEffect, useState } from "react";

export const useProductImage = (images: string[]) => {
	const [imageIndex, setImageIndex] = useState<number>(0);
	const [imageUrl, setImageUrl] = useState<string>(images[0]);

	const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
	const [isCarouselActive, setIsCarouselActive] = useState<boolean>(true);

	const handleMouseEnter = (index: number) => {
		setIsCarouselActive(false);
		setImageIndex(index);
	};

	const handleMouseLeave = () => setIsCarouselActive(true);

	const handlePrevClick = () => setImageIndex(prev => (prev - 1 + images.length) % images.length);

	const handleNextClick = () => setImageIndex(prev => (prev + 1) % images.length);

	useEffect(() => {
		setIsImageLoading(true);

		const timeout = setTimeout(() => {
			setIsImageLoading(false);
			setImageUrl(images[imageIndex]);
		}, 400);

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [imageIndex]);

	useEffect(() => {
		if (!isCarouselActive) return;

		const nextIndex = (imageIndex + 1) % images.length;
		const interval = setInterval(() => setImageIndex(nextIndex), 10000);

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [imageIndex, isCarouselActive]);

	return {
		handleMouseEnter,
		handleMouseLeave,
		handlePrevClick,
		handleNextClick,
		imageIndex,
		isImageLoading,
		imageUrl,
	};
};
