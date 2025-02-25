"use client";

import { Button, Input } from "@/components/ui";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@utils/base";
import { FormProvider } from "react-hook-form";
import { useSearch } from "../hooks/useSearch";
import styles from "../styles/middle-part.module.scss";

const MiddlePart = () => {
	const { isOpen, onClick, searchForm, onInput, value, onClickReset } = useSearch();

	return (
		<div className={styles["block"]}>
			<Button
				variant="secondary"
				title="Поиск"
				className={cn(styles["search-button"], { "tw-animate-delete-effect": isOpen })}
				onClick={onClick}
			>
				<SearchIcon size={22} />
				<kbd id="key-combination" className="search">
					Ctrl+K
				</kbd>
			</Button>

			<FormProvider {...searchForm}>
				<form className={cn(styles["search-input"], { "!tw-w-full !tw-px-2 !tw-pointer-events-auto": isOpen })}>
					<button type="submit" title="Найти">
						<SearchIcon size={24} />
					</button>

					<Input
						type="search"
						inputMode="search"
						spellCheck={false}
						autoComplete="off"
						autoCorrect="off"
						placeholder="Введите запрос..."
						onInput={onInput}
						{...searchForm.register("term", { maxLength: 60 })}
					/>

					<button
						type="button"
						title="Очистить"
						className={cn(styles["delete-btn"], { "!tw-opacity-100 !tw-pointer-events-auto": value })}
						onClick={onClickReset}
					>
						<XIcon size={22} />
					</button>

					<Button variant="secondary" title="Закрыть" className={styles["close-btn"]} onClick={onClick}>
						<kbd>Esc</kbd>
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export { MiddlePart };
