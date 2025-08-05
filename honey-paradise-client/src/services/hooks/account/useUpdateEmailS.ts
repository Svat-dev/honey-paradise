import { accountService } from "@/services/account.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateEmailS = () => {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationKey: ["update email"],
		mutationFn: (email: string) => accountService.updateEmail({ email }),
	});

	return {
		updateEmail: mutate,
		updateEmailAsync: mutateAsync,
		isEmailUpdating: isPending,
	};
};
