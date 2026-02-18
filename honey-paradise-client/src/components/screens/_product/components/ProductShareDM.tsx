import { LinkIcon, Share2Icon } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import type { FC } from "react"
import toast from "react-hot-toast"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/common"
import { CLIENT_URL, VK_SHARE_URL } from "@/shared/lib/constants/base"
import { EnumAppRoute } from "@/shared/lib/constants/routes"

interface IProps {
	slug: string
	art: number
}

const ProductShareDM: FC<IProps> = ({ slug, art }) => {
	const t = useTranslations("global.product.content")

	const handleGoToVk = () => {
		try {
			const shareUrl =
				VK_SHARE_URL +
				CLIENT_URL +
				EnumAppRoute.PRODUCT +
				`/${slug}` +
				`-${art}`

			const heightHalf = Math.round(window.innerHeight / 2) - 300
			const widthHalf = Math.round(window.innerWidth / 2)

			window.open(
				shareUrl,
				"_blank",
				`width=500,height=600,top=${heightHalf},left=${widthHalf}`
			)
		} catch (error) {
			console.error("Can't share with VK", error)
		}
	}

	const handleCopyLink = async () => {
		try {
			const url = CLIENT_URL + EnumAppRoute.PRODUCT + `/${slug}` + `-${art}`

			await navigator.clipboard.writeText(url)

			toast.success("Ссылка успешна скопирована!")
		} catch (error) {
			console.error("Can't copy text to clipboard", error)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="default"
					title={t("labels.shareBtn")}
					className="!absolute right-3 top-3 !bg-primary/40 p-2.5"
				>
					<Share2Icon size={22} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="left">
				<DropdownMenuItem onClick={handleGoToVk}>
					<Image
						src="/icons/providers/vk.svg"
						alt={t("labels.vk")}
						width={20}
						height={20}
					/>
					{t("shareDM.vk")}
				</DropdownMenuItem>

				<DropdownMenuItem onClick={handleCopyLink}>
					<LinkIcon size={26} />
					{t("shareDM.copy")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ProductShareDM }
