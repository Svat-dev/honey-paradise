import { Button } from "@/components/ui";
import { SearchIcon } from "lucide-react";

const MiddlePart = () => {
	return (
		<div className="tw-flex tw-flex-row-reverse tw-items-center">
			<Button variant="secondary" className="tw-px-3 tw-gap-1.5 tw-h-fit tw-py-0.5 tw-rounded-lg">
				<SearchIcon size={22} />
				<span className="tw-text-sm">Ctrl+K</span>
			</Button>
		</div>
	);
};

export { MiddlePart };
