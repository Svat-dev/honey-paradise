import type { ICurrencyResponse } from "@/services/types/currency-service.type";
import { Nullable } from "@/shared/types";

export interface ICurrenciesFetchStore extends IActions, Nullable<ICurrencyResponse> {}

interface IActions {
	setData: (data: ICurrencyResponse) => void;
	reset: VoidFunction;
}
