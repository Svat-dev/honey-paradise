import { Button, Separator, Title } from "@/components/ui/common";
import { FormProvider, useForm } from "react-hook-form";

import { FormInput } from "@/components/ui/components/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateAccountSchema, type TUpdateAccountFields } from "@schemas/update-account.schema";
import { useTranslations } from "next-intl";
import { useEffect, useState, type FC } from "react";

interface IProps {
	email: string | undefined;
	isAccLoading: boolean;
}

const EmailSection: FC<IProps> = ({ email, isAccLoading }) => {
	const t = useTranslations("global.settings.content.account");

	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const schema = createUpdateAccountSchema({});
	const form = useForm<TUpdateAccountFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: { email },
		defaultValues: { email },
	});

	useEffect(() => {
		const res = form.getValues("email") === form.formState.defaultValues?.email || !form.formState.isValid;
		return setIsDisabled(res);
	}, [form.getValues()]);

	const onSubmit = (data: any) => {
		console.log(data);
	};

	const isLoading = isAccLoading;

	return (
		<section className={"tw-relative tw-w-full tw-bg-primary tw-rounded-lg tw-p-3 tw-mb-5"}>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="tw-flex tw-flex-col tw-px-1 tw-mt-2 tw-mb-4">
					<Title size="sm" className="tw-font-medium">
						{"Электронная почта"}
					</Title>

					<FormInput
						name="email"
						type="email"
						placeholder={"Введите эл. почту"}
						isLoading={isAccLoading}
						errorClassName="!-tw-bottom-4"
						containerClassName="tw-mb-8 tw-mt-3"
					/>

					<div className="tw-flex tw-flex-col tw-items-end">
						<Separator className="tw-absolute tw-left-0" />
						<Button
							variant="secondary"
							type="submit"
							className="tw-py-1.5 tw-px-2 tw-border tw-border-muted tw-mr-6 tw-mt-4"
							title={"Подтвердить изменение эл. почты"}
							isLoading={isLoading}
							disabled={isLoading || isDisabled}
						>
							{"Подтвердить"}
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { EmailSection };
