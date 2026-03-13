import type { PaymentsControllerGetAllByUserParams } from "@/shared/types/server"

type TParams = {
	status: number[]
} & Omit<PaymentsControllerGetAllByUserParams, "status">

export interface IPaymentFilterStore extends IActions {
	params: TParams
	isFilterUpdated: boolean
}

interface IActions {
	update: (data: Partial<TParams>) => void
	reset: VoidFunction
}
