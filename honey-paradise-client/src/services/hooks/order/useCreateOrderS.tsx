import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { orderService } from "@/services/order.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { CreateOrderResponse } from "@/shared/types/server"

import { CreateOrderToaster } from "./CreateOrderToaster"

export const useCreateOrderS = () => {
	const onSuccess = (data: CreateOrderResponse) => {
		toast.success(() => <CreateOrderToaster {...data} />, {
			duration: 4000
		})
	}

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.createOrder],
		mutationFn: () => orderService.create(),
		onSuccess: ({ data }) => onSuccess(data)
	})

	return {
		createOrder: mutateAsync,
		isCreatingOrder: isPending
	}
}
