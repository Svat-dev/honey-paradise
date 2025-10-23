import { AnimatePresence, m } from "motion/react";
import { ArrowDownToLineIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import type { FC } from "react";
import { cn } from "@/shared/lib/utils/base";
import { useDownloadSettings } from "../../../hooks/useDownloadSettings";

interface IProps {
	isLoading: boolean;
}

const DownloadSettings: FC<IProps> = ({ isLoading }) => {
	const { isOpen, setIsOpen, data, t } = useDownloadSettings();

	return (
		<div className="relative">
			<Button
				variant="default"
				className="items-center gap-2 px-2 py-1.5"
				title={t("labels.saveFileBtn")}
				disabled={isLoading}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<span>{t("actions.saveFile.btn")}</span>

				<ChevronDownIcon size={24} className={cn("transition-transform will-change-transform", { "rotate-180": isOpen })} />
			</Button>

			<AnimatePresence>
				{isOpen && (
					<m.div
						initial={{ opacity: 0, y: 15, x: "-50%" }}
						animate={{ opacity: 1, y: 5 }}
						exit={{ opacity: 0, y: 15 }}
						transition={{ type: "tween" }}
						className="absolute left-1/2 z-20 w-full bg-primary border border-muted rounded-md"
					>
						<ul className="list-none">
							{data.map(({ title, label, fn }) => (
								<li key={title} className="transition-colors will-change-auto hover:bg-black/10">
									<Button variant="ghost" onClick={() => fn()} className="w-full px-2 py-2 gap-1 !justify-start" title={label}>
										<ArrowDownToLineIcon size={20} />
										{title}
									</Button>
								</li>
							))}
						</ul>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export { DownloadSettings };
