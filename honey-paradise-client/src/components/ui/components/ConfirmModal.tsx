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
import { useState, type FC, type PropsWithChildren } from "react";

interface IConfirmModalProps extends PropsWithChildren {
	heading: string;
	desc: string;
	onConfirm: VoidFunction;
}

const ConfirmModal: FC<IConfirmModalProps> = ({ children, heading, desc, onConfirm }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const close = () => setIsOpen(false);

	const confirm = () => {
		try {
			onConfirm();
			close();
		} catch (e) {}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="!tw-text-xl">{heading}</DialogTitle>
					<DialogDescription className="!tw-leading-5 tw-ml-1">{desc}</DialogDescription>
				</DialogHeader>

				<DialogFooter className="tw-items-center tw-px-1 !tw-justify-between">
					<Button variant="secondary" className="tw-py-2 tw-px-3" onClick={confirm}>
						{"Да"}
					</Button>

					<Button variant="secondary" className="tw-py-2 tw-px-3 tw-border tw-border-muted" onClick={close}>
						{"Отменить"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { ConfirmModal };
