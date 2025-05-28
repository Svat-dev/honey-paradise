import { LogoutButton } from "@/components/layouts/-sidebar/components/logout-button/LogoutButton";
import { SheetFooter } from "@/components/ui";
import { OrderButton } from "../OrderButton";
import { SelectLanguage } from "../SelectLanguage";

const MenuSheetFooter = () => {
	return (
		<SheetFooter className="tw-mt-8 tw-items-end tw-gap-1">
			<SelectLanguage />
			<OrderButton />
			<LogoutButton reversed />
		</SheetFooter>
	);
};

export { MenuSheetFooter };
