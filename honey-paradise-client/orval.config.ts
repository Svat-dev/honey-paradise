import * as dotenv from "dotenv";

import { defineConfig } from "orval";

dotenv.config();

export default defineConfig({
	client: {
		input: `${process.env.NEXT_PUBLIC_SERVER_URL}/docs/openapi.json`,
		output: { schemas: "./src/shared/types/server" },
	},
});
