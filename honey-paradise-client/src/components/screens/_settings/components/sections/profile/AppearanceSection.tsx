import { Button, Separator } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
import { GetMySettingsResponse } from "@/shared/types/server";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useAppearanceSection } from "../../../hooks/useAppearanceSection";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	settings: GetMySettingsResponse | undefined;
	isAccLoading: boolean;
}

const AppearanceSection: FC<IProps> = ({ settings, isAccLoading }) => {
	const { clearValues, form, isDisabled, language_data, theme_data, currency_data, onSubmit, isSettingsUpdating, t } =
		useAppearanceSection(settings);

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<ProfileSettingSection title={t("appearance.title")} animate>
			<FormProvider {...form}>
				<form className={styles["appearance-form-wrapper"]} onSubmit={onSubmit}>
					<div>
						<p>{t("appearance.language.title")}</p>

						<FormInput name="language" title={t("labels.language.choose")} align="end" data={language_data} isLoading={isLoading} />

						<Button
							variant="secondary"
							title={t("labels.language.clear")}
							onClick={() => clearValues("language")}
							disabled={isLoading || !form.getValues("language")}
						>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<p>{t("appearance.theme.title")}</p>

						<FormInput name="theme" title={t("labels.theme.choose")} align="end" data={theme_data} isLoading={isLoading} />

						<Button
							variant="secondary"
							title={t("labels.theme.clear")}
							onClick={() => clearValues("theme")}
							disabled={isLoading || !form.getValues("theme")}
						>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<p>{t("appearance.currency.title")}</p>

						<FormInput name="currency" title={t("labels.currency.choose")} align="end" data={currency_data} isLoading={isLoading} />

						<Button
							variant="secondary"
							title={t("labels.currency.clear")}
							onClick={() => clearValues("currency")}
							disabled={isLoading || !form.getValues("currency")}
						>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<Separator />
						<Button
							variant="secondary"
							type="submit"
							title={t("appearance.submitBtn")}
							isLoading={isLoading}
							disabled={isLoading || isDisabled}
						>
							{t("appearance.submitBtn")}
						</Button>
					</div>
				</form>
			</FormProvider>
		</ProfileSettingSection>
	);
};

export { AppearanceSection };
