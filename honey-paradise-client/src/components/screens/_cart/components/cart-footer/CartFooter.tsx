import { Button, Input, Skeleton, Title } from "@/components/ui/common";
import { PrinterIcon, TableIcon } from "lucide-react";

import { useCreateOrderS } from "@/services/hooks/order/useCreateOrderS";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import type { GetMyCartResponseCurrency } from "@/shared/types/server";
import type { FC } from "react";
import { CartPrint } from "./CartPrint";

interface IProps {
  length?: number;
  total?: number;
  currency?: GetMyCartResponseCurrency;
  isLoading: boolean;
}

const CartFooter: FC<IProps> = ({ length, total, currency, isLoading }) => {
  const { getPrice } = useGetPrice(currency);
  const { createOrder, isCreatingOrder } = useCreateOrderS();

  return (
    <section className="grid grid-cols-[2fr_1fr] w-full bg-primary py-3 px-4 rounded-md">
      <div>
        <Title size="md" className="font-semibold text-2xl">
          {"Подробности заказа"}
        </Title>

        <div className="flex items-center ml-1">
          <Title size="sm" className="text-xl">
            {"Итого:"}&nbsp;
          </Title>

          <div className="flex items-center text-lg">
            <span className="flex items-center font-medium">
              {isLoading ? <Skeleton className="w-7 h-5" /> : length}&nbsp;товаров&nbsp;
            </span>
            <span>{"по цене"}&nbsp;</span>
            <span className="font-medium">{isLoading ? <Skeleton className="h-5 w-20" /> : getPrice(total || 0, true, false)}</span>
          </div>
        </div>

        <div className="flex items-center ml-1">
          <Title size="sm" className="text-xl">
            {"Общая скидка:"}&nbsp;
          </Title>
          <span className="font-medium">???%</span>
        </div>
      </div>

      <div>
        <div className="flex flex-col mb-2">
          <Title size="sm" className="text-xl">
            {"Введите промокод:"}
          </Title>

          <Input name="promo-code" placeholder="Промокод" className="w-full mb-2" maxLength={30} />

          <Button variant="secondary" title={"Применить промокод"} className="px-2 py-1.5 self-end" disabled={isLoading}>
            {"Применить"}
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <CartPrint />

          <Button variant="link" className="flex items-center gap-1 will-change-auto">
            <TableIcon size={20} />
            {"Скачать таблицу"}
          </Button>
        </div>

        <Button
          variant="secondary"
          className="w-full py-2 text-base"
          disabled={(length ? length < 1 : true) || isCreatingOrder}
          isLoading={isCreatingOrder}
          onClick={() => createOrder()}
        >
          {"Оформить заказ"}
        </Button>
      </div>
    </section>
  );
};

export { CartFooter };
