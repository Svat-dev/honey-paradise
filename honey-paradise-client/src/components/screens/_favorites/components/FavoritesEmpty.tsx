import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "motion/react";
import { Button } from "@/components/ui/common";
import { EnumAppRoute } from "@/shared/lib/constants/routes";

const FavoritesEmpty = () => {
  const { push } = useRouter();

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95, translateY: "-50%" }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="absolute top-1/2 -translate-y-1/2 self-center flex flex-col items-center"
    >
      <Image src="/assets/empty-favorites-icon.webp" alt="Фото" width={200} height={200} priority />

      <p className="font-semibold text-lg">{"У вас пока нет избранных товаров"}</p>

      <p className="text-muted mb-2">{"Выберите что-нибудь в каталоге или найдите в поиске"}</p>

      <div className="w-full flex items-center justify-between px-1">
        <Button variant="outline" onClick={() => push(EnumAppRoute.CATALOG)}>
          {"Перейти в каталог"}
        </Button>

        <Button variant="outline" onClick={() => push(EnumAppRoute.INDEX)}>
          {"На главную"}
        </Button>
      </div>
    </m.div>
  );
};

export { FavoritesEmpty };
