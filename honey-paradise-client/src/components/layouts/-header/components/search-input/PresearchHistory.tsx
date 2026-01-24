import { HistoryIcon, Trash2Icon } from "lucide-react"

import { Button, Link } from "@/components/ui/common"

import type { ISearchHistory } from "../../hooks/types/use-search.type"
import { usePresearchHistory } from "../../hooks/usePresearchHistory"

const PresearchHistory = () => {
	const { clearHistory, history } = usePresearchHistory()

	return (
		<div className="bg-background/90 p-2">
			<div className="mb-1 flex items-center justify-between">
				<p className="inline-flex font-medium">{"История поиска"}</p>

				<Button
					variant="link"
					title={"Очистить историю поиска"}
					className="!font-normal"
					disabled={!history.length}
					onClick={() => clearHistory("all")}
				>
					{"Очистить историю"}
				</Button>
			</div>

			<ul className="flex flex-col gap-1.5 px-1">
				{history.length ? (
					history.reverse().map(({ q, url }: ISearchHistory) => (
						<li
							key={q}
							className="group grid grid-cols-[auto_1fr_min-content] items-center gap-2 transition-colors hover:text-muted"
						>
							<div className="rounded-md bg-muted/10 p-1">
								<HistoryIcon size={22} />
							</div>

							<Link href={url} className="cursor-pointer">
								{q}
							</Link>

							<Button variant="ghost" onClick={() => clearHistory("single", q)}>
								<Trash2Icon
									size={20}
									className="opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</Button>
						</li>
					))
				) : (
					<p>{"История поиска пуста"}</p>
				)}
			</ul>
		</div>
	)
}

export { PresearchHistory }
