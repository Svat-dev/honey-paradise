import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { orderService } from "@/services/order.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { CreateOrderResponse } from "@/shared/types/server"

export const useCreateOrderS = () => {
	const { push } = useRouter()

	const onSuccess = (data: CreateOrderResponse) => {
		toast.success(`Order on ${data.totalAmount} USD created successfully!`)
		push(data.confirmation_url)
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
