import { useLanguage } from "@i18n/hooks"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"

import { getProviderIcon } from "@/shared/lib/utils/session/get-provider-icon"
import { getTimeAsWordString } from "@/shared/lib/utils/time"
import type { ISessionMetadata } from "@/shared/types/models/session.type"

import type { ISessionInfo } from "../types/session-modal.type"

export const useSessionModal = (
	metadata: ISessionMetadata,
	createdAt: string
) => {
	const { locale } = useLanguage(false)
	const t = useTranslations("global.settings.content.devices")
	const dt = useTranslations("shared.time")
	const mt = useTranslations("shared.auth.methods")

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [time, setTime] = useState<string>(getTimeAsWordString(createdAt))

	const center = [metadata.location.latidute, metadata.location.longitude]
	const lang = locale === "ru" ? "ru_RU" : "en_US"

	const data: ISessionInfo[] = useMemo(
		() => [
			{
				text: t("modals.more.content.device"),
				value: `${metadata.device.browser}, ${metadata.device.os}`
			},
			{
				text: t("modals.more.content.location"),
				value: `${metadata.location.country}, ${metadata.location.city}`
			},
			{
				text: t("modals.more.content.ip"),
				value: metadata.ip
			},
			{
				text: t("modals.more.content.method"),
				value: mt(metadata.method.toLowerCase() as any),
				icon: getProviderIcon(metadata.method)
			},
			{
				text: t("modals.more.content.time"),
				value: `${format(createdAt, "dd.MM.yyyy")}, (${time})`
			}
		],
		[locale]
	)

	useEffect(() => {
		setInterval(
			() => {
				setTime(getTimeAsWordString(createdAt, dt))
			},
			1000 * 60 * 3
		)
	}, [])

	return {
		isOpen,
		center,
		lang,
		data,
		setIsOpen,
		t
	}
}
