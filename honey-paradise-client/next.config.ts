import type { NextConfig } from "next";

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

export default nextConfig;
