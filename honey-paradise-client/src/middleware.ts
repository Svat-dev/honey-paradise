import { ROUTES_LANGUAGES, routing } from "@i18n/index";
import type { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";

export default createMiddleware(routing);

export const config = {
	matcher: ["/", `/${ROUTES_LANGUAGES}/:path*`],
};

export async function middleware(request: NextRequest, response: NextResponse) {}
