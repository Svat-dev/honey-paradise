import { getTranslations } from "next-intl/server"
import type { FC } from "react"

import { Title } from "@/components/ui/common"
import type { TSearchParams } from "@/shared/types"

import { OrdersContent } from "./components/OrdersContent"

interface IProps {
	searchParams: TSearchParams
}

const Orders: FC<IProps> = async ({ searchParams }) => {
	const t = await getTranslations("global.orders.content")

	return (
		<article className="relative mx-10 my-6 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			{/* <p className="ml-1 mb-4 text-muted">{t("description")}</p> */}

			<OrdersContent paid={Boolean(searchParams?.["paid"])} />
		</article>
	)
}

export { Orders }
