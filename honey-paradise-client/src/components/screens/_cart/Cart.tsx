import { Title } from "@/components/ui/common";
import { CartContent } from "./components/CartContent";

const Cart = async () => {
	// const t = await getTranslations("global.cart.content");

	return (
		<article className="relative w-full my-6 mx-10">
			<Title size="lg" className="font-bold">
				{"Корзина товаров"}
			</Title>

			<p className="ml-1 mb-4 text-muted">{"Здесь хранятся все продукты которые вы добавили в корзину"}</p>

			<CartContent />
		</article>
	);
};

export { Cart };
