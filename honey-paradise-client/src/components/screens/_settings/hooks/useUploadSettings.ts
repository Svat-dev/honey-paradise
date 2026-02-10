import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { type ChangeEvent, useRef } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useUploadSettingsS } from "@/services/hooks/profile"

export const useUploadSettings = () => {
	const t = useTranslations("global.settings.content.account.content.actions")

	const inputRef = useRef<HTMLInputElement>(null)

	const { uploadSettingsAsync, isSettingsUploading } = useUploadSettingsS()

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) return false

		try {
			const formData = new FormData()
			formData.append("settings", file)

			await uploadSettingsAsync(formData)
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError)
			toast.error(errMsg)
		}
	}

	const handleUploadFile = () => inputRef.current?.click()

	return {
		t,
		inputRef,
		handleFileChange,
		handleUploadFile,
		isSettingsUploading
	}
}
