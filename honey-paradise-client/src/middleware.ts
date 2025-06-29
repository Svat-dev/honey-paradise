import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { EnumPasswordRecoverTabs } from "./components/screens/_password-recovery/types/type";
import { EnumAppRoute } from "./shared/lib/constants/routes";

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies, nextUrl } = request;

	const session = cookies.get("session")?.value;

	const isAuthRoute = nextUrl.pathname.startsWith(EnumAppRoute.AUTH);
	const isAccountRoute = nextUrl.pathname.startsWith(EnumAppRoute.ACCOUNT);

	const isConfirmationRoute = nextUrl.pathname.startsWith(EnumAppRoute.CONFIRMATION);
	const isPasswordRecoveryRoute = nextUrl.pathname.startsWith(EnumAppRoute.PASSWORD_RECOVERY);

	const searchParams = nextUrl.searchParams;

	if (!session && isConfirmationRoute && !searchParams.get("type")) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	if (!session && isAccountRoute) return NextResponse.redirect(new URL(EnumAppRoute.NOT_AUTH, url));

	if (!session && isPasswordRecoveryRoute) {
		if (!searchParams.get("type")) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

		if (searchParams.get("type") === EnumPasswordRecoverTabs.CHANGE && !searchParams.get("token"))
			return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));
	}

	if (session && isAuthRoute) return NextResponse.redirect(new URL(EnumAppRoute.INDEX, url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*"],
};
