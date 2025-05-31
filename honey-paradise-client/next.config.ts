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
				hostname: "github.githubassets.com",
			},
			{
				protocol: "https",
				hostname: "fonts.gstatic.com",
			},
		],
	},
};

const nextConfigWithIntl = withMdx(withNextIntl(nextConfig));

export default nextConfigWithIntl;
