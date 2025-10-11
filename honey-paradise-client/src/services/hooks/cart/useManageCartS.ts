import { cartService } from "@/services/cart.service";
import type { AddCartItemDto } from "@/shared/types/server";
import { queryKeys } from "@constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useAddCartItemS = () => {
	const onSuccess = () => {};

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.addCartItem],
		mutationFn: (dto: AddCartItemDto) => cartService.addToCart(dto),
		onSuccess,
	});

	return {
		addCartItemAsync: mutateAsync,
		isAddingCartItem: isPending,
	};
};

export const useDeleteCartItemS = () => {
	const onSuccess = () => {};

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteCartItem],
		mutationFn: (ciid: number) => cartService.deleteFromCart(ciid),
		onSuccess,
	});

	return {
		deleteCartItemAsync: mutateAsync,
		isDeletingCartItem: isPending,
	};
};

export const useClearCartS = () => {
	const onSuccess = () => {};

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.clearAllCart],
		mutationFn: () => cartService.clearAllCart(),
		onSuccess,
	});

	return {
		clearCartAsync: mutateAsync,
		isClearingCart: isPending,
	};
};
