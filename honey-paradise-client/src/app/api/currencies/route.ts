import type { AxiosError } from "axios"

import { errorCatch } from "@/api/api-helper"
import { currencyService } from "@/services/currency.service"

export async function GET() {
	try {
		const res = await currencyService.main()

		return new Response(JSON.stringify(res.data), { status: 200 })
	} catch (error) {
		const { errMsg } = errorCatch(error as AxiosError)

		return new Response(errMsg, { status: 500, statusText: errMsg })
	}
}
