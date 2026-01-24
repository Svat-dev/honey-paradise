import { Button, Title } from "@/components/ui/common";

import { FormInput } from "@/components/ui/components/form-input";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useCartPromoCode } from "../../hooks/useCartPromoCode";

interface IProps {
	isLoading: boolean;
}

const CartPromoCode: FC<IProps> = ({ isLoading }) => {
	const { t, form, onSubmit, isPromoCodeUsing } = useCartPromoCode();

	return (
		<FormProvider {...form}>
			<form className="flex flex-col mb-2" onSubmit={onSubmit}>
				<Title size="sm" className="text-xl">
					{t("footer.promo.label")}
				</Title>

				<FormInput name="promoCode" placeholder={t("footer.promo.placeholder")} containerClassName="mb-2" maxLength={30} />

				<Button
					variant="secondary"
					type="submit"
					title={t("labels.usePromo")}
					className="px-2 py-1.5 self-end"
					isLoading={isPromoCodeUsing}
					disabled={isPromoCodeUsing || isLoading}
				>
					{t("actions.usePromo")}
				</Button>
			</form>
		</FormProvider>
	);
};

export { CartPromoCode };
