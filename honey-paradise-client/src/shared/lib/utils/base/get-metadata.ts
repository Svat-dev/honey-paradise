"use server"

import { getTranslations } from "next-intl/server"

import type { TypeGetMetadataFunction } from "../types/get-metadata.type"

const getTitle = async (title: string): Promise<string> => {
	const t = await getTranslations("global")

	return `${t("logo")} | ${title}`
}

export const getMetadata: TypeGetMetadataFunction = async ({
	title,
	description,
	ogTitle = title,
	ogDescription = description,
	ogImg,
	index = true
}) => {
	const openGraph = {
		title: ogTitle || undefined,
		description: ogDescription || undefined,
		images: ogImg || undefined
	}

	return {
		title: (await getTitle(title)) || undefined,
		description: index ? description : undefined,

		openGraph
	}
}
