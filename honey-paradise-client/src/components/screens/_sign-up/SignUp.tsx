"use client";

import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { MainPart } from "./components/MainPart";
import { OptionalPart } from "./components/OptionalPart";
import type { TSearchParams } from "@/shared/types/base.type";
import _styles from "@styles/modules/auth-form-wrapper.module.scss";
import { cn } from "@utils/base";
import styles from "./styles/sign-up.module.scss";
import { useSignUp } from "./useSignUp";

interface IProps {
	searchParams: TSearchParams;
}

const SignUp: FC<IProps> = ({ searchParams }) => {
	const { dataStatus, onSubmit, signUpForm, isError, onRecaptchaChange, isActive, onClickToNext, onClickToPrevious, currentPart } =
		useSignUp(searchParams);

	return (
		<div
			data-status={dataStatus}
			className={cn(_styles["wrapper"], [currentPart === "main" ? styles["wrapper"] : styles["wrapper-higher"]])}
		>
			<span data-status={dataStatus} className={cn(_styles["border-line"], styles["border-line"])}></span>

			<FormProvider {...signUpForm}>
				<form className={_styles["form"]} onSubmit={signUpForm.handleSubmit(onSubmit)}>
					{currentPart === "main" && <MainPart onClickToNext={onClickToNext} isActive={isActive.main} />}

					{currentPart === "optional" && (
						<OptionalPart
							isError={isError}
							onRecaptchaChange={onRecaptchaChange}
							onClickToPrevious={onClickToPrevious}
							isActive={isActive.optional}
						/>
					)}
				</form>
			</FormProvider>
		</div>
	);
};

export { SignUp };
