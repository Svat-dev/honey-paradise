import type { ICNProps } from "@/shared/types";

export interface IStartRatingProps extends ICNProps {
	animate?: boolean;
	rating?: number;
	starCount?: number;
	defaultRating?: number;
	readOnly?: boolean;
	size?: number;
	onChangeRating?: (rating: number) => void;
	color?: string;
	bgColor?: string;
}
