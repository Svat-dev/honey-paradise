import { MarkdownRenderer, type MarkdownRendererProps } from "@md-parser/react";
import type { FC } from "react";
import { mdComponents } from "./MarkdownElements";

interface IMarkdown extends Omit<MarkdownRendererProps, "components"> {
	children: string;
}

const Markdown: FC<IMarkdown> = ({ children, ...props }) => {
	return (
		<MarkdownRenderer components={mdComponents} {...props}>
			{children}
		</MarkdownRenderer>
	);
};

export { Markdown };
