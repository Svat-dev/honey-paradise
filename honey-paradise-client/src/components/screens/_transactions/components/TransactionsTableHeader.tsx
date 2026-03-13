import { SortAscIcon, SortDescIcon } from "lucide-react"
import type { FC } from "react"

import { TableHead, TableHeader, TableRow } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"
import type { ReactStateHook } from "@/shared/types"

import { useTransactionsHeader } from "../hooks/useTransactionsHeader"

interface IProps {
	colIndex: number
	setColIndex: ReactStateHook<number>
}

const TransactionsTableHeader: FC<IProps> = ({ colIndex, setColIndex }) => {
	const {
		titles,
		handleClick,
		queryParams: { field, type }
	} = useTransactionsHeader()

	return (
		<TableHeader className="bg-primary/80">
			<TableRow className="hover:bg-transparent">
				{titles.map(([title, i_field], i) => (
					<TableHead
						key={title}
						className={cn({
							"bg-muted/10": i === colIndex,
							"cursor-pointer": i_field !== ""
						})}
						onMouseEnter={() => setColIndex(i)}
						onMouseLeave={() => setColIndex(-1)}
						onClick={() => handleClick(i_field)}
					>
						{title}
						{i_field !== "" && field === i_field ? (
							type === "asc" ? (
								<SortAscIcon
									size={20}
									className="ml-1 inline-block animate-show-effect opacity-0"
								/>
							) : (
								<SortDescIcon
									size={20}
									className="ml-1 inline-block animate-show-effect opacity-0"
								/>
							)
						) : (
							""
						)}
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
	)
}

export { TransactionsTableHeader }
