import { API_URL } from "@constants/base/base.const";
import axios, { type CreateAxiosDefaults } from "axios";
import { getContentType } from "./api-helper";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
};

export const defaultInstance = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);
