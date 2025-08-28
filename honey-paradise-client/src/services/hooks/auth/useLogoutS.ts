import { authService } from "@/services/auth.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useAuth } from "@hooks/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutS = () => {
	const { exit } = useAuth();
	const { refresh } = useRouter();

	const onSuccess = () => {
		exit();
		refresh();
	};

	const { mutate, isPending } = useMutation({
		mutationKey: [queryKeys.logout],
		mutationFn: () => authService.logout(),
		onSuccess,
	});

	return { logout: mutate, isLogoutLoading: isPending };
};
