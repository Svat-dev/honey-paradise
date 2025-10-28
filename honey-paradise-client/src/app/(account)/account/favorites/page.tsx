import type { Metadata, NextPage } from "next";

import { Favorites } from "@/components/screens/_favorites/Favorites";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "User Favorites Products" };
}

const FavoritesPage: NextPage = () => {
  return <Favorites />;
};

export default FavoritesPage;
