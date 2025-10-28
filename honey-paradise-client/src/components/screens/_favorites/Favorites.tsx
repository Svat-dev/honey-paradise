import { getTranslations } from "next-intl/server";
import { FavoritesContent } from "./components/FavoritesContent";
import { Title } from "@/components/ui/common";

const Favorites = async () => {
  // const t = await getTranslations();

  return (
    <article className="relative w-full my-6 mx-10">
      <Title size="lg" className="font-bold">
        {"Избранные товары"}
      </Title>

      <p className="ml-1 mb-4 text-muted">{"Здесь хранятся продукты которые вам понравились"}</p>

      <FavoritesContent />
    </article>
  );
};

export { Favorites };
