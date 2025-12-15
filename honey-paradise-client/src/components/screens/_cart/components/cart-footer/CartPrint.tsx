import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";

import { PrinterIcon } from "lucide-react";
import { useCartPrint } from "../../hooks/useCartPrint";

const CartPrint = () => {
	const { data, isOpen, setIsOpen, t } = useCartPrint();

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="flex items-center gap-1 will-change-auto">
					<PrinterIcon size={20} />
					{t("footer.print.opt1")}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{data.map(item => (
					<DropdownMenuItem key={item.title} asChild>
						<Button
							variant="ghost"
							className="w-full !justify-start rounded-lg border border-transparent hover:border-muted"
							title={item.label}
							onClick={item.fn}
						>
							<item.Icon size={20} />
							{item.title}
						</Button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { CartPrint };
