import { SearchIcon } from "lucide-react"
import type { ChangeEvent, FC } from "react"
import { FormProvider, UseFormReturn } from "react-hook-form"

import type { ISearchFormFields } from "@/components/layouts/-header/hooks/types/use-search.type"
import { Input } from "@/components/ui/common"
import { VALUES } from "@/shared/lib/constants/base"
import { onInputRuleWithSpaces } from "@/shared/lib/utils/auth/input-rule"

interface IProps {
	form: UseFormReturn<ISearchFormFields, any, ISearchFormFields>
}

const TransactionsSearchInput: FC<IProps> = ({ form }) => {
	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		const el = e.currentTarget
		return onInputRuleWithSpaces(el)
	}

	return (
		<FormProvider {...form}>
			<form className="relative">
				<Input
					type="search"
					className="w-48 pl-10 text-sm focus:w-96 [&:not(:placeholder-shown)]:w-96 [&_~_svg]:focus:text-black"
					maxLength={VALUES.MAX_TRANSACTIONS_SEARCH_LENGTH}
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					placeholder="Поиск по описанию, номеру карты и т.д."
					onInput={onInput}
					{...form.register("q", {
						pattern: { value: /^[a-zA-Zа-яА-Я0-9_(). ,-]*$/, message: "" }
					})}
				/>
				<SearchIcon
					size={20}
					className="absolute left-2 top-1/2 -translate-y-1/2 text-muted transition-colors will-change-auto"
				/>
			</form>
		</FormProvider>
	)
}

export { TransactionsSearchInput }
