import { Title } from "@/components/ui/common"
import { productsService } from "@/services/products.service"

import { PopularSectionContent } from "./PopularSectionContent"

const PopularSection = async () => {
	const initialData = await productsService.getPopular()

	if (!initialData) return

	return (
		<section className="mx-8 mt-4">
			<Title size="lg" className="mb-2 font-semibold">
				Популярные товары
			</Title>

			<PopularSectionContent initialData={initialData} />
		</section>
	)
}

export { PopularSection }
