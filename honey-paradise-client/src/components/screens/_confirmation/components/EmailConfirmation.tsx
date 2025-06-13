"use client";

import { Button, Checkbox, Title } from "@/components/ui";

import { FormInput } from "@/components/ui/form-input";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import Image from "next/image";
import { FormProvider } from "react-hook-form";
import { useEmailConfirmation } from "../hooks/useEmailConfirmation";
import styles from "../styles/email-confirmation.module.scss";

const EmailConfirmation = () => {
	const { dataStatus, t, confirmationForm, onSubmit, limit, cooldown, refreshCode } = useEmailConfirmation();

	return (
		<section data-status={dataStatus} className={cn(_styles["wrapper"], styles["wrapper"])}>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])} />

			<FormProvider {...confirmationForm}>
				<form className={_styles["form"]} onSubmit={onSubmit}>
					<div className={styles["title-wrapper"]}>
						<div>
							<Title size="lg">{"Подтверждение почты"}</Title>
							<p>{"Вы почти создали свой аккаунт. Осталось только подтвердить вашу почту. Мы отправили код на указанную эл. почту"}</p>
						</div>

						<Image src="/assets/pincode-entering-icon.png" alt="" width={80} height={80} priority />
					</div>

					<FormInput
						name="pin"
						otpSlotsLimit={limit}
						containerClassName={styles["form-input-wrapper"]}
						errorClassName={styles["form-input-error"]}
						caretClassName="tw-h-7"
						className={styles["form-input-slot"]}
					/>

					<Checkbox containerClassName={styles["checkbox-wrapper"]} {...confirmationForm.register("signInAfter")}>
						{"Войти в аккаунт после подтверждения"}
					</Checkbox>

					<div className={styles["actions-wrapper"]}>
						<Button variant="secondary" disabled={cooldown !== 0} onClick={refreshCode}>
							{cooldown === 0 ? "Запросить новый код" : `Запросить новый код - ${cooldown} сек.`}
						</Button>

						<Button variant="secondary" type="submit">
							Подтвердить
						</Button>
					</div>
				</form>
			</FormProvider>
		</section>
	);
};

export { EmailConfirmation };
