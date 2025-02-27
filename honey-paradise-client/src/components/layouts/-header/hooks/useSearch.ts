import { onInputRuleWithSpaces } from "@/shared/lib/utils/input-rule";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useSearch = () => {
	const searchForm = useForm<IForm>({
		defaultValues: { term: "" },
		mode: "onChange",
	});

	const t = useTranslations("layout.header");

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const value = searchForm.watch("term");

	const onClickReset = () => searchForm.resetField("term");
	const onClick = () => setIsOpen(prev => !prev);

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		const el = e.currentTarget;
		return onInputRuleWithSpaces(el);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "k") {
			e.preventDefault();
			return setIsOpen(!isOpen);
		}

		if (e.key === "Escape") {
			e.preventDefault();
			setIsOpen(false);
			return onClickReset();
		}
	};

	useEffect(() => window.addEventListener("keydown", onKeydown));

	return {
		isOpen,
		onClick,
		searchForm,
		onInput,
		value,
		onClickReset,
		t,
	};
};
