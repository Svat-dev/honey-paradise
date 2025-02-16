import type { Config } from "tailwindcss";

export default {
	content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	darkMode: "media",
	prefix: "tw-",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: "rgba(var(--primary))",
					foreground: "rgba(var(--primary-foreground))",
				},
				accent: {
					DEFAULT: "rgba(var(--accent))",
					foreground: "rgba(var(--accent-foreground))",
				},
				secondary: {
					DEFAULT: "rgba(var(--secondary))",
					foreground: "rgba(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "rgba(var(--muted))",
				},
				input: "rgba(var(--input))",
				background: "rgba(var(--background))",
			},
			transitionDuration: {
				DEFAULT: "300ms",
				"250": "250ms",
				"350": "350ms",
			},
			height: {
				"15": "3.75rem",
			},
		},
	},
	plugins: [],
} satisfies Config;
