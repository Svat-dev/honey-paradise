import { useEffect, useState } from "react";

import type { TConfirmationFields } from "@schemas/confirmation.schema";
import { useConfirmation } from "./useConfirmation";

export const useEmailConfirmation = () => {
	const limit = 6;
	const base_cooldown = 30;

	const { confirmationForm, dataStatus, setDataStatus, t } = useConfirmation(limit);
	const [cooldown, setCooldown] = useState<number>(base_cooldown);

	setTimeout(() => {
		if (cooldown === 0) return;

		setCooldown(cooldown - 1);
	}, 1000);

	const refreshCode = async () => {
		setCooldown(base_cooldown);
	};

	const onSubmit = async (data: TConfirmationFields) => {
		console.log(data);
	};

	useEffect(() => {
		if (confirmationForm.formState.errors.pin) confirmationForm.clearErrors("pin");
	}, [confirmationForm.getValues("pin")]);

	return { t, dataStatus, confirmationForm, onSubmit: confirmationForm.handleSubmit(onSubmit), limit, cooldown, refreshCode };
};
