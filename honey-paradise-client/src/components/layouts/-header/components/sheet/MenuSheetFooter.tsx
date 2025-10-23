import { LogoutButton } from "@/components/layouts/-root-sidebar/components/logout-button/LogoutButton";
import { SheetFooter } from "@/components/ui/common";
import { useMyAccount } from "@/shared/lib/hooks/auth";
import { OrderButton } from "../OrderButton";
import { SelectLanguageDM } from "../SelectLanguageDM";

const MenuSheetFooter = () => {
	const { user } = useMyAccount();

	return (
		<SheetFooter className="mt-8 items-end gap-1">
			{!user?.settings.defaultLanguage && <SelectLanguageDM />}
			<OrderButton />
			<LogoutButton reversed oneClick />
		</SheetFooter>
	);
};

export { MenuSheetFooter };
