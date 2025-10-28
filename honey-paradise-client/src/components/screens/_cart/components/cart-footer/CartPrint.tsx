import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common";
import { useCartPrint } from "../../hooks/useCartPrint";
import { PrinterIcon } from "lucide-react";

const CartPrint = () => {
  const { data, isOpen, setIsOpen } = useCartPrint();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex items-center gap-1 will-change-auto">
          <PrinterIcon size={20} />
          {"Распечатать"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {data.map((item) => (
          <DropdownMenuItem key={item.title} asChild>
            <Button
              variant="ghost"
              className="w-full !justify-start rounded-lg border border-transparent hover:border-muted"
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
