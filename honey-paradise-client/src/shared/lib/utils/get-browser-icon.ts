import { ChromeIcon, EdgeIcon, FirefoxIcon, OperaIcon, SafariIcon, YandexIcon } from "@/components/ui/common/icons";
import { CircleHelpIcon, type LucideProps } from "lucide-react";
import type { FC } from "react";
import type { TSessionBrowsers } from "./types/get-browser-icon.type";

export function getBrowserIcon(browser: TSessionBrowsers): FC<LucideProps> {
	switch (browser.toLowerCase()) {
		case "chrome":
			return ChromeIcon;
		case "firefox":
			return FirefoxIcon;
		case "safari":
			return SafariIcon;
		case "edge":
			return EdgeIcon;
		case "microsoft edge":
			return EdgeIcon;
		case "opera":
			return OperaIcon;
		case "yandex":
			return YandexIcon;
		case "yandex browser":
			return YandexIcon;
		default:
			return CircleHelpIcon;
	}
}
