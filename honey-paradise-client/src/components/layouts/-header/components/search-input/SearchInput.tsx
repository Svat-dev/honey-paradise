import { SearchIcon, XIcon } from "lucide-react"
import { m } from "motion/react"
import type { FC } from "react"
import { FormProvider, type UseFormReturn } from "react-hook-form"

import type { ReactStateHook } from "@/shared/types"

import type { ISearchFormFields } from "../../hooks/types/use-search.type"
import { useSearchInput } from "../../hooks/useSearchInput"

interface ISearchInput {
	isOpen: boolean
	setIsOpen: ReactStateHook<boolean>
	setOverlay: ReactStateHook<boolean>
	form: UseFormReturn<ISearchFormFields, any, ISearchFormFields>
}

const SearchInput: FC<ISearchInput> = ({
	isOpen,
	form,
	setIsOpen,
	setOverlay
}) => {
	const { clear, onInput, onSubmit, onFocus, q, t } = useSearchInput(
		setIsOpen,
		setOverlay,
		isOpen,
		form
	)

	return (
		<FormProvider {...form}>
			<form
				className="relative z-40 flex h-10 w-full flex-row-reverse items-center p-2.5"
				onSubmit={onSubmit}
			>
				<m.input
					type="search"
					initial={{ width: 0, borderRadius: "9999px", padding: "0" }}
					variants={{
						opened: {
							width: "100%",
							borderRadius: "0 9999px 9999px 0",
							padding: "0 2.25rem 0 0.5rem"
						}
					}}
					animate={isOpen ? "opened" : ""}
					className="h-10 bg-secondary leading-10"
					maxLength={255}
					spellCheck={false}
					autoComplete="off"
					autoCorrect="off"
					placeholder={t("search.placeholder")}
					onInput={onInput}
					onFocus={onFocus}
					{...form.register("q", {
						pattern: { value: /^[a-zA-Zа-яА-Я0-9_(). ,-]*$/, message: "" }
					})}
				/>
				<m.button
					type="submit"
					initial={{ borderRadius: "9999px" }}
					variants={{ opened: { borderRadius: "9999px 0 0 9999px" } }}
					animate={isOpen ? "opened" : ""}
					transition={{ type: "tween" }}
					className="flex size-10 items-center justify-center bg-secondary p-1 transition-colors will-change-auto hover:bg-secondary/70"
					title={t("labels.findBtn")}
					disabled={!q}
				>
					<SearchIcon size={24} />
				</m.button>
				<m.button
					initial={{ opacity: 0, pointerEvents: 0, y: 10 }}
					animate={q && isOpen ? "visible" : ""}
					whileHover={{ rotate: 90 }}
					variants={{ visible: { opacity: 1, pointerEvents: 1, y: 0 } }}
					transition={{ type: "tween", duration: 0.2 }}
					type="button"
					className="absolute right-5"
					title={t("labels.clear")}
					onClick={clear}
				>
					<XIcon size={22} />
				</m.button>
			</form>
		</FormProvider>
	)
}

export { SearchInput }
