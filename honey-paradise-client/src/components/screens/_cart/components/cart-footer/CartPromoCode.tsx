import type { FC } from "react"
import { FormProvider } from "react-hook-form"

import { Button, Title } from "@/components/ui/common"
import { FormInput } from "@/components/ui/components/form-input"
import { VALUES } from "@/shared/lib/constants/base"

import { useCartPromoCode } from "../../hooks/useCartPromoCode"

interface IProps {
	isLoading: boolean
}

const CartPromoCode: FC<IProps> = ({ isLoading }) => {
	const { t, form, onSubmit, isPromoCodeUsing } = useCartPromoCode()

	return (
		<FormProvider {...form}>
			<form className="mb-2 flex flex-col" onSubmit={onSubmit}>
				<Title size="sm" className="text-xl">
					{t("footer.promo.label")}
				</Title>

				<FormInput
					name="promoCode"
					placeholder={t("footer.promo.placeholder")}
					containerClassName="mb-2"
					maxLength={VALUES.MAX_PROMO_CODE_LENGTH}
				/>

				<Button
					variant="secondary"
					type="submit"
					title={t("labels.usePromo")}
					className="self-end px-2 py-1.5"
					isLoading={isPromoCodeUsing}
					disabled={isPromoCodeUsing || isLoading}
				>
					{t("actions.usePromo")}
				</Button>
			</form>
		</FormProvider>
	)
}

export { CartPromoCode }
