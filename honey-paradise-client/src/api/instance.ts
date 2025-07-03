import { API_URL } from "@constants/base/base.const";
import axios, { type CreateAxiosDefaults } from "axios";

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	// headers: getContentType(), // TODO Сделать content-type на все изображения тоже
	withCredentials: true,
};

export const defaultInstance = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);
