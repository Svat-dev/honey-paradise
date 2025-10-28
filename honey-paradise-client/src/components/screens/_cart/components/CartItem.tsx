import { Button, Title } from "@/components/ui/common";
import type { GetMyCartItemsResponse, GetMyCartResponseCurrency } from "@/shared/types/server";

import { getAssetsPath } from "@/shared/lib/utils";
import { m } from "motion/react";
import Image from "next/image";
import { useCartItem } from "../hooks/useCartItem";
import type { FC } from "react";

interface ICartItem extends GetMyCartItemsResponse {
  locale: "en" | "ru";
  currency: GetMyCartResponseCurrency;
}

const CartItem: FC<ICartItem> = ({ id, priceInUSD, product, quantity, locale, currency }) => {
  const { amount, changeQuantity, deleteCartItem, isLoading, isDeleting, getPrice } = useCartItem(currency, quantity);

  return (
    <m.div
      initial={{ opacity: 0.3, y: -10 }}
      variants={{ loading: { opacity: 0.6, pointerEvents: 0 }, default: { opacity: 1, y: 0 } }}
      animate={isLoading ? "loading" : ""}
      exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
      whileInView={"default"}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="flex items-center gap-5 bg-primary rounded-md shadow-md p-3"
    >
      <Image src={getAssetsPath(product.images[0])} alt={product.title[locale]} width={100} height={100} />

      <Title size="sm" className="text-xl">
        {product.title[locale]}
      </Title>

      <div className="flex items-center gap-2">
        <Button variant="secondary" className="px-4 py-3" disabled={isLoading} onClick={() => changeQuantity("increase", id)}>
          +
        </Button>

        <span>{amount}</span>

        <Button
          variant="secondary"
          className="px-4 py-3"
          disabled={isLoading || amount <= 1}
          onClick={() => changeQuantity("decrease", id)}
        >
          -
        </Button>
      </div>

      <span>{getPrice(priceInUSD, true, true)}</span>

      <Button variant="secondary" className="px-2 py-1.5" disabled={isLoading} isLoading={isDeleting} onClick={() => deleteCartItem(id)}>
        Delete
      </Button>
    </m.div>
  );
};

export { CartItem };
