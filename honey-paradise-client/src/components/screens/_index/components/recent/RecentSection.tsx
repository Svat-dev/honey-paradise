import { Title } from "@/components/ui/common"

import { RecentSectionContent } from "./RecentSectionContent"

const RecentSection = () => {
	return (
		<section className="mx-8 mt-4">
			<Title size="lg" className="mb-2 font-semibold">
				Недавно смотрели
			</Title>

			<RecentSectionContent />
		</section>
	)
}

export { RecentSection }
