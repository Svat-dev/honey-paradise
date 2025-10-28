"use client";

import { Button, Separator } from "@/components/ui/common";
import { AnimatePresence } from "motion/react";

import { useMyCart } from "@/shared/lib/hooks/auth";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { CartEmpty } from "./CartEmpty";
import { CartFooter } from "./cart-footer/CartFooter";
import { CartItem } from "./CartItem";
import { CartLoading } from "./CartLoading";
import { RefreshCcwIcon } from "lucide-react";

const CartContent = () => {
  const { cart, loading, clearCart, refetchCart } = useMyCart();
  const { locale } = useLanguage();

  const clearAllDisabled = cart?.length === 0 || loading.clear;

  return (
    <>
      <div className="absolute top-4 right-1 flex items-center gap-3">
        <Button variant="default" className="px-3 py-2" disabled={clearAllDisabled} isLoading={loading.clear} onClick={() => clearCart()}>
          {"Удалить все"}
        </Button>

        <Button variant="default" className="p-2 [&_svg]:hover:rotate-180" onClick={() => refetchCart()}>
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
            cart?.cartItems.map((item) => <CartItem key={item.id} {...item} currency={cart.currency} locale={locale as any} />)
          )}
        </AnimatePresence>
      </section>

      <Separator orientation="horizontal" className="my-5" />

      <CartFooter isLoading={loading.default} currency={cart?.currency} total={cart?.totalPrice} length={cart?.length} />
    </>
  );
};

export { CartContent };
