import { MenuIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

const RightPart = async () => {
	const t = await getTranslations("layout.header");

	return (
		<div className="tw-flex tw-items-center">
			<div className="tw-flex tw-flex-col tw-leading-4">
				<span>_swuttik_</span>
				<span className="tw-text-sm tw-text-muted">{t("roles.admin")}</span>
			</div>

			<div className="tw-ml-3">
				{/* <Image alt="Иконка профиля" src={} width={} height={} /> */}
				<div className="tw-w-9 tw-h-9 tw-bg-gray-300 tw-rounded-full" />
			</div>

			<button type="button" title={t("labels.menu")} className="tw-ml-5">
				<MenuIcon height={28} width={30} />
			</button>
		</div>
	);
};

export { RightPart };
