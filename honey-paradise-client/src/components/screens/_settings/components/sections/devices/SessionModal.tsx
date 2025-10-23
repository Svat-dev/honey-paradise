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
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import Image from "next/image";
import type { FC } from "react";
import { useSessionModal } from "../../../hooks/useSessionModal";
import type { ISessionModalProps } from "../../../types/session-modal.type";

const SessionModal: FC<ISessionModalProps> = ({ children, createdAt, metadata }) => {
	const { center, setIsOpen, data, isOpen, lang, t } = useSessionModal(metadata, createdAt);

	const close = () => setIsOpen(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="!text-xl">{t("modals.more.title")}</DialogTitle>

					<DialogDescription className="!leading-5 ml-1">{t("modals.more.description")}</DialogDescription>
				</DialogHeader>

				{data.map(item => (
					<div className="flex items-center" key={item.value}>
						<span className="font-medium">{item.text}</span>
						<span className="inline-flex items-center gap-1 ml-2 text-muted">
							{item.icon &&
								(typeof item.icon === "string" ? (
									<Image src={`/icons/providers/${item.icon}.svg`} alt={item.value} width={20} height={20} />
								) : (
									<item.icon size={20} />
								))}
							{item.value}
						</span>
					</div>
				))}

				<YMaps query={{ lang: lang as any }} preload>
					<div style={{ width: "100%", height: "18rem" }}>
						<Map defaultState={{ center, zoom: 16 }} width="100%" height="100%">
							<Placemark geometry={center} />
						</Map>
					</div>
				</YMaps>

				<DialogFooter className="!justify-center">
					<Button variant="secondary" title={t("labels.closeBtn")} className="py-2 px-3 border border-muted" onClick={close}>
						{t("modals.more.closeBtn")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { SessionModal };
