import { Button, Separator } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
import type { EnumGenders } from "@/shared/types/models";
import { VALUES } from "@constants/base";
import type { RefetchOptions } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useInfoSection } from "../../../hooks/useInfoSection";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	gender: EnumGenders | undefined;
	birthdate: string | undefined;
	username: string | undefined;
	phone: string | undefined;
	isLoading: boolean;
	refetch: (opts?: RefetchOptions) => void;
}

const InfoSection: FC<IProps> = ({ birthdate, gender, phone, username, isLoading, refetch }) => {
	const { data, form, isDisabled, onSubmit, setMask, isProfileUpdating, t, clearBirthdate } = useInfoSection(
		gender,
		birthdate,
		username,
		phone,
		refetch
	);

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
						/>
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
						/>
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
						<Button variant="secondary" type="submit" title={t("submitBtn")} isLoading={_isLoading} disabled={isDisabled || _isLoading}>
							{t("submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</ProfileSettingSection>
	);
};

export { InfoSection };
