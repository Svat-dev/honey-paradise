import { Skeleton } from "@/components/ui/common";
import type { FC } from "react";

interface IFavoritesLoading {
  limit: number;
}

const FavoritesLoading: FC<IFavoritesLoading> = ({ limit }) => {
  const items = Array.from({ length: limit }, (_, i) => i + 1);

  return (
    <>
      {items.map((num) => (
        <Skeleton key={num} className="w-full h-32" />
      ))}
    </>
  );
};

export { FavoritesLoading };
