"use client";

import { errorCatch } from "@/api/api-helper";
import { Button } from "@/components/ui/common";
import { useMarkAsReadS } from "@/services/hooks/notifications";
import { EnumAppRoute } from "@constants/routes";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "react-hot-toast";

interface IProps {
	id: string;
	nid: string;
}

const NotificationsToaster: FC<IProps> = ({ id, nid }) => {
	const t = useTranslations("toasters.notifications.newNotification");

	const { push } = useRouter();
	const { markAsReadAsync, isMarkingAsRead } = useMarkAsReadS();

	const onMarkAsRead = async () => {
		try {
			await markAsReadAsync([nid]);

			toast.dismiss(id);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	const onView = () => {
		toast.dismiss(id);
		push(`${EnumAppRoute.NOTIFICATIONS}?page=1`);
	};

	return (
		<div className="tw-flex tw-flex-col tw-gap-2">
			<span className="tw-whitespace-nowrap">{t("text")}</span>
			<div className="tw-flex tw-items-center tw-justify-between">
				<Button className="tw-py-1.5 tw-px-2" title={t("read")} onClick={onMarkAsRead} isLoading={isMarkingAsRead}>
					{t("read")}
				</Button>

				<Button className="tw-py-1.5 tw-px-2" title={t("check")} onClick={onView} disabled={isMarkingAsRead}>
					{t("check")}
				</Button>
			</div>
		</div>
	);
};

export { NotificationsToaster };
