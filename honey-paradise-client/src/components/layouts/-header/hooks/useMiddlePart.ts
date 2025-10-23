import { useEffect, useState } from "react";

import { useDebounce } from "@/shared/lib/hooks/base";
import type { ReactStateHook } from "@/shared/types";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type { ISearchFormFields } from "./types/use-search.type";

export const useMiddlePart = () => {
	const t = useTranslations("layout.header");

	const [isOpen, _setIsOpen] = useState<boolean>(false);
	const [searchOverlay, setSearchOverlay] = useState<boolean>(false);

	const searchForm = useForm<ISearchFormFields>({
		defaultValues: { q: "" },
		mode: "onChange",
	});

	const setIsOpen: ReactStateHook<boolean> = value => {
		_setIsOpen(value);
		setSearchOverlay(!isOpen);
	};

	const term = useDebounce<string>(searchForm.watch("q"), 300);

	useEffect(() => {
		if (searchOverlay) {
			document.body.setAttribute("id", "none-scrollable-2");
		} else {
			if (document.body.getAttribute("id") === "none-scrollable-2") {
				document.body.removeAttribute("id");
			}
		}
	}, [searchOverlay]);

	return {
		t,
		isOpen,
		setIsOpen,
		setSearchOverlay,
		searchForm,
		term,
		searchOverlay,
	};
};
