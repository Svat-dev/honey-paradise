"use client";

import { Button, Input } from "@/components/ui/common";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@utils/base";
import type { ChangeEvent, FC } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import styles from "../styles/middle-part.module.scss";

interface ISearchInput {
	t: any;
	isOpen: boolean;
	searchForm: UseFormReturn<IForm, any, IForm>;
	onInput: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickReset: VoidFunction;
	onClick: (type: "close" | "open") => void;
	value: string;
}

const SearchInput: FC<ISearchInput> = ({ t, isOpen, searchForm, onInput, onClickReset, value, onClick }) => {
	return (
		<FormProvider {...searchForm}>
			<form className={cn(styles["search-input"], { "!tw-w-full !tw-px-2 !tw-pointer-events-auto": isOpen })}>
				<button type="submit" title={t("labels.found")}>
					<SearchIcon size={24} />
				</button>

				<Input
					type="search"
					inputMode="search"
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					placeholder={`${t("search.placeholder")}...`}
					onInput={onInput}
					{...searchForm.register("term", { maxLength: 60 })}
				/>

				<button
					type="button"
					title={t("labels.clear")}
					className={cn(styles["delete-btn"], { "!tw-opacity-100 !tw-pointer-events-auto": value })}
					onClick={onClickReset}
				>
					<XIcon size={22} />
				</button>

				<Button variant="secondary" title={t("labels.close")} className={styles["close-btn"]} onClick={() => onClick("close")}>
					<kbd>Esc</kbd>
				</Button>
			</form>
		</FormProvider>
	);
};

export { SearchInput };
