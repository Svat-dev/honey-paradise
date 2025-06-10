import { onInputRuleWithSpaces } from "@/shared/lib/utils/input-rule";
import { useTranslations } from "next-intl";
import { type ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useSearch = () => {
	const t = useTranslations("layout.header");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const searchForm = useForm<IForm>({
		defaultValues: { term: "" },
		mode: "onChange",
	});

	const value = searchForm.watch("term");
	const input = searchForm.control._fields["term"]?._f.ref as HTMLInputElement;

	const onClickReset = () => searchForm.resetField("term");
	const onClick = (type: "open" | "close") => {
		if (type === "open") {
			input.focus();

			return setIsOpen(true);
		} else {
			input.blur();

			return setIsOpen(false);
		}
	};

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
		onClick,
		searchForm,
		onInput,
		value,
		onClickReset,
		isOpen,
		t,
	};
};
