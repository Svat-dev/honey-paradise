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
					DEFAULT: "#ffd700",
					foreground: "#ffed7a",
				},
				secondary: {
					DEFAULT: "#fefefe",
					darker: "#fffcdf",
					dark: "#fffcdfd9",
				},
				muted: {
					DEFAULT: "#4d4d4d",
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
