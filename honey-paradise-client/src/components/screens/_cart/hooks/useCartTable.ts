import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { cartService } from "@/services/cart.service"

export const useCartTable = () => {
	const t = useTranslations("global.cart.content.footer")

	const onDownload = async () => {
		try {
			const res = await cartService.getMyCartTable()

			const blob = new Blob([res.data])
			const url = window.URL.createObjectURL(blob)

			const a = document.createElement("a")
			a.href = url
			a.download = `cart-table.xlsx`

			document.body.appendChild(a)
			a.click()

			a.remove()
			window.URL.revokeObjectURL(url)
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			return errMsg ? toast.error(errMsg) : console.error(e)
		}
	}

	return { t, onDownload }
}
