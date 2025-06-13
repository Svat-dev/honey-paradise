import { EnumAppRoute, EnumConfirmationTypes } from "./shared/lib/constants/routes";

import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies, nextUrl } = request;

	const session = cookies.get("session")?.value;

	const isAuthRoute = nextUrl.pathname.startsWith(EnumAppRoute.AUTH);
	const isConfirmationRoute = nextUrl.pathname.startsWith(EnumAppRoute.CONFIRMATION);

	const searchParams = nextUrl.searchParams.get("type");

	if (
		!session &&
		isConfirmationRoute &&
		searchParams !== EnumConfirmationTypes.EMAIL &&
		searchParams !== EnumConfirmationTypes.PHONE &&
		searchParams !== EnumConfirmationTypes.SIGN_IN
	)
		return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	if (session && isAuthRoute) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*"],
};
