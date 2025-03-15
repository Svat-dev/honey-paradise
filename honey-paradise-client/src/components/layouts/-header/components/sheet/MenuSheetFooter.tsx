import { LogoutButton } from "@/components/layouts/-sidebar/components/LogoutButton";
import { OrderButton } from "../OrderButton";
import { SheetFooter } from "@/components/ui";

const MenuSheetFooter = () => {
	return (
		<SheetFooter className="tw-mt-8 tw-items-end tw-gap-1">
			<OrderButton />
			<LogoutButton reversed />
		</SheetFooter>
	);
};

export { MenuSheetFooter };
