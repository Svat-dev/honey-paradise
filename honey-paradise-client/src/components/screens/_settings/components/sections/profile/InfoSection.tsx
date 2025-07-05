import { Button, Separator } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import type { EnumGenders } from "@/shared/types/models";
import { VALUES } from "@constants/base";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useInfoSection } from "../../../hooks/useInfoSection";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	gender: EnumGenders | undefined;
	birthdate: string | undefined;
	username: string | undefined;
	phone: string | undefined;
	isLoading: boolean;
}

const InfoSection: FC<IProps> = ({ birthdate, gender, phone, username, isLoading }) => {
	const { data, form, isDisabled, onSubmit, setMask } = useInfoSection(gender, phone, username, birthdate);

	return (
		<ProfileSettingSection title={"Личная информация"}>
			<FormProvider {...form}>
				<form className="tw-flex tw-flex-col tw-gap-6 tw-px-1 tw-mt-2 tw-mb-4" onSubmit={onSubmit}>
					<div className="">
						<p>{"Имя пользователя"}</p>
						<FormInput
							name="username"
							placeholder="Введите имя пользователя"
							errorClassName="!-tw-bottom-4"
							isLoading={isLoading}
							maxLength={VALUES.MAX_ID_LENGTH}
						/>
					</div>

					<div className="mb-2">
						<p>{"Номер телефона"}</p>
						<FormInput
							name="phone"
							placeholder="Введите номер телефона"
							setMask={setMask}
							isLoading={isLoading}
							errorClassName="!-tw-bottom-4"
						/>
					</div>

					<div className="tw-flex tw-items-center">
						<p>{"Дата рождения"}</p>
						<FormInput
							name="birthdate"
							dateConfig={{ dateMax: new Date().getTime() - 14 * 365 * 24 * 60 * 60 * 1000 }}
							isLoading={isLoading}
						/>
					</div>

					<div className="tw-flex tw-items-center tw-gap-3">
						<p>{"Ваш пол"}</p>
						<FormInput name="gender" genderType="dropdown" data={data} isLoading={isLoading} />
					</div>

					<div className="tw-flex tw-flex-col tw-items-end">
						<Separator className="tw-absolute tw-left-0" />
						<Button
							variant="secondary"
							type="submit"
							className="tw-py-1.5 tw-px-2 tw-border tw-border-muted tw-mr-6 tw-mt-4"
							isLoading={isLoading}
							disabled={isDisabled || isLoading}
						>
							{"Сохранить изменения"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</ProfileSettingSection>
	);
};

export { InfoSection };
