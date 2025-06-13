import { EnumConfirmationTypes } from "@constants/routes";
import type { FC } from "react";
import { EmailConfirmation } from "./components/EmailConfirmation";
import { SignInConfirmation } from "./components/SignInConfirmation";

interface IConfirmation {
	type: EnumConfirmationTypes;
}

const Confirmation: FC<IConfirmation> = ({ type }) => {
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
