import { Button, Separator } from "@/components/ui/common";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { LoaderIcon, XIcon } from "lucide-react";

import type { FC } from "react";
import { FormInput } from "@/components/ui/components/form-input";
import { FormProvider } from "react-hook-form";
import { GetMeResponseGender } from "@/shared/types/server";
import { ProfileSettingSection } from "./ProfileSettingSection";
import { VALUES } from "@constants/base";
import _styles from "../../../styles/settings.module.scss";
import styles from "../../../styles/profile.module.scss";
import { useInfoSection } from "../../../hooks/useInfoSection";

interface IProps {
	gender: GetMeResponseGender | undefined;
	birthdate: string | undefined;
	username: string | undefined;
	phone: string | undefined;
	isLoading: boolean;
}

const InfoSection: FC<IProps> = ({ birthdate, gender, phone, username, isLoading }) => {
	const { data, form, isDisabled, onSubmit, setMask, isProfileUpdating, t, clearBirthdate, uniqueFields, isCheckingUnique } =
		useInfoSection(gender, birthdate, username, phone);

	const _isLoading = isLoading || isProfileUpdating;

	return (
		<ProfileSettingSection title={t("title")}>
			<FormProvider {...form}>
				<form className={styles["info-form-wrapper"]} onSubmit={onSubmit}>
					<div>
						<p>{t("username.title")}</p>
						<FormInput
							name="username"
							placeholder={t("username.placeholder")}
							errorClassName="!-tw-bottom-4"
							tabIndex={1}
							isLoading={_isLoading}
							maxLength={VALUES.MAX_ID_LENGTH}
						>
							{uniqueFields.username === true ? (
								<CheckmarkIcon className={_styles["unique-status-icon"]} />
							) : uniqueFields.username === false ? (
								<ErrorIcon className={_styles["unique-status-icon"]} />
							) : uniqueFields.username === "loading" ? (
								<LoaderIcon size={20} className={_styles["unique-status-loading-icon"]} />
							) : undefined}
						</FormInput>
					</div>

					<div>
						<p>{t("phone.title")}</p>
						<FormInput
							name="phone"
							placeholder={t("phone.placeholder")}
							setMask={setMask}
							tabIndex={2}
							isLoading={_isLoading}
							errorClassName="!-tw-bottom-4"
						>
							{uniqueFields.phone === true ? (
								<CheckmarkIcon className={_styles["unique-status-icon"]} />
							) : uniqueFields.phone === false ? (
								<ErrorIcon className={_styles["unique-status-icon"]} />
							) : uniqueFields.phone === "loading" ? (
								<LoaderIcon size={20} className={_styles["unique-status-loading-icon"]} />
							) : undefined}
						</FormInput>
					</div>

					<div>
						<p>{t("birthdate.title")}</p>
						<FormInput
							name="birthdate"
							containerClassName="tw-mr-2"
							dateConfig={{ dateMax: new Date().getTime() - 14 * 365 * 24 * 60 * 60 * 1000 }}
							isLoading={_isLoading}
						/>
						<Button variant="secondary" onClick={clearBirthdate} disabled={_isLoading || !!!form.getValues("birthdate")}>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<p>{t("gender.title")}</p>
						<FormInput name="gender" genderType="dropdown" title={t("gender.label")} data={data} isLoading={_isLoading} />
					</div>

					<div>
						<Separator />
						<Button
							variant="secondary"
							type="submit"
							title={t("submitBtn")}
							isLoading={_isLoading || isCheckingUnique}
							disabled={isDisabled || _isLoading || isCheckingUnique}
						>
							{t("submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</ProfileSettingSection>
	);
};

export { InfoSection };
