import { Button, Switch, Title } from "@/components/ui/common";

import type { RefetchOptions } from "@tanstack/react-query";
import { Edit2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useSecuritySection } from "../../../hooks/useSecuritySection";
import styles from "../../../styles/account.module.scss";

const DynamicChangePasswordModal = dynamic(() => import("./ChangePasswordModal").then(mod => mod.ChangePasswordModal), { ssr: false });

interface ISecuritySection {
	isTFAEnabled: boolean | undefined;
	isFullLogoutEnabled: boolean | undefined;
	accRefetch: (opts?: RefetchOptions) => void;
	isAccLoading: boolean;
}

const SecuritySection: FC<ISecuritySection> = ({ isFullLogoutEnabled, isTFAEnabled, accRefetch, isAccLoading }) => {
	const { isSettingsUpdating, onSwitchChange, getTitles, t } = useSecuritySection(accRefetch);

	const isLoading = isSettingsUpdating || isAccLoading;

	return (
		<section className={styles["security-wrapper"]}>
			<Title size="sm">{t("security.title")}</Title>

			<div>
				<div>
					<p>{t("security.password.title")}</p>
					<p>{t("security.password.description")}</p>
				</div>

				<DynamicChangePasswordModal>
					<Button variant="secondary" title={t("labels.changePasswordBtn")} className="tw-p-2">
						<Edit2Icon size={18} />
					</Button>
				</DynamicChangePasswordModal>
			</div>

			<div>
				<div>
					<p>{t("security.2fa.title")} | 2FA</p>
					<p>{t("security.2fa.description")}</p>
				</div>

				<Switch
					title={getTitles().tfa}
					onCheckedChange={state => onSwitchChange(state, "isTFAEnabled")}
					checked={isTFAEnabled}
					isLoading={isLoading}
				/>
			</div>

			<div className="tw-mb-2">
				<div>
					<p>{t("security.fullLogout.title")}</p>
					<p>{t("security.fullLogout.description")}</p>
				</div>

				<Switch
					title={getTitles().fullLogout}
					onCheckedChange={state => onSwitchChange(state, "useFullLogout")}
					checked={isFullLogoutEnabled}
					isLoading={isLoading}
				/>
			</div>
		</section>
	);
};

export { SecuritySection };
