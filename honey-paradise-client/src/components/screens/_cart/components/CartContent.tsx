"use client";

import { Button, Separator } from "@/components/ui/common";

import { useMyCart } from "@/shared/lib/hooks/auth";
import { RefreshCcwIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { CartFooter } from "./cart-footer/CartFooter";
import { CartEmpty } from "./CartEmpty";
import { CartItem } from "./CartItem";
import { CartLoading } from "./CartLoading";

const CartContent = () => {
	const { cart, loading, clearCart, refetchCart, locale, t } = useMyCart();

	const clearAllDisabled = cart?.length === 0 || loading.clear || loading.default;

	return (
		<>
			<div className="absolute top-4 right-1 flex items-center gap-3">
				<Button
					variant="default"
					className="px-3 py-2"
					title={t("labels.deleteAll")}
					disabled={clearAllDisabled}
					isLoading={loading.clear}
					onClick={() => clearCart()}
				>
					{t("actions.deleteAll")}
				</Button>

				<Button
					variant="default"
					className="p-2 [&_svg]:hover:rotate-180"
					title={t("labels.refresh")}
					disabled={loading.default}
					onClick={() => refetchCart()}
				>
					<RefreshCcwIcon size={22} className="transition-transform will-change-transform" />
				</Button>
			</div>

			<section className="relative flex flex-col gap-7 overflow-y-scroll h-[34rem]">
				<AnimatePresence mode="sync">
					{loading.default ? (
						<CartLoading limit={5} />
					) : cart?.length === 0 ? (
						<CartEmpty />
					) : (
						cart?.cartItems.map(item => <CartItem key={item.id} {...item} currency={cart.currency} locale={locale as any} />)
					)}
				</AnimatePresence>
			</section>

			<Separator orientation="horizontal" className="my-5" />

			<CartFooter isLoading={loading.default} currency={cart?.currency} total={cart?.totalPrice} length={cart?.length} />
		</>
	);
};

export { CartContent };
