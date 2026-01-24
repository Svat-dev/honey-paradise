import { getTranslations } from "next-intl/server"

import { Title } from "@/components/ui/common"

import { CartContent } from "./components/CartContent"

const Cart = async () => {
	const t = await getTranslations("global.cart.content")

	return (
		<article className="relative w-full my-6 mx-10">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="ml-1 mb-4 text-muted print:hidden">{t("description")}</p>

			<CartContent />
		</article>
	)
}

export { Cart }
