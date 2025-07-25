import * as countries from "i18n-iso-countries";

import type { Request } from "express";
import { lookup } from "geoip-lite";
import { SessionMetadata } from "src/shared/types/session-metadata.type";

import DeviceDetector = require("device-detector-js");

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export function getSessionMetadata(req: Request, userAgent: string): SessionMetadata {
	// const ip = IS_DEV_ENV
	// 	? "173.166.164.121"
	// 	: Array.isArray(req.headers["cf-connecting-ip"])
	// 	? req.headers["cf-connecting-ip"][0]
	// 	: req.headers["cf-connecting-ip"] ||
	// 	  (typeof req.headers["x-forwarded-for"] === "string" ? req.headers["x-forwarded-for"].split(",")[0] : req.ip);
	const ip = "172.22.224.1"; // pskov 109.207.190.162 tula 172.22.224.1

	const location = lookup(ip);
	const device = new DeviceDetector().parse(userAgent);

	return {
		location: {
			country: countries.getName(location?.country, "en") || "Неизвестно",
			city: location?.city || "Неизвестно",
			latidute: location?.ll[0] || 0,
			longitude: location?.ll[1] || 0,
		},
		device: {
			browser: device.client?.name,
			os: device.os?.name,
			type: device.device?.type,
		},
		ip,
	};
}
