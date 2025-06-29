import { LogoutButton } from "@/components/layouts/-root-sidebar/components/logout-button/LogoutButton";
import { SheetFooter } from "@/components/ui";
import { OrderButton } from "../OrderButton";
import { SelectLanguageDM } from "../SelectLanguageDM";

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
