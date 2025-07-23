import { useTranslations } from "next-intl";
import { useState } from "react";

export const useConfirmModal = (onConfirm: VoidFunction) => {
	const t = useTranslations("shared.confirmModal");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const close = () => setIsOpen(false);

	const confirm = () => {
		try {
			onConfirm();
			close();
		} catch (e) {}
	};

	return { t, isOpen, setIsOpen, confirm, close };
};
