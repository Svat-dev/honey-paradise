import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { usePathname, useRouter } from "next/navigation"
import {
	createContext,
	type FC,
	type PropsWithChildren,
	useEffect,
	useMemo,
	useState
} from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useSwitchFavoritesProducts } from "@/services/hooks/products"
import { EnumAppRoute, queryKeys } from "@/shared/lib/constants/routes"
import { useMyAccount, useMyCart } from "@/shared/lib/hooks/auth"

import type {
	IProductContextValues,
	TProductContext
} from "./types/product-context.type"

interface IProps extends PropsWithChildren {
	id: string
	variantId: string
	isLikedServer: boolean
}

const ProductContext = createContext<TProductContext>({
	variantId: "",
	cartId: "",
	isLiked: false,

	loading: { default: false, cart: false, favorite: false },
	currency: undefined,

	handleSwitchFavorite: async () => {},
	handleAddToCart: () => {},
	setVariantId: () => {}
})

const ProductContextProvider: FC<IProps> = ({
	children,
	id,
	variantId,
	isLikedServer
}) => {
	const client = useQueryClient()

	const pathname = usePathname()
	const { push, replace } = useRouter()

	const { user, isAccLoading } = useMyAccount()
	const { cart, addCartItem, loading } = useMyCart()
	const { switchFavoriteProductAsync, isSwitchingFavoritesProduct } =
		useSwitchFavoritesProducts(queryKeys.getMyAccount)

	const [ctx, setContext] = useState<IProductContextValues>({
		variantId: "",
		cartId: null,
		isLiked: null
	})

	const handleSwitchFavorite = async () => {
		try {
			setContext(prev => ({
				...prev,
				isLiked: prev.isLiked === null ? !isLikedServer : !prev.isLiked
			}))
			await switchFavoriteProductAsync(id)
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			toast.error(errMsg)
			setContext(prev => ({ ...prev, isLiked: !prev.isLiked }))
		}
	}

	const handleAddToCart = () => {
		if (!!ctx.cartId) return push(EnumAppRoute.MY_CART)

		const onSuccess = () => {
			client.refetchQueries({ queryKey: [queryKeys.getMyCart], type: "all" })
			toast.success("Товар добавлен в корзину!")
		}

		addCartItem({ variantId: ctx.variantId, quantity: 1 }, onSuccess)
	}

	const setVariantId = (id: string) => {
		setContext(prev => ({ ...prev, variantId: id }))
		sessionStorage.setItem("pv_id", id)
	}

	const values: TProductContext = useMemo(
		() => ({
			...ctx,
			isLiked: ctx.isLiked === null ? isLikedServer : ctx.isLiked,
			handleSwitchFavorite,
			handleAddToCart,
			setVariantId,
			currency: user?.settings.defaultCurrency,
			loading: {
				default: isAccLoading,
				cart: loading.add,
				favorite: isSwitchingFavoritesProduct
			}
		}),
		[
			ctx.cartId,
			ctx.isLiked,
			ctx.variantId,
			isLikedServer,
			isAccLoading,
			loading.add,
			isSwitchingFavoritesProduct
		]
	)

	useEffect(() => {
		setContext(prev => ({
			...prev,
			cartId:
				cart?.cartItems.find(el => el.productVariant.id === ctx.variantId)
					?.id || null
		}))
	}, [ctx.variantId, cart?.cartItems])

	useEffect(() => {
		const slug = pathname.split("/").reverse()
		const splitted = slug[0].split("-")

		if (!isNaN(Number(splitted[splitted.length - 1]))) {
			setVariantId(variantId)
			replace(splitted.slice(0, splitted.length - 1).join("-"))
		} else {
			const pv_id = sessionStorage.getItem("pv_id")
			setVariantId(pv_id || variantId)
		}
	}, [])

	return (
		<ProductContext.Provider value={values}>{children}</ProductContext.Provider>
	)
}

export { ProductContext, ProductContextProvider }
