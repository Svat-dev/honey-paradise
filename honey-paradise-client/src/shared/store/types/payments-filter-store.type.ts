import type { PaymentsControllerGetAllByUserParams } from "@/shared/types/server"

type TParams = {
	status: number[]
	pagination: number | null
} & Omit<PaymentsControllerGetAllByUserParams, "status">

export interface IPaymentFilterStore extends IActions {
	params: TParams
	isFilterUpdated: boolean
}

interface IActions {
	update: (data: Partial<TParams>) => void
	updatePagination: (length: number) => void
	reset: VoidFunction
}
