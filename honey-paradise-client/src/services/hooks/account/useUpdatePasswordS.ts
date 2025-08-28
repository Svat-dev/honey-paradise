import { EnumAppRoute, queryKeys } from "@constants/routes";

import { accountService } from "@/services/account.service";
import type { IUpdatePasswordDto } from "@/services/types/account-service.type";
import { EnumSessionStorageKeys } from "@constants/base";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useUpdatePasswordS = () => {
	const { replace } = useRouter();

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updatePassword],
		mutationFn: (dto: IUpdatePasswordDto) => accountService.updatePassword(dto),
		onSuccess: data => {
			if (typeof data.data !== "boolean") {
				if (data.data.res === "redirect/logout") {
					sessionStorage.removeItem(EnumSessionStorageKeys.CHANGE_PASSWORD_MODAL);
					return setTimeout(() => replace(EnumAppRoute.SIGN_IN), 300);
				}
			}
		},
	});

	return {
		updatePassword: mutate,
		updatePasswordAsync: mutateAsync,
		isPasswordUpdating: isPending,
	};
};
