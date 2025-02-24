"use client";

import { Button, Input } from "@/components/ui";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@utils/base";
import styles from "../styles/middle-part.module.scss";

const MiddlePart = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onClick = () => setIsOpen(prev => !prev);

	const onKeydown = (e: KeyboardEvent) => {
		if (e.ctrlKey && e.key === "k") {
			e.preventDefault();
			setIsOpen(!isOpen);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", onKeydown);
	});

	return (
		<div className={styles["block"]}>
			<Button variant="secondary" className={cn(styles["search-button"], { "tw-animate-delete-effect": isOpen })} onClick={onClick}>
				<SearchIcon size={22} />
				<kbd id="key-combination" className="search">
					Ctrl+K
				</kbd>
			</Button>

			<div className={cn(styles["search-input"], { "!tw-w-full !tw-px-2 !tw-pointer-events-auto": isOpen })}>
				<button>
					<SearchIcon size={24} />
				</button>

				<Input
					type="search"
					inputMode="search"
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					placeholder="Введите запрос..."
					maxLength={60}
				/>

				<button className={styles["delete-btn"]}>
					<XIcon size={22} />
				</button>
			</div>
		</div>
	);
};

export { MiddlePart };
