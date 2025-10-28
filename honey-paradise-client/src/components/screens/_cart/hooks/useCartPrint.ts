import { useLanguage } from "@/shared/lib/i18n/hooks";
import { ArrowDownToLineIcon, type LucideIcon, PrinterIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

interface IOpts {
  title: string;
  label: string;
  Icon: LucideIcon;
  fn: () => void;
}

export const useCartPrint = () => {
  // const t = useTranslations();
  const { locale } = useLanguage();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const data: IOpts[] = useMemo(
    () => [
      {
        title: "Распечатать",
        label: "Распечатать без сохранения",
        Icon: PrinterIcon,
        fn: () => console.log("Print cart here"),
      },
      {
        title: "Сохранить в .pdf",
        label: "Сохранить файл в .pdf",
        Icon: ArrowDownToLineIcon,
        fn: () => console.log("Save cart as .pdf"),
      },
    ],
    [locale],
  );

  return {
    isOpen,
    setIsOpen,
    data,
  };
};
