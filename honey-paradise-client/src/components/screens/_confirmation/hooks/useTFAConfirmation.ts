import { useVerifyTFACodeS } from "@/services/hooks/auth";
import { EnumAppRoute } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import type { TConfirmationFields } from "@schemas/confirmation.schema";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useConfirmation } from "./useConfirmation";

export const useTFAConfirmation = () => {
	const limit = 4;

	const { dataStatus, form, setDataStatus, t, cooldown, refreshCode, isTFACodeSending, timeout, onError } = useConfirmation(limit);

	const { replace } = useRouter();
	const { auth } = useAuth();

	const { isTFACodeVerifying, verifyTFACodeAsync } = useVerifyTFACodeS();

	const onSubmit = async (data: TConfirmationFields) => {
		try {
			await verifyTFACodeAsync({ token: data.pin });

			toast.success(t("2fa.toasters.success"));
			clearTimeout(timeout);
			setDataStatus("good");

			return setTimeout(() => {
				replace(EnumAppRoute.INDEX);
				auth();
			}, 2000);
		} catch (e) {
			onError(e as AxiosError);
		}
	};

	const isLoading = isTFACodeVerifying;

	return {
		isLoading,
		dataStatus,
		form,
		t,
		cooldown,
		refreshCode,
		limit,
		onSubmit: form.handleSubmit(onSubmit),
		isTFACodeSending,
	};
};
