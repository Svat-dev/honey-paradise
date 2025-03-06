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
			keyframes: {
				"delete-effect": {
					"50%": { opacity: "0.5" },
					"75%": { opacity: "0.25" },
					"90%": { opacity: "0.1" },
					to: { visibility: "hidden", display: "none", opacity: "0" },
				},
				"show-effect": {
					to: {
						opacity: "1",
					},
				},
			},
			animation: {
				"delete-effect": "delete-effect 300ms ease-in forwards",
				"show-effect": "show-effect 300ms ease-in forwards",
			},
			fontFamily: {
				rubik: "var(--font-rubik)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
