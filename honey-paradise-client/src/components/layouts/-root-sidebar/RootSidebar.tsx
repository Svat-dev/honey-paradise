import { getTranslations } from "next-intl/server";
import { ChangeThemeButton } from "./components/ChangeThemeButton";
import { ListItem } from "./components/ListItem";
import { LogoutButton } from "./components/logout-button/LogoutButton";
import { getNavListData } from "./data";

const RootSidebar = async () => {
	const t = await getTranslations("layout.root-sidebar");
	const data = await getNavListData();

	return (
		<aside className="sticky top-[3.75rem] w-fit h-[calc(100vh-3.75rem)] bg-primary p-3">
			<div className="relative h-full px-4 py-2">
				<nav className="mb-7">
					<h3 className="text-lg font-medium">{t("list.title")}:</h3>

					<ul className="list-none ml-3 mt-3">
						{data.map(item => (
							<ListItem key={item.topic} content={item.content} topic={item.topic} />
						))}
					</ul>
				</nav>

				<footer className="absolute bottom-0">
					<div className="flex gap-4 mb-2">
						<ChangeThemeButton />
						<LogoutButton />
					</div>

					<p className="text-sm text-muted">Honey Paradise Inc. ©</p>
					<p className="text-sm text-muted">Все права защищены. {new Date().getFullYear()}</p>
				</footer>
			</div>
		</aside>
	);
};

export { RootSidebar };
