import { authService } from "@/services/auth.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useLogoutS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.logout],
		mutationFn: () => authService.logout(),
	});

	return { logoutAsync: mutateAsync, isLogoutLoading: isPending };
};
