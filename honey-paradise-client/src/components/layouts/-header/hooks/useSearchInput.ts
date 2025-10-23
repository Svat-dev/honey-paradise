import { EnumStorageKeys } from "@/shared/lib/constants/base";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { onInputRuleWithSpaces } from "@/shared/lib/utils/auth/input-rule";
import type { ReactStateHook } from "@/shared/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ISearchFormFields, ISearchHistory } from "./types/use-search.type";

export const useSearchInput = (
	setOpen: ReactStateHook<boolean>,
	setOverlay: ReactStateHook<boolean>,
	isOpen: boolean,
	form: UseFormReturn<ISearchFormFields, any, ISearchFormFields>
) => {
	const t = useTranslations("layout.header");
	const { push } = useRouter();

	const q = form.watch("q");
	const input = form.control._fields["q"]?._f.ref as HTMLInputElement;

	const clear = () => form.resetField("q");

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		const el = e.currentTarget;
		return onInputRuleWithSpaces(el);
	};

	const onFocus = () =>
		setOverlay(prev => {
			if (isOpen && !prev) return true;
			else if (!isOpen && prev) return false;
			else return prev;
		});

	const onKeydown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "k") {
			e.preventDefault();
			setOpen(prev => !prev);
		}

		if (e.key === "Escape") {
			e.preventDefault();
			setOpen(false);
		}
	};

	const onSubmit = (data: ISearchFormFields) => {
		const qs = new URLSearchParams();
		qs.set("q", data.q);

		const history: ISearchHistory[] = JSON.parse(localStorage.getItem(EnumStorageKeys.SEARCH_HISTORY) || "[]");
		if (!history.find(item => item.q === data.q)) {
			if (history.length >= 6) history.shift();

			const url = EnumAppRoute.CATALOG + "?" + qs.toString();

			history.push({ q: data.q, url });
			localStorage.setItem(EnumStorageKeys.SEARCH_HISTORY, JSON.stringify(history));
		}

		setOpen(false);
		push(EnumAppRoute.CATALOG + "?" + qs.toString());
	};

	useEffect(() => {
		if (input.blur) {
			if (isOpen) input?.focus();
			else input?.blur();
		}
	}, [isOpen]);

	useEffect(() => {
		window.addEventListener("keydown", onKeydown);

		return () => {
			try {
				window.removeEventListener("keydown", onKeydown);
			} catch (error) {
				console.error(error);
			}
		};
	});

	return {
		q,
		clear,
		onInput,
		onFocus,
		onSubmit: form.handleSubmit(onSubmit),
		t,
	};
};
