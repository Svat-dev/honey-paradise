import { LogoutButton } from "@/components/layouts/-root-sidebar/components/logout-button/LogoutButton";
import { OrderButton } from "../OrderButton";
import { SelectLanguageDM } from "../SelectLanguageDM";
import { SheetFooter } from "@/components/ui/common";

const MenuSheetFooter = () => {
	return (
		<SheetFooter className="tw-mt-8 tw-items-end tw-gap-1">
			<SelectLanguageDM />
			<OrderButton />
			<LogoutButton reversed />
		</SheetFooter>
	);
};

export { MenuSheetFooter };
