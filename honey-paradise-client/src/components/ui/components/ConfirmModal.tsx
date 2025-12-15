"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/common";
import type { FC, PropsWithChildren } from "react";

import { useConfirmModal } from "./hooks/useConfirmModal";
import styles from "./styles/confirm-modal.module.scss";

interface IConfirmModalProps extends PropsWithChildren {
	heading: string;
	desc: string;
	onConfirm: VoidFunction;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ children, heading, desc, onConfirm }) => {
	const { close, confirm, isOpen, setIsOpen, t } = useConfirmModal(onConfirm);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className={styles["title"]}>{heading}</DialogTitle>
					<DialogDescription className={styles["description"]}>{desc}</DialogDescription>
				</DialogHeader>

				<DialogFooter className={styles["footer"]}>
					<Button variant="secondary" title={t("labels.confirm")} onClick={confirm}>
						{t("btns.confirm")}
					</Button>

					<Button variant="secondary" title={t("labels.cancel")} onClick={close}>
						{t("btns.cancel")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { ConfirmModal };
