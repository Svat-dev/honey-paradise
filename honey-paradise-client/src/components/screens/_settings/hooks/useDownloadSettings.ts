import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { profileService } from "@/services/profile.service"
import { useLanguage } from "@/shared/lib/i18n/hooks"

import type { IDownloadSettingsOpt } from "../types/download-file.type"

export const useDownloadSettings = () => {
	const t = useTranslations("global.settings.content.account.content")
	const { locale } = useLanguage(false)

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const onDownload = async (format: "json" | "yml") => {
		try {
			const res = await profileService.downloadSettings(format)

			const blob = new Blob([res.data])
			const url = window.URL.createObjectURL(blob)

			const a = document.createElement("a")
			a.href = url
			a.download = `user-settings.${format}`

			document.body.appendChild(a)
			a.click()

			a.remove()
			window.URL.revokeObjectURL(url)
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			return errMsg ? toast.error(errMsg) : console.error(e)
		} finally {
			setIsOpen(false)
		}
	}

	const data: IDownloadSettingsOpt[] = useMemo(
		() => [
			{
				title: t("actions.saveFile.opts.json"),
				label: t("labels.saveFileJson"),
				fn: () => onDownload("json")
			},
			{
				title: t("actions.saveFile.opts.yaml"),
				label: t("labels.saveFileYaml"),
				fn: () => onDownload("yml")
			}
		],
		[locale]
	)

	return {
		isOpen,
		setIsOpen,
		data,
		t
	}
}
