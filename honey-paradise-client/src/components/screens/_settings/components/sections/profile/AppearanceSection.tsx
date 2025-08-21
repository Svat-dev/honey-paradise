import { Button, Separator } from "@/components/ui/common";
import type { ISettingsUser } from "@/shared/types/models";

import { FormInput } from "@/components/ui/components/form-input";
import type { TRefetchFunction } from "@/shared/types";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useAppearanceSection } from "../../../hooks/useAppearanceSection";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	settings: ISettingsUser | undefined;
	isAccLoading: boolean;
	refetch: TRefetchFunction;
}

const AppearanceSection: FC<IProps> = ({ settings, isAccLoading, refetch }) => {
	const { clearValues, form, isDisabled, language_data, theme_data, onSubmit, isSettingsUpdating, t } = useAppearanceSection(
		settings,
		refetch
	);

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<ProfileSettingSection title={t("appearance.title")}>
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
