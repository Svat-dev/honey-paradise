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
import { type FC } from "react";
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
					<DialogTitle className="!tw-text-xl">{t("modals.more.title")}</DialogTitle>

					<DialogDescription className="!tw-leading-5 tw-ml-1">{t("modals.more.description")}</DialogDescription>
				</DialogHeader>

				{data.map(item => (
					<div className="tw-flex tw-items-center" key={item.id}>
						<span className="tw-font-medium">{item.text}</span>
						<span className="tw-ml-2 tw-text-muted">{item.value}</span>
					</div>
				))}

				<YMaps query={{ lang: lang as any }} preload>
					<div style={{ width: "100%", height: "18rem" }}>
						<Map defaultState={{ center, zoom: 16 }} width="100%" height="100%">
							<Placemark geometry={center} />
						</Map>
					</div>
				</YMaps>

				<DialogFooter className="!tw-justify-center">
					<Button variant="secondary" title={t("labels.closeBtn")} className="tw-py-2 tw-px-3 tw-border tw-border-muted" onClick={close}>
						{t("modals.more.closeBtn")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { SessionModal };
