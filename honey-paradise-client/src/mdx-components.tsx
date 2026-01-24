import type { MDXComponents } from "mdx/types"

import { Link, Title } from "@/components/ui/common"

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h2: ({ children }) => (
			<Title size="lg" className="mt-3">
				{children}
			</Title>
		),
		h3: ({ children }) => (
			<Title size="md" className="mt-5">
				{children}
			</Title>
		),
		h4: ({ children }) => (
			<Title size="sm" className="mt-3">
				{children}
			</Title>
		),
		h5: ({ children }) => (
			<Title size="xs" className="mt-2 font-medium">
				{children}
			</Title>
		),
		ul: ({ children }) => <ul style={{ padding: "0 32px" }}>{children}</ul>,
		li: ({ children }) => <li className="mb-1">{children}</li>,
		p: ({ children }) => <p className="px-4">{children}</p>,
		a: ({ children, href, ...props }) => (
			<Link
				href={href}
				target="_blank"
				style={{ fontWeight: 500 }}
				{...props}
				isOutside
			>
				{children}
			</Link>
		),
		...components
	}
}
