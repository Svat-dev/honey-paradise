import {
	API_URL,
	BASE_CURRENCY,
	OPEN_EXCHANGE_RATES_URL
} from "@constants/base/base.const"
import axios, { type CreateAxiosDefaults } from "axios"

import { getContentType } from "./api-helper"

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType("json"),
	withCredentials: true
}

const currencyInstanceOptions: CreateAxiosDefaults = {
	baseURL: OPEN_EXCHANGE_RATES_URL,
	headers: getContentType("json"),
	params: {
		app_id: process.env.OPEN_EXCHANGE_RATES_APP_ID,
		base: BASE_CURRENCY
	}
}

export const defaultInstance = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)
export const currencyInstance = axios.create(currencyInstanceOptions)
