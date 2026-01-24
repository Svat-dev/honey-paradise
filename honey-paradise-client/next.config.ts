import createNextMdxPlugin from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/lib/i18n/request.ts")
const withMdx = createNextMdxPlugin({})

const nextConfig: NextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	reactStrictMode: true,
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "5000",
				pathname: "/static/**"
			}
		],
		unoptimized: true // Disable image optimization only for dev
	},
	env: {
		TELEGRAM_BOT_URL: process.env.TELEGRAM_BOT_URL,
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
		OPEN_EXCHANGE_RATES_APP_ID: process.env.OPEN_EXCHANGE_RATES_APP_ID
	}
}

const nextConfigWithIntl = withMdx(withNextIntl(nextConfig))

export default nextConfigWithIntl
