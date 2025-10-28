import { Button, Skeleton, Title } from "@/components/ui/common";
import type { FC } from "react";
import { useFavoritesHeader } from "../hooks/useFavoritesHeader";

interface IFavoritesHeaderProps {
  length: number | undefined;
  total: string | undefined;
  isLoading: boolean;
}

const FavoritesHeader: FC<IFavoritesHeaderProps> = ({ length, total, isLoading }) => {
  const { isAddingFavoritesToCart, isClearingFavoritesProducts, handleAddFavoritesToCart, handleClearFavorites } = useFavoritesHeader();

  return (
    <section className="sticky top-16 z-20 flex justify-between bg-primary rounded-md p-3 w-full mb-5">
      <Title size="md" className="flex items-center text-xl self-start">
        <span className="flex items-center font-semibold">{isLoading ? <Skeleton className="w-6 h-5" /> : length}&nbsp;товаров&nbsp;</span>
        <span>{"на сумму:"}&nbsp;</span>
        <span className="font-medium">{isLoading ? <Skeleton className="h-5 w-16" /> : total}</span>
      </Title>

      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          className="px-2 py-1.5"
          disabled={isLoading || length === 0 || isAddingFavoritesToCart}
          isLoading={isAddingFavoritesToCart}
          onClick={handleAddFavoritesToCart}
        >
          Отправить в корзину
        </Button>

        <Button
          variant="destructive"
          className="px-2 py-1.5"
          disabled={isLoading || length === 0 || isClearingFavoritesProducts}
          isLoading={isClearingFavoritesProducts}
          onClick={handleClearFavorites}
        >
          Удалить все
        </Button>
      </div>
    </section>
  );
};

export { FavoritesHeader };
