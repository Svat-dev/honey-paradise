import type { FC } from "react"

import { Button } from "@/components/ui/common"

interface IProps {
	isLoading: boolean
	refetch: VoidFunction
}

const RightSideFilters: FC<IProps> = ({ isLoading, refetch }) => {
	return (
		<div>
			<Button
				variant="secondary"
				className="px-2 py-1.5"
				onClick={refetch}
				isLoading={isLoading}
			>
				Обновить
			</Button>
		</div>
	)
}

export { RightSideFilters }
