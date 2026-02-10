import { TableIcon } from "lucide-react"

import { Button } from "@/components/ui/common"

import { useCartTable } from "../../hooks/useCartTable"

const CartTable = () => {
	const { t, onDownload } = useCartTable()

	return (
		<Button
			variant="link"
			title={t("saveAsTable")}
			className="flex items-center gap-1 will-change-auto"
			onClick={onDownload}
		>
			<TableIcon size={20} />
			{t("saveAsTable")}
		</Button>
	)
}

export { CartTable }
