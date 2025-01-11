import { type TypeGetMetadataFunction } from "../types/get-metadata.type";

const getTitle = (title: string): string => `Honey Paradise | ${title}`;

export const getMetadata: TypeGetMetadataFunction = ({
	title,
	description,
	ogTitle = title,
	ogDescription = description,
	ogImg,
	index = true,
}) => {
	const openGraph = {
		title: ogTitle || undefined,
		description: ogDescription || undefined,
		images: ogImg || undefined,
	};

	return {
		title: getTitle(title) || undefined,
		description: index ? description : undefined,

		openGraph: index ? openGraph : undefined,
	};
};
