import { getTranslations } from "next-intl/server"

import { Title } from "@/components/ui/common"

import { CartContent } from "./components/CartContent"

const Cart = async () => {
	const t = await getTranslations("global.cart.content")

	return (
		<article className="relative mx-10 my-6 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="mb-4 ml-1 text-muted print:hidden">{t("description")}</p>

			<CartContent />
		</article>
	)
}

export { Cart }
