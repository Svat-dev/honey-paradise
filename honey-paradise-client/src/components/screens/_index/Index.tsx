import { PopularSection } from "./components/PopularSection";
import { RecentSection } from "./components/RecentSection";

const Index = () => {
	return (
		<div>
			<PopularSection />

			<section>Секция 2. Что-нибудь еще</section>

			<RecentSection />
		</div>
	);
};

export { Index };
