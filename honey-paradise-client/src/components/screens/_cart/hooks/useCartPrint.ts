import { useLanguage } from "@/shared/lib/i18n/hooks";
import { ArrowDownToLineIcon, type LucideIcon, PrinterIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

interface IOpts {
	title: string;
	label: string;
	Icon: LucideIcon;
	fn: () => void;
}

export const useCartPrint = () => {
	const t = useTranslations("global.cart.content");
	const { locale } = useLanguage();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const data: IOpts[] = useMemo(
		() => [
			{
				title: t("footer.print.opt1"),
				label: t("footer.print.labels.opt1"),
				Icon: PrinterIcon,
				fn: () => console.log("Print cart here"),
			},
			{
				title: t("footer.print.opt2"),
				label: t("footer.print.labels.opt2"),
				Icon: ArrowDownToLineIcon,
				fn: () => console.log("Save cart as .pdf"),
			},
		],
		[locale]
	);

	return {
		isOpen,
		setIsOpen,
		data,
		t,
	};
};
