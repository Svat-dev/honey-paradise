"use client";

import { AnimatePresence, m } from "motion/react";

import { Button } from "@/components/ui/common";
import dynamic from "next/dynamic";
import { useMiddlePart } from "../../hooks/useMiddlePart";
import { PresearchDataBlock } from "./PresearchDataBlock";

const DynamicSearchInput = dynamic(() => import("./SearchInput").then(mod => mod.SearchInput));

const MiddlePart = () => {
	const { isOpen, searchForm, searchOverlay, setSearchOverlay, setIsOpen, term, t } = useMiddlePart();

	return (
		<div className="relative w-full flex flex-row-reverse items-center">
			<Button
				variant="secondary"
				className="z-40 gap-2 p-2 !rounded-lg"
				title={t("labels.searchBtn", { isOpen: String(!isOpen) })}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<kbd id="key-combination">{isOpen ? "Esc" : "Ctrl+K"}</kbd>
			</Button>

			<DynamicSearchInput isOpen={isOpen} form={searchForm} setIsOpen={setIsOpen} setOverlay={setSearchOverlay} />

			<AnimatePresence>{isOpen && searchOverlay && <PresearchDataBlock term={term} />}</AnimatePresence>

			<AnimatePresence>
				{searchOverlay && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						id="search-overlay"
						onClick={() => setSearchOverlay(false)}
					></m.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export { MiddlePart };
