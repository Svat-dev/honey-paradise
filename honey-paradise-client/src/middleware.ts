import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { EnumAppRoute } from "./shared/lib/constants/routes";

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies, nextUrl } = request;

	const session = cookies.get("session")?.value;

	const isAuthRoute = nextUrl.pathname.startsWith(EnumAppRoute.AUTH);
	const isConfirmationRoute = nextUrl.pathname.startsWith(EnumAppRoute.CONFIRMATION);

	if (!session && isConfirmationRoute && !nextUrl.searchParams.has("type")) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	if (session && isAuthRoute) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*"],
};
