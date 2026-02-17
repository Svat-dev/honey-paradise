import { useContext } from "react"

import { ProductContext } from "@/components/providers/ProductPageContext"

export const useProductContext = () => {
	return useContext(ProductContext)
}
