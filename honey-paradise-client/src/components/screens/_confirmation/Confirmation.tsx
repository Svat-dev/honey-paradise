import type { TSearchParams } from "@/shared/types";
import { EnumConfirmationTypes } from "@constants/routes";
import type { FC } from "react";
import { EmailConfirmation } from "./components/EmailConfirmation";
import { SignInConfirmation } from "./components/SignInConfirmation";

interface IConfirmation {
	searchParams: TSearchParams;
}

const Confirmation: FC<IConfirmation> = ({ searchParams }) => {
	const type = searchParams.type as EnumConfirmationTypes;

	return (
		<>
			{type === EnumConfirmationTypes.EMAIL ? (
				<EmailConfirmation />
			) : type === EnumConfirmationTypes.SIGN_IN ? (
				<SignInConfirmation />
			) : type === EnumConfirmationTypes.PHONE ? (
				""
			) : undefined}
		</>
	);
};

export { Confirmation };
