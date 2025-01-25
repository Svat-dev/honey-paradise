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
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					darker: "var(--secondary-yellow)",
					dark: "var(--secondary-yellow-muted)",
				},
				muted: {
					DEFAULT: "var(--muted)",
				},
			},
		},
		transitionDuration: {
			DEFAULT: "300ms",
			"250": "250ms",
			"350": "350ms",
		},
	},
	plugins: [],
} satisfies Config;
