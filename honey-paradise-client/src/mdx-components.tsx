import { Title } from "@/components/ui";
import type { MDXComponents } from "mdx/types";
import Link from "next/dist/client/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h2: ({ children }) => (
			<Title size="lg" className="tw-mt-3">
				{children}
			</Title>
		),
		h3: ({ children }) => (
			<Title size="md" className="tw-mt-5">
				{children}
			</Title>
		),
		h4: ({ children }) => (
			<Title size="sm" className="tw-mt-3">
				{children}
			</Title>
		),
		h5: ({ children }) => (
			<Title size="xs" className="tw-mt-2 tw-font-medium">
				{children}
			</Title>
		),
		ul: ({ children }) => <ul style={{ padding: "0 32px" }}>{children}</ul>,
		li: ({ children }) => <li className="tw-mb-1">{children}</li>,
		p: ({ children }) => <p className="tw-px-4">{children}</p>,
		a: ({ children, href, ...props }) => (
			<Link href={href} target="_blank" style={{ fontWeight: 500 }} {...props}>
				{children}
			</Link>
		),
		...components,
	};
}
