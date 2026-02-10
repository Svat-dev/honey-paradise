import { EnumAppRoute } from "@constants/routes"
import {
	BellIcon,
	ClipboardListIcon,
	CoinsIcon,
	HeartIcon,
	LinkIcon,
	SettingsIcon,
	ShoppingCartIcon
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

import type { IAccountNavigation } from "../types/data.type"

export const useAccountSidebar = () => {
	const t = useTranslations("layout.account-sidebar.links")
	const locale = useLocale()
	const pathname = usePathname()

	const data: IAccountNavigation[] = useMemo(
		() => [
			{
				title: t("settings"),
				icon: SettingsIcon,
				route: EnumAppRoute.SETTINGS,
				isCurrent: pathname === EnumAppRoute.SETTINGS
			},
			{
				title: t("connections"),
				icon: LinkIcon,
				route: EnumAppRoute.CONNECTIONS,
				isCurrent: pathname === EnumAppRoute.CONNECTIONS
			},
			{
				title: t("notifications"),
				icon: BellIcon,
				route: EnumAppRoute.NOTIFICATIONS,
				isCurrent: pathname === EnumAppRoute.NOTIFICATIONS
			},
			{
				title: t("transactions"),
				icon: CoinsIcon,
				route: EnumAppRoute.MY_PAYMENTS,
				isCurrent: pathname === EnumAppRoute.MY_PAYMENTS
			},
			{
				title: t("deferred"),
				icon: HeartIcon,
				route: EnumAppRoute.FAVORITES,
				isCurrent: pathname === EnumAppRoute.FAVORITES
			},
			{
				title: t("cart"),
				icon: ShoppingCartIcon,
				route: EnumAppRoute.MY_CART,
				isCurrent: pathname === EnumAppRoute.MY_CART
			},
			{
				title: t("orders"),
				icon: ClipboardListIcon,
				route: EnumAppRoute.MY_ORDERS,
				isCurrent: pathname === EnumAppRoute.MY_ORDERS
			}
		],
		[pathname, locale]
	)

	return { data }
}
