import { Button, Separator, Switch, Title } from "@/components/ui/common";
import { Edit2Icon, KeyRoundIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";

import type { TRefetchFunction } from "@/shared/types";
import dynamic from "next/dynamic";
import type { FC } from "react";
import slugify from "slugify";
import { useSecuritySection } from "../../../hooks/useSecuritySection";
import styles from "../../../styles/account.module.scss";

const DynamicChangePasswordModal = dynamic(() => import("./ChangePasswordModal").then(mod => mod.ChangePasswordModal));

interface ISecuritySection {
	isTFAEnabled: boolean | undefined;
	isFullLogoutEnabled: boolean | undefined;
	accRefetch: TRefetchFunction;
	isAccLoading: boolean;
}

const SecuritySection: FC<ISecuritySection> = ({ isFullLogoutEnabled, isTFAEnabled, accRefetch, isAccLoading }) => {
	const { isSettingsUpdating, onSwitchChange, getTitles, t } = useSecuritySection(accRefetch);

	const isLoading = isSettingsUpdating || isAccLoading;

	return (
		<section className={styles["security-wrapper"]}>
			<Title size="sm">
				{t("security.title")}
				<a className="tw-opacity-0 tw-size-0" id={slugify(t("security.title"), { locale: "en", lower: true })} />
			</Title>

			<div>
				<div>
					<KeyRoundIcon size={24} aria-hidden />
				</div>

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

			<Separator orientation="horizontal" />

			<div>
				<div>
					<ShieldCheckIcon size={24} aria-hidden />
				</div>

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

			<Separator orientation="horizontal" />

			<div className="tw-mb-2">
				<div>
					<LogOutIcon size={24} aria-hidden />
				</div>

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
