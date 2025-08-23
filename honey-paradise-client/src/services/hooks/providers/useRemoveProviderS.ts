import { providerService } from "@/services/providers.service";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

export const useRemoveProviderS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["remove user provider"],
		mutationFn: (id: string) => providerService.delete(id),
	});

	return useMemo(
		() => ({
			removeProviderAsync: mutateAsync,
			isRemoving: isPending,
		}),
		[mutateAsync, isPending]
	);
};
