"use client";

import { Button } from "@/components/ui/common";
import { SearchIcon } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { cn } from "@utils/base";
import styles from "../styles/middle-part.module.scss";
import { useSearch } from "../hooks/useSearch";

const MiddlePart = () => {
	const { onClick, searchForm, onInput, value, onClickReset, isOpen, t } = useSearch();

	return (
		<div className={styles["block"]}>
			<Button
				variant="secondary"
				title={t("labels.search")}
				className={cn(styles["search-button"], { "tw-animate-delete-effect": isOpen })}
				onClick={() => onClick("open")}
			>
				<SearchIcon size={22} />
				<kbd id="key-combination" className="search">
					Ctrl+K
				</kbd>
			</Button>

			<SearchInput
				t={t}
				isOpen={isOpen}
				onClick={onClick}
				onClickReset={onClickReset}
				onInput={onInput}
				searchForm={searchForm}
				value={value}
			/>
		</div>
	);
};

export { MiddlePart };
