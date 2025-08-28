import { useMutation, useQueryClient } from "@tanstack/react-query";

import { accountService } from "@/services/account.service";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateEmailS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount] });

	const { mutate, mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.updateEmail],
		mutationFn: (email: string) => accountService.updateEmail({ email }),
		onSuccess,
	});

	return {
		updateEmail: mutate,
		updateEmailAsync: mutateAsync,
		isEmailUpdating: isPending,
	};
};
