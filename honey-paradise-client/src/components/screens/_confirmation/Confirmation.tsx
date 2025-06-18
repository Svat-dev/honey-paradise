import type { TSearchParams } from "@/shared/types";
import { type EnumAppRoute, EnumConfirmationTypes } from "@constants/routes";
import type { FC } from "react";
import { EmailConfirmation } from "./components/EmailConfirmation";
import { SignInConfirmation } from "./components/SignInConfirmation";

interface IConfirmation {
	searchParams: TSearchParams;
}

const Confirmation: FC<IConfirmation> = ({ searchParams }) => {
	const type = searchParams.type as EnumConfirmationTypes;
	const utm_source = searchParams.utm_source as EnumAppRoute;

	return (
		<>
			{type === EnumConfirmationTypes.EMAIL ? (
				<EmailConfirmation utm_source={utm_source} />
			) : type === EnumConfirmationTypes.SIGN_IN ? (
				<SignInConfirmation />
			) : type === EnumConfirmationTypes.PHONE ? (
				""
			) : undefined}
		</>
	);
};

export { Confirmation };
