import { zodResolver } from "@hookform/resolvers/zod";
import { createConfirmationSchema, type TConfirmationFields } from "@schemas/confirmation.schema";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { TDataStatus } from "../types/confirmation.type";

export const useConfirmation = (value: 4 | 6) => {
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");
	const t = useTranslations("global.confirmation.content");

	const confirmationSchema = createConfirmationSchema(t, value);

	const confirmationForm = useForm<TConfirmationFields>({
		resolver: zodResolver(confirmationSchema),
		defaultValues: {
			pin: "",
			signInAfter: true,
		},
		mode: "onSubmit",
	});

	return { dataStatus, t, confirmationForm, setDataStatus };
};
