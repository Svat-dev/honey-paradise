import createNextMdxPlugin from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts");
const withMdx = createNextMdxPlugin({});

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fonts.gstatic.com",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "4000",
			},
		],
	},
	env: {
		TELEGRAM_BOT_URL: process.env.TELEGRAM_BOT_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
	},
};

const nextConfigWithIntl = withMdx(withNextIntl(nextConfig));

export default nextConfigWithIntl;
