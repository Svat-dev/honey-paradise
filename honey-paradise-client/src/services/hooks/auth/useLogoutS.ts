import { authService } from "@/services/auth.service";
import { useAuth } from "@hooks/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogoutS = () => {
	const { exit } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess: exit,
	});

	return { logout: mutate, isLogoutLoading: isPending };
};
