import { getTranslations } from "next-intl/server"

import { Title } from "@/components/ui/common"

import { OrdersContent } from "./components/OrdersContent"

const Orders = async () => {
	const t = await getTranslations("global.orders.content")
	return (
		<article className="relative mx-10 my-6 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			{/* <p className="ml-1 mb-4 text-muted">{t("description")}</p> */}

			<OrdersContent />
		</article>
	)
}

export { Orders }
