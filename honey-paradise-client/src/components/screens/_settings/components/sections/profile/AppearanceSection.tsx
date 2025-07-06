import { Button, Separator } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import type { ISettings } from "@/shared/types/models";
import type { RefetchOptions } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useAppearanceSection } from "../../../hooks/useAppearanceSection";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	settings: ISettings | undefined;
	isAccLoading: boolean;
	refetch: (opts?: RefetchOptions) => void;
}

const AppearanceSection: FC<IProps> = ({ settings, isAccLoading, refetch }) => {
	const { clearValues, form, isDisabled, language_data, theme_data, onSubmit, isSettingsUpdating } = useAppearanceSection(
		settings,
		refetch
	);

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<ProfileSettingSection title="Оформление сайта">
			<FormProvider {...form}>
				<form className={styles["appearance-form-wrapper"]} onSubmit={onSubmit}>
					<div>
						<p>{"Базовый язык сайта"}</p>
						<FormInput name="language" title={"Выберите язык"} align="end" data={language_data} isLoading={isLoading} />
						<Button variant="secondary" onClick={() => clearValues("language")} disabled={isLoading || !form.getValues("language")}>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<p>{"Базовая тема сайта"}</p>
						<FormInput name="theme" title={"Выберите тему"} align="end" data={theme_data} isLoading={isLoading} />
						<Button variant="secondary" onClick={() => clearValues("theme")} disabled={isLoading || !form.getValues("theme")}>
							<XIcon size={20} />
						</Button>
					</div>

					<div>
						<Separator />
						<Button
							variant="secondary"
							type="submit"
							title={"Сохранить изменения"}
							isLoading={isLoading}
							disabled={isLoading || isDisabled}
						>
							{"Сохранить изменения"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</ProfileSettingSection>
	);
};

export { AppearanceSection };
