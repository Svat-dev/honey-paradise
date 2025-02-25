import { type ICNProps } from "@/shared/types/base.type";
import { cn } from "@utils/base";
import { type FC } from "react";

interface IProps extends ICNProps {
	error: string;
}

const ErrorText: FC<IProps> = ({ error, className }) => {
	return <p className={cn("text-red-500 text-sm", className)}>{error}</p>;
};
export { ErrorText };
