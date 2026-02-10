import type { MarkdownComponents } from "@md-parser/react"

import { Link, Separator, Title } from "../../common"

import { markdownTitleSizes } from "./data"

const HeadingRenderer: MarkdownComponents["heading"] = ({
	children,
	level
}) => <Title size={markdownTitleSizes[level]}>{children}</Title>

const ParagraphRenderer: MarkdownComponents["paragraph"] = ({ children }) => (
	<p>{children}</p>
)

const LinkRenderer: MarkdownComponents["link"] = ({
	children,
	href,
	title
}) => (
	<Link
		href={href}
		title={title}
		className="text-blue-700 visited:text-purple-500 hover:underline"
	>
		{children}
	</Link>
)

const ListRenderer: MarkdownComponents["list"] = ({ children }) => (
	<ul className="ml-6">{children}</ul>
)

const ListItemRenderer: MarkdownComponents["listItem"] = ({ children }) => (
	<li>{children}</li>
)

const StrongRenderer: MarkdownComponents["strong"] = ({ children }) => (
	<strong>{children}</strong>
)

const ItalicRenderer: MarkdownComponents["emphasis"] = ({ children }) => (
	<em>{children}</em>
)

const StrikeThroughRenderer: MarkdownComponents["strikeThrough"] = ({
	children
}) => <del>{children}</del>

const CodeRenderer: MarkdownComponents["code"] = ({ value }) => (
	<pre>{value}</pre>
)

const InlineCodeRenderer: MarkdownComponents["inlineCode"] = ({ value }) => (
	<code>{value}</code>
)

const DividerRenderer: MarkdownComponents["divider"] = () => (
	<Separator orientation="horizontal" className="my-2 !bg-transparent" />
)

export const mdComponents: Partial<MarkdownComponents> = {
	heading: HeadingRenderer,
	paragraph: ParagraphRenderer,
	divider: DividerRenderer,
	link: LinkRenderer,
	list: ListRenderer,
	listItem: ListItemRenderer,
	strong: StrongRenderer,
	emphasis: ItalicRenderer,
	strikeThrough: StrikeThroughRenderer,
	code: CodeRenderer,
	inlineCode: InlineCodeRenderer
}
