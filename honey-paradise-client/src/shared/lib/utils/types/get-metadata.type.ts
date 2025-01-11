import { type Metadata } from "next";

export interface IParams {
	title: string;
	description: string;
	index?: boolean;
	ogTitle?: string;
	ogDescription?: string;
	ogImg?: string;
}

export type TypeGetMetadataFunction = ({}: IParams) => Metadata;
